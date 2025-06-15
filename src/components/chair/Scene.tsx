'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Chair } from './Chair';
import { ChairConfig } from '@/types/furniture';

interface ChairSceneProps {
  config: ChairConfig;
}

export function ChairScene({ config }: ChairSceneProps) {
  return (
    <Canvas
      camera={{ position: [10, 10, 10], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Chair config={config} />
      <OrbitControls enableDamping />
      <gridHelper args={[20, 20]} />
    </Canvas>
  );
}
