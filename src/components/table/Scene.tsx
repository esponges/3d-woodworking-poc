'use client';

import { OrbitControls } from '@react-three/drei';
import { Table } from './Table';
import { TableConfig } from '@/types/furniture';
import { CameraPresets } from '../layout/CameraPresets';

interface TableSceneProps {
  config: TableConfig;
}

export function TableScene({ config }: TableSceneProps) {
  return (
    <CameraPresets>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Table config={config} />
      <OrbitControls enableDamping />
      <gridHelper args={[20, 20]} />
    </CameraPresets>
  );
}
