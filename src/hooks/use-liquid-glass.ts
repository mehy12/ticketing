'use client';

import { useMemo } from 'react';

// ─── Surface Profile Functions ───
// Each takes a normalized distance from edge (0=edge, 1=end of bezel) and returns height [0,1]

type SurfaceType = 'squircle' | 'circle' | 'concave' | 'lip';

function surfaceCircle(x: number): number {
    return Math.sqrt(1 - (1 - x) * (1 - x));
}

function surfaceSquircle(x: number): number {
    const v = 1 - x;
    return Math.pow(1 - v * v * v * v, 0.25);
}

function surfaceConcave(x: number): number {
    return 1 - surfaceCircle(x);
}

function smootherstep(x: number): number {
    // Ken Perlin's smootherstep
    return x * x * x * (x * (x * 6 - 15) + 10);
}

function surfaceLip(x: number): number {
    const convex = surfaceSquircle(x);
    const concave = 1 - convex;
    const t = smootherstep(x);
    return convex * (1 - t) + concave * t;
}

function getSurfaceFunction(type: SurfaceType): (x: number) => number {
    switch (type) {
        case 'circle': return surfaceCircle;
        case 'squircle': return surfaceSquircle;
        case 'concave': return surfaceConcave;
        case 'lip': return surfaceLip;
    }
}

// ─── Refraction Physics ───

interface DisplacementSample {
    /** Signed displacement in pixels (positive = inward) */
    magnitude: number;
}

/**
 * Calculate the displacement for a single ray hitting the glass surface
 * at a given distance from the edge, using Snell's Law.
 *
 * Assumes:
 *  - Incident rays are orthogonal to the background plane (straight down)
 *  - Medium 1 is air (n=1), medium 2 has refractiveIndex > 1
 *  - One refraction event only
 */
function calculateDisplacement(
    distanceFromEdge: number,   // 0..bezelWidth (pixels)
    bezelWidth: number,
    thickness: number,
    refractiveIndex: number,
    surfaceFn: (x: number) => number,
): number {
    if (bezelWidth <= 0) return 0;

    // Normalize distance to 0..1
    const normalizedDist = Math.min(Math.max(distanceFromEdge / bezelWidth, 0), 1);

    // Calculate surface normal via numerical derivative
    const delta = 0.001;
    const x0 = Math.max(normalizedDist - delta, 0);
    const x1 = Math.min(normalizedDist + delta, 1);
    const y0 = surfaceFn(x0);
    const y1 = surfaceFn(x1);
    const derivative = (y1 - y0) / (x1 - x0);

    // Surface normal (rotated derivative): pointing perpendicular to the surface
    // Normal = (-derivative, 1), then normalize
    const normalLen = Math.sqrt(derivative * derivative + 1);
    const nx = -derivative / normalLen;
    const ny = 1 / normalLen;

    // Incident ray is straight down: (0, -1) in our 2D cross-section
    // Angle of incidence = angle between incident ray and surface normal
    // cos(theta_i) = dot(incident, normal) = |ny| (since incident = (0, -1), we take abs)
    const cosTheta_i = Math.abs(ny);
    const sinTheta_i = Math.sqrt(1 - cosTheta_i * cosTheta_i);

    // Snell's Law: n1 * sin(theta_i) = n2 * sin(theta_r)
    const n1 = 1.0; // air
    const n2 = refractiveIndex;
    const sinTheta_r = (n1 / n2) * sinTheta_i;

    // Total internal reflection check (shouldn't happen with n2 > n1 and our constraints)
    if (Math.abs(sinTheta_r) > 1) return 0;

    const cosTheta_r = Math.sqrt(1 - sinTheta_r * sinTheta_r);

    // The refracted ray direction in 2D
    // Using the refraction formula for the ray direction
    const ratio = n1 / n2;
    const refractedX = ratio * 0 + (ratio * cosTheta_i - cosTheta_r) * nx; // incident x = 0
    const refractedY = ratio * (-1) + (ratio * cosTheta_i - cosTheta_r) * ny;

    // Normalize the refracted ray
    const refLen = Math.sqrt(refractedX * refractedX + refractedY * refractedY);
    if (refLen < 1e-10) return 0;
    const rx = refractedX / refLen;
    const ry = refractedY / refLen;

    // The glass height at this point determines how far the ray travels inside
    const glassHeight = surfaceFn(normalizedDist) * thickness * bezelWidth * 0.5;

    // How far does the ray travel horizontally before exiting?
    // It enters at (distanceFromEdge, glassHeight) and exits at the bottom (y=0)
    if (Math.abs(ry) < 1e-10) return 0;
    const travelDistance = glassHeight / Math.abs(ry);
    const horizontalShift = rx * travelDistance;

    return horizontalShift;
}

/**
 * Pre-calculate displacement magnitudes for one radius (127 samples).
 * Returns the array and the maximum absolute displacement.
 */
