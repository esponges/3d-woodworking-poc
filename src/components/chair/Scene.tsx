'use client';

import { OrbitControls } from '@react-three/drei';
import { Chair } from './Chair';
import { ChairConfig } from '@/types/furniture';
import { CameraPresets } from '../layout/CameraPresets';

interface ChairSceneProps {
  config: ChairConfig;
}

export function ChairScene({ config }: ChairSceneProps) {
  return (
    <CameraPresets>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Chair config={config} />
      <OrbitControls enableDamping />
      <gridHelper args={[20, 20]} />
    </CameraPresets>
  );
}
