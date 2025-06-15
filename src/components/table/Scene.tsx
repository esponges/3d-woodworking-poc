'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Table } from './Table';
import { TableConfig } from '@/types/furniture';

interface TableSceneProps {
  config: TableConfig;
}

export function TableScene({ config }: TableSceneProps) {
  return (
    <Canvas
      camera={{ position: [10, 10, 10], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Table config={config} />
      <OrbitControls enableDamping />
      <gridHelper args={[20, 20]} />
    </Canvas>
  );
}
