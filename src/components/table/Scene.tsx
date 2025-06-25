'use client';

import { OrbitControls } from '@react-three/drei';
import { Table } from './Table';
import { CameraPresets } from '../layout/CameraPresets';

export function TableScene() {
  return (
    <CameraPresets>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Table />
      <OrbitControls enableDamping />
      <gridHelper args={[20, 20]} />
    </CameraPresets>
  );
}
