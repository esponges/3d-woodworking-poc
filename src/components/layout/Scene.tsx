'use client';

import { OrbitControls } from '@react-three/drei';
import { CameraPresets } from './CameraPresets';
import { ReactNode } from 'react';

interface SceneProps {
  children: ReactNode;
  showGrid?: boolean;
  className?: string;
  lightIntensity?: number;
  lightPosition?: [number, number, number];
  enableOrbitControls?: boolean;
}

export function Scene({
  children,
  showGrid = true,
  className = '',
  lightIntensity = 0.5,
  lightPosition = [10, 10, 10],
  enableOrbitControls = false,
}: SceneProps) {
  const content = (
    <CameraPresets>
      <ambientLight intensity={lightIntensity} />
      <directionalLight position={lightPosition} intensity={1} />
      {children}
      {enableOrbitControls && <OrbitControls enableDamping />}
      {showGrid && <gridHelper args={[20, 20]} />}
    </CameraPresets>
  );

  return className ? (
    <div className={className}>
      {content}
    </div>
  ) : content;
}
