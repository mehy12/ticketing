// @ts-nocheck
'use client';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useFBO } from '@react-three/drei';
import * as THREE from 'three';
import useMouse from './hooks/useMouse';
import useDimension from './hooks/useDimension';
import { vertex, fragment } from './shaders';

/**
 * Generates a radial gradient brush texture as a Three.js DataTexture.
 * Avoids needing an external brush.png file.
 */
function createBrushTexture(size = 128): THREE.DataTexture {
  const data = new Uint8Array(size * size * 4);
  const center = size / 2;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const dx = x - center;
      const dy = y - center;
      const dist = Math.sqrt(dx * dx + dy * dy) / center;

      // Smooth radial falloff
      const alpha = Math.max(0, 1 - dist);
      const smoothAlpha = alpha * alpha * (3 - 2 * alpha); // smoothstep

      data[idx] = 255;
      data[idx + 1] = 255;
      data[idx + 2] = 255;
      data[idx + 3] = Math.round(smoothAlpha * 255);
    }
  }

  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.needsUpdate = true;
  return tex;
}

interface BrushModelProps {
  images: { url: string; position?: [number, number]; scale?: [number, number] }[];
  containerWidth: number;
  containerHeight: number;
}

export default function BrushModel({ images, containerWidth, containerHeight }: BrushModelProps) {
  const { viewport } = useThree();
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const [meshes, setMeshes] = useState<React.ReactNode[]>([]);
  const mouse = useMouse();
  const device = useDimension();
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const currentWaveRef = useRef(0);
  const { gl, camera } = useThree();

  // Create brush texture as DataTexture (no external file needed)
  const brushTexture = useMemo(() => createBrushTexture(128), []);

  const scene = useMemo(() => new THREE.Scene(), []);
  const max = 100;

  const uniforms = useRef({
    uDisplacement: { value: null as THREE.Texture | null },
    uTexture: { value: null as THREE.Texture | null },
    winResolution: {
      value: new THREE.Vector2(0, 0),
    },
  });

  const fboBase = useFBO(containerWidth || 1, containerHeight || 1);
  const fboTexture = useFBO(containerWidth || 1, containerHeight || 1);

  // Load images via TextureLoader (works with external URLs)
  const texturesRef = useRef<THREE.Texture[]>([]);
  const [texturesLoaded, setTexturesLoaded] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';
    let loaded = 0;
    const textures: THREE.Texture[] = [];

    images.forEach((img, i) => {
      loader.load(img.url, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        textures[i] = tex;
        loaded++;
        if (loaded === images.length) {
          texturesRef.current = textures;
          setTexturesLoaded(true);
        }
      });
    });
  }, [images.map(i => i.url).join(',')]);

  // Build the image scene with loaded textures
  const imageSceneRef = useRef<{ scene: THREE.Scene; camera: THREE.OrthographicCamera } | null>(null);

  useEffect(() => {
    if (!texturesLoaded || texturesRef.current.length === 0) return;

    const imgScene = new THREE.Scene();
    const imgCamera = new THREE.OrthographicCamera(
      viewport.width / -2,
      viewport.width / 2,
      viewport.height / 2,
      viewport.height / -2,
      -1000,
      1000
    );
    imgCamera.position.z = 2;
    imgScene.add(imgCamera);

    const geometry = new THREE.PlaneGeometry(1, 1);
    const group = new THREE.Group();

    texturesRef.current.forEach((tex, i) => {
      const material = new THREE.MeshBasicMaterial({ map: tex });
      const mesh = new THREE.Mesh(geometry, material);
      const img = images[i];

      // Position: fraction of viewport
      const pos = img.position || [0, 0];
      mesh.position.x = pos[0] * viewport.width;
      mesh.position.y = pos[1] * viewport.height;
      mesh.position.z = 1;

      // Scale: use viewport-relative sizing
      const scale = img.scale || [viewport.width / 4, viewport.width / 3];
      mesh.scale.x = scale[0];
      mesh.scale.y = scale[1];
      group.add(mesh);
    });

    imgScene.add(group);
    imageSceneRef.current = { scene: imgScene, camera: imgCamera };
  }, [texturesLoaded, viewport.width, viewport.height]);

  // Generate brush meshes
  useEffect(() => {
    const generatedMeshes = Array.from({ length: max }).map((_, i) => (
      <mesh
        key={i}
        position={[0, 0, 0]}
        ref={(el) => { meshRefs.current[i] = el; }}
        rotation={[0, 0, Math.random()]}
        visible={false}
      >
        <planeGeometry args={[60, 60, 1, 1]} />
        <meshBasicMaterial transparent map={brushTexture} />
      </mesh>
    ));
    setMeshes(generatedMeshes);
  }, [brushTexture]);

  function setNewWave(x: number, y: number, waveIdx: number) {
    const mesh = meshRefs.current[waveIdx];
    if (mesh) {
      mesh.position.x = x;
      mesh.position.y = y;
      mesh.visible = true;
      (mesh.material as THREE.MeshBasicMaterial).opacity = 1;
      mesh.scale.x = 1.75;
      mesh.scale.y = 1.75;
    }
  }

  function trackMousePos(x: number, y: number) {
    const prev = prevMouseRef.current;
    if (Math.abs(x - prev.x) > 0.1 || Math.abs(y - prev.y) > 0.1) {
      const nextWave = (currentWaveRef.current + 1) % max;
      currentWaveRef.current = nextWave;
      setNewWave(x, y, nextWave);
    }
    prevMouseRef.current = { x, y };
  }

  useFrame(({ gl, scene: finalScene }) => {
    if (!containerWidth || !containerHeight || !imageSceneRef.current) return;

    const x = mouse.x - device.width / 2;
    const y = -mouse.y + device.height / 2;
    trackMousePos(x, y);

    meshRefs.current.forEach((mesh) => {
      if (mesh && mesh.visible) {
        mesh.rotation.z += 0.025;
        (mesh.material as THREE.MeshBasicMaterial).opacity *= 0.95;
        mesh.scale.x = 0.98 * mesh.scale.x + 0.155;
        mesh.scale.y = 0.98 * mesh.scale.y + 0.155;
      }
    });

    if (device.width > 0 && device.height > 0) {
      // Render brush strokes to FBO
      gl.setRenderTarget(fboBase);
      gl.clear();
      meshRefs.current.forEach((mesh) => {
        if (mesh && mesh.visible) scene.add(mesh);
      });
      gl.render(scene, camera);
      meshRefs.current.forEach((mesh) => {
        if (mesh && mesh.visible) scene.remove(mesh);
      });

      // Render images to texture FBO
      const { scene: imgScene, camera: imgCamera } = imageSceneRef.current;
      gl.setRenderTarget(fboTexture);
      gl.render(imgScene, imgCamera);

      uniforms.current.uTexture.value = fboTexture.texture;
      uniforms.current.uDisplacement.value = fboBase.texture;

      gl.setRenderTarget(null);
      gl.render(finalScene, camera);

      uniforms.current.winResolution.value = new THREE.Vector2(
        device.width,
        device.height
      ).multiplyScalar(device.pixelRatio);
    }
  }, 1);

  return (
    <group>
      {meshes}
      <mesh>
        <planeGeometry args={[device.width, device.height, 1, 1]} />
        <shaderMaterial
          vertexShader={vertex}
          fragmentShader={fragment}
          transparent
          uniforms={uniforms.current}
        />
      </mesh>
    </group>
  );
}