function preCalculateDisplacements(
    bezelWidth: number,
    thickness: number,
    refractiveIndex: number,
    surfaceFn: (x: number) => number,
): { samples: number[]; maxDisplacement: number } {
    const SAMPLE_COUNT = 127; // fits 8-bit channel: 0..126 maps to bezel, 127 is flat interior
    const samples: number[] = [];
    let maxDisplacement = 0;

    for (let i = 0; i < SAMPLE_COUNT; i++) {
        const distFromEdge = (i / (SAMPLE_COUNT - 1)) * bezelWidth;
        const displacement = calculateDisplacement(
            distFromEdge,
            bezelWidth,
            thickness,
            refractiveIndex,
            surfaceFn,
        );
        samples.push(displacement);
        maxDisplacement = Math.max(maxDisplacement, Math.abs(displacement));
    }

    return { samples, maxDisplacement: maxDisplacement || 1 }; // avoid div by 0
}

// ─── Displacement Map Image Generation ───

/**
 * Generate a displacement map as a data URL.
 * The map is an RGBA image where:
 *   R = X displacement (128 = neutral)
 *   G = Y displacement (128 = neutral)
 *   B = 128 (unused)
 *   A = 255 (opaque)
 *
 * For a rounded rectangle, the displacement is based on the minimum
 * distance from any edge, with the direction pointing toward the nearest edge.
 */
function generateDisplacementMap(
    width: number,
    height: number,
    bezelWidth: number,
    samples: number[],
    maxDisplacement: number,
): string {
    if (width <= 0 || height <= 0) return '';

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    const sampleCount = samples.length;

    for (let py = 0; py < height; py++) {
        for (let px = 0; px < width; px++) {
            const idx = (py * width + px) * 4;

            // Distance from each edge
            const distLeft = px;
            const distRight = width - 1 - px;
            const distTop = py;
            const distBottom = height - 1 - py;

            // Minimum distance to any edge
            const minDist = Math.min(distLeft, distRight, distTop, distBottom);

            if (minDist >= bezelWidth) {
                // Inside the flat area — no displacement
                data[idx] = 128;     // R
                data[idx + 1] = 128; // G
                data[idx + 2] = 128; // B
                data[idx + 3] = 255; // A
                continue;
            }

            // Find which edge we're closest to and compute the displacement direction
            let dirX = 0;
            let dirY = 0;

            // Handle corners: use radial distance from the corner point
            const cornerRadius = bezelWidth;
            const inLeftBezel = px < cornerRadius;
            const inRightBezel = px > width - 1 - cornerRadius;
            const inTopBezel = py < cornerRadius;
            const inBottomBezel = py > height - 1 - cornerRadius;

            if ((inLeftBezel || inRightBezel) && (inTopBezel || inBottomBezel)) {
                // Corner region — use radial direction from corner
                const cornerX = inLeftBezel ? cornerRadius : width - 1 - cornerRadius;
                const cornerY = inTopBezel ? cornerRadius : height - 1 - cornerRadius;
                const dx = px - cornerX;
                const dy = py - cornerY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 1e-5) {
                    data[idx] = 128;
                    data[idx + 1] = 128;
                    data[idx + 2] = 128;
                    data[idx + 3] = 255;
                    continue;
                }

                // Distance from the curved corner edge
                const cornerEdgeDist = cornerRadius - dist;
                if (cornerEdgeDist < 0) {
                    // Outside the rounded corner — no displacement
                    data[idx] = 128;
                    data[idx + 1] = 128;
                    data[idx + 2] = 128;
                    data[idx + 3] = 255;
                    continue;
                }

                // Direction: from corner center outward
                dirX = dx / dist;
                dirY = dy / dist;

                // Sample the displacement
                const sampleIdx = Math.min(
                    Math.floor((cornerEdgeDist / bezelWidth) * (sampleCount - 1)),
                    sampleCount - 1
                );
                const displacement = samples[sampleIdx];
                const normalized = displacement / maxDisplacement;

                // Convert direction + magnitude to R,G
                const displacedX = dirX * normalized;
                const displacedY = dirY * normalized;

                data[idx] = Math.round(128 + displacedX * 127);     // R
                data[idx + 1] = Math.round(128 + displacedY * 127); // G
                data[idx + 2] = 128;                                  // B
                data[idx + 3] = 255;                                  // A
            } else {
                // Edge region (not corner)
                // Determine the displacement direction based on nearest edge
                if (minDist === distLeft) { dirX = 1; dirY = 0; }
                else if (minDist === distRight) { dirX = -1; dirY = 0; }
                else if (minDist === distTop) { dirX = 0; dirY = 1; }
                else { dirX = 0; dirY = -1; }

                // Sample the displacement magnitude
                const sampleIdx = Math.min(
                    Math.floor((minDist / bezelWidth) * (sampleCount - 1)),
                    sampleCount - 1
                );
                const displacement = samples[sampleIdx];
                const normalized = displacement / maxDisplacement;

                // Direction points inward; displacement is the magnitude
                const displacedX = dirX * normalized;
                const displacedY = dirY * normalized;

                data[idx] = Math.round(128 + displacedX * 127);     // R
                data[idx + 1] = Math.round(128 + displacedY * 127); // G
                data[idx + 2] = 128;                                  // B
                data[idx + 3] = 255;                                  // A
            }
        }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png');
}

