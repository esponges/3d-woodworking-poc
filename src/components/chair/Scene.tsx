'use client';

import { OrbitControls } from '@react-three/drei';
import { Chair } from './Chair';
import { CameraPresets } from '../layout/CameraPresets';

export function ChairScene() {
  return (
    <CameraPresets>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Chair />
      <OrbitControls enableDamping />
      <gridHelper args={[20, 20]} />
    </CameraPresets>
  );
}
