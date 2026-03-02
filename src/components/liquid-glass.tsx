'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';
import { useLiquidGlass, type UseLiquidGlassOptions } from '@/hooks/use-liquid-glass';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  draggable?: boolean;
  expandable?: boolean;
  width?: string;
  height?: string;
  expandedWidth?: string;
  expandedHeight?: string;
  blurIntensity?: 'sm' | 'md' | 'lg' | 'xl';
  shadowIntensity?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  borderRadius?: string;
  glowIntensity?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  // New physics-based refraction props
  refractiveIndex?: number;
  bezelWidth?: number;
  surfaceType?: UseLiquidGlassOptions['surfaceType'];
  thickness?: number;
  highlightIntensity?: number;
}

export const LiquidGlassCard = ({
  children,
  className = '',
  draggable = true,
  expandable = false,
  width,
  height,
  expandedWidth,
  expandedHeight,
  blurIntensity = 'xl',
  borderRadius = '32px',
  glowIntensity = 'sm',
  shadowIntensity = 'md',
  refractiveIndex = 1.5,
  bezelWidth = 20,
  surfaceType = 'squircle',
  thickness = 1.0,
  highlightIntensity = 0.8,
  ...props
}: LiquidGlassCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Measure element dimensions with ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        setDimensions((prev) => {
          // Avoid unnecessary re-renders for sub-pixel changes
          if (Math.abs(prev.width - w) < 2 && Math.abs(prev.height - h) < 2) return prev;
          return { width: Math.round(w), height: Math.round(h) };
        });
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Generate physics-based displacement map
  const { displacementMapUrl, highlightMapUrl, maxDisplacement, filterId } = useLiquidGlass({
    width: dimensions.width,
    height: dimensions.height,
    bezelWidth,
    refractiveIndex,
    surfaceType,
    thickness,
    highlightIntensity,
  });

  const handleToggleExpansion = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!expandable) return;
    if ((e.target as Element).closest('a, button, input, select, textarea')) return;
    setIsExpanded(!isExpanded);
  };

  const blurClasses = {
    sm: 'backdrop-blur-xs',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  };

  const shadowStyles = {
    none: 'inset 0 0 0 0 rgba(255, 255, 255, 0)',
    xs: 'inset 1px 1px 1px 0 rgba(255, 255, 255, 0.3), inset -1px -1px 1px 0 rgba(255, 255, 255, 0.3)',
    sm: 'inset 2px 2px 2px 0 rgba(255, 255, 255, 0.35), inset -2px -2px 2px 0 rgba(255, 255, 255, 0.35)',
    md: 'inset 3px 3px 3px 0 rgba(255, 255, 255, 0.45), inset -3px -3px 3px 0 rgba(255, 255, 255, 0.45)',
    lg: 'inset 4px 4px 4px 0 rgba(255, 255, 255, 0.5), inset -4px -4px 4px 0 rgba(255, 255, 255, 0.5)',
    xl: 'inset 6px 6px 6px 0 rgba(255, 255, 255, 0.55), inset -6px -6px 6px 0 rgba(255, 255, 255, 0.55)',
  };

  const glowStyles = {
    none: '0 4px 4px rgba(0, 0, 0, 0.05), 0 0 12px rgba(0, 0, 0, 0.05)',
    xs: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 16px rgba(255, 255, 255, 0.05)',
    sm: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 24px rgba(255, 255, 255, 0.1)',
    md: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 32px rgba(255, 255, 255, 0.15)',
    lg: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 40px rgba(255, 255, 255, 0.2)',
    xl: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 48px rgba(255, 255, 255, 0.25)',
  };

  const containerVariants: Variants | undefined = expandable
    ? {
        collapsed: {
          width: width || 'auto',
          height: height || 'auto',
          transition: {
            duration: 0.4,
            ease: [0.5, 1.5, 0.5, 1] as const,
          },
        },
        expanded: {
          width: expandedWidth || 'auto',
          height: expandedHeight || 'auto',
          transition: {
            duration: 0.4,
            ease: [0.5, 1.5, 0.5, 1] as const,
          },
        },
      }
    : undefined;

  const MotionComponent = draggable || expandable ? motion.div : 'div';

  const motionProps =
    draggable || expandable
      ? {
          variants: expandable ? containerVariants : undefined,
          animate: expandable
            ? isExpanded
              ? 'expanded'
              : 'collapsed'
            : undefined,
          onClick: expandable ? handleToggleExpansion : undefined,
          drag: draggable,
          dragConstraints: draggable
            ? { left: 0, right: 0, top: 0, bottom: 0 }
            : undefined,
          dragElastic: draggable ? 0.3 : undefined,
          dragTransition: draggable
            ? {
                bounceStiffness: 300,
                bounceDamping: 10,
                power: 0.3,
              }
            : undefined,
          whileDrag: draggable ? { scale: 1.02 } : undefined,
          whileHover: { scale: 1.01 },
          whileTap: { scale: 0.98 },
        }
      : {};

  const hasDisplacementMap = displacementMapUrl && dimensions.width > 0;

  return (
    <>
      {/* Physics-based SVG Filter */}
      <svg className='hidden' style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter
            id={filterId}
            x='0'
            y='0'
            width='100%'
            height='100%'
            filterUnits='objectBoundingBox'
            colorInterpolationFilters='sRGB'
          >
            {hasDisplacementMap ? (
              <>
                {/* Displacement map for refraction */}
                <feImage
                  href={displacementMapUrl}
                  x='0'
                  y='0'
                  width='100%'
                  height='100%'
                  result='displacement_map'
                  preserveAspectRatio='none'
                />
                <feDisplacementMap
                  in='SourceGraphic'
                  in2='displacement_map'
                  scale={maxDisplacement}
                  xChannelSelector='R'
                  yChannelSelector='G'
                  result='refracted'
                />
                {/* Specular highlight overlay */}
                <feImage
                  href={highlightMapUrl}
                  x='0'
                  y='0'
                  width='100%'
                  height='100%'
                  result='highlight'
                  preserveAspectRatio='none'
                />
                <feBlend
                  in='refracted'
                  in2='highlight'
                  mode='screen'
                  result='final'
                />
              </>
            ) : (
              <>
                {/* Fallback: turbulence-based displacement while map generates */}
                <feTurbulence
                  type='fractalNoise'
                  baseFrequency='0.003 0.007'
                  numOctaves='1'
                  result='turbulence'
                />
                <feDisplacementMap
                  in='SourceGraphic'
                  in2='turbulence'
                  scale='200'
                  xChannelSelector='R'
                  yChannelSelector='G'
                />
              </>
            )}
          </filter>
        </defs>
      </svg>

      <MotionComponent
        ref={containerRef as React.Ref<HTMLDivElement>}
        className={cn(
          `relative ${draggable ? 'cursor-grab active:cursor-grabbing' : ''} ${expandable ? 'cursor-pointer' : ''}`,
          className
        )}
        style={{
          borderRadius,
          ...(width && !expandable && { width }),
          ...(height && !expandable && { height }),
        }}
        {...motionProps}
        {...props}
      >
        {/* Bend Layer — physics-based refraction via SVG displacement */}
        <div
          className={`absolute inset-0 ${blurClasses[blurIntensity]} z-0`}
          style={{
            borderRadius,
            backdropFilter: `url(#${filterId})`,
            WebkitBackdropFilter: `url(#${filterId})`,
          }}
        />

        {/* Dark Tint Layer */}
        <div
          className='absolute inset-0 bg-black/40 z-[1]'
          style={{ borderRadius }}
        />

        {/* Face Layer (Main shadow and glow) */}
        <div
          className='absolute inset-0 z-10'
          style={{
            borderRadius,
            boxShadow: glowStyles[glowIntensity],
          }}
        />

        {/* Edge Layer (Inner highlights) */}
        <div
          className='absolute inset-0 z-20'
          style={{
            borderRadius,
            boxShadow: shadowStyles[shadowIntensity],
          }}
        />

        {/* Content */}
        <div className='relative z-30'>
          {children}
        </div>
      </MotionComponent>
    </>
  );
};