// ─── Specular Highlight Generation ───

/**
 * Generate a specular highlight image as a data URL.
 * Uses a rim-light effect: brighter at the edges, fading inward.
 * Light direction is from top-left.
 */
function generateHighlightMap(
    width: number,
    height: number,
    bezelWidth: number,
    highlightIntensity: number,
): string {
    if (width <= 0 || height <= 0) return '';

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    // Light direction (normalized): top-left
    const lightX = -0.7071;
    const lightY = -0.7071;

    for (let py = 0; py < height; py++) {
        for (let px = 0; px < width; px++) {
            const idx = (py * width + px) * 4;

            const distLeft = px;
            const distRight = width - 1 - px;
            const distTop = py;
            const distBottom = height - 1 - py;
            const minDist = Math.min(distLeft, distRight, distTop, distBottom);

            if (minDist >= bezelWidth) {
                // Inside: no highlight
                data[idx] = 0;
                data[idx + 1] = 0;
                data[idx + 2] = 0;
                data[idx + 3] = 255;
                continue;
            }

            // Edge normal direction (pointing inward)
            let nx = 0, ny = 0;
            if (minDist === distLeft) { nx = 1; }
            else if (minDist === distRight) { nx = -1; }
            else if (minDist === distTop) { ny = 1; }
            else { ny = -1; }

            // Handle corners
            const cornerRadius = bezelWidth;
            const inCorner =
                (px < cornerRadius || px > width - 1 - cornerRadius) &&
                (py < cornerRadius || py > height - 1 - cornerRadius);

            if (inCorner) {
                const cornerX = px < cornerRadius ? cornerRadius : width - 1 - cornerRadius;
                const cornerY = py < cornerRadius ? cornerRadius : height - 1 - cornerRadius;
                const dx = px - cornerX;
                const dy = py - cornerY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > 0) {
                    nx = -dx / dist;
                    ny = -dy / dist;
                }
            }

            // Fresnel-like: highlight stronger when surface normal is more aligned with light
            const dot = Math.max(0, -(nx * lightX + ny * lightY));
            // Fade with distance from edge
            const edgeFade = 1 - (minDist / bezelWidth);
            const intensity = Math.pow(dot, 2) * edgeFade * highlightIntensity * 255;

            const value = Math.min(255, Math.round(intensity));
            data[idx] = value;
            data[idx + 1] = value;
            data[idx + 2] = value;
            data[idx + 3] = 255;
        }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png');
}

// ─── Main Hook ───

export interface UseLiquidGlassOptions {
    width: number;
    height: number;
    bezelWidth?: number;
    refractiveIndex?: number;
    surfaceType?: SurfaceType;
    thickness?: number;
    highlightIntensity?: number;
}

export interface LiquidGlassResult {
    displacementMapUrl: string;
    highlightMapUrl: string;
    maxDisplacement: number;
    filterId: string;
}

let instanceCounter = 0;

export function useLiquidGlass({
    width,
    height,
    bezelWidth = 20,
    refractiveIndex = 1.5,
    surfaceType = 'squircle',
    thickness = 1.0,
    highlightIntensity = 0.8,
}: UseLiquidGlassOptions): LiquidGlassResult {
    const filterId = useMemo(() => `liquid-glass-${++instanceCounter}`, []);

    const result = useMemo(() => {
        const roundedW = Math.round(width);
        const roundedH = Math.round(height);

        if (roundedW <= 0 || roundedH <= 0) {
            return {
                displacementMapUrl: '',
                highlightMapUrl: '',
                maxDisplacement: 0,
            };
        }

        const clampedBezel = Math.min(bezelWidth, Math.floor(Math.min(roundedW, roundedH) / 2));
        const surfaceFn = getSurfaceFunction(surfaceType);

        // Pre-calculate displacement samples
        const { samples, maxDisplacement } = preCalculateDisplacements(
            clampedBezel,
            thickness,
            refractiveIndex,
            surfaceFn,
        );

        // Generate the full displacement map image
        const displacementMapUrl = generateDisplacementMap(
            roundedW,
            roundedH,
            clampedBezel,
            samples,
            maxDisplacement,
        );

        // Generate the specular highlight map
        const highlightMapUrl = generateHighlightMap(
            roundedW,
            roundedH,
            clampedBezel,
            highlightIntensity,
        );

        return { displacementMapUrl, highlightMapUrl, maxDisplacement };
    }, [width, height, bezelWidth, refractiveIndex, surfaceType, thickness, highlightIntensity]);

    return {
        ...result,
        filterId,
    };
}
