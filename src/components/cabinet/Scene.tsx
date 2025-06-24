'use client';

import { Cabinet } from './Cabinet';
import { CameraPresets } from '../layout/CameraPresets';


export function Scene() {
  return (
    <div className='relative w-full h-full bg-background/80'>
      <CameraPresets>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Cabinet />
      </CameraPresets>
    </div>
  );
}
