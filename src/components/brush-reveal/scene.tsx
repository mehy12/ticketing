'use client';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import BrushModel from './model';
import useDimension from './hooks/useDimension';

interface BrushRevealSceneProps {
  images: { url: string; position?: [number, number]; scale?: [number, number] }[];
  className?: string;
}

export default function BrushRevealScene({ images, className }: BrushRevealSceneProps) {
  const device = useDimension();

  if (!device.width || !device.height) {
    return null;
  }

  const frustumSize = device.height;
  const aspect = device.width / device.height;

  return (
    <div className={className}>
      <Canvas>
        <OrthographicCamera
          makeDefault
          args={[
            (frustumSize * aspect) / -2,
            (frustumSize * aspect) / 2,
            frustumSize / 2,
            frustumSize / -2,
            -1000,
            1000,
          ]}
          position={[0, 0, 2]}
        />
        <BrushModel
          images={images}
          containerWidth={device.width}
          containerHeight={device.height}
        />
      </Canvas>
    </div>
  );
}
