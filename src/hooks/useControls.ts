import { useState } from 'react';
import { CameraControls } from '@react-three/drei';

export function useControls() {
  const [controls, setControls] = useState<CameraControls | null>(null);

  return {
    controls,
    setControls,
  };
}
