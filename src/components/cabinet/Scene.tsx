'use client';

import { Cabinet } from './Cabinet';
import { Scene as BaseScene } from '../layout/Scene';

export function Scene() {
  return (
    <BaseScene
      className="relative w-full h-full bg-background/80"
      lightPosition={[5, 5, 5]}
    >
      <Cabinet />
    </BaseScene>
  );
}
