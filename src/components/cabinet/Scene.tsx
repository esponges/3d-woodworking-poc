'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, CameraControls } from '@react-three/drei';
import { Cabinet } from './Cabinet';
import { useControls } from '@/hooks/useControls';
import { CameraPresets } from '../layout/CameraPresets';


export function Scene() {
  const { controls, setControls } = useControls();

  return (
    <div className='relative w-full h-full bg-background/80'>
      <CameraPresets controls={controls}>
        <Canvas
          camera={{
            position: [5, 5, 5],
            fov: 45,
          }}
        >
          <CameraControls ref={setControls} />
          <Environment preset='warehouse' background blur={0.5} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Cabinet />
        </Canvas>
      </CameraPresets>
    </div>
  );
}
