import React, { useCallback } from 'react';
import { Vector3Tuple } from 'three';
import { CameraControls } from '@react-three/drei';
import { Button } from '@/components/ui/button';

type CameraPreset = {
  pos: Vector3Tuple;
  target: Vector3Tuple;
};

const CAMERA_PRESETS: Record<string, CameraPreset> = {
  front: { pos: [0, 2, 5], target: [0, 2, 0] },
  side: { pos: [5, 2, 0], target: [0, 2, 0] },
  top: { pos: [0, 8, 0], target: [0, 2, 0] },
  isometric: { pos: [5, 5, 5], target: [0, 2, 0] },
};

export function CameraPresets({
  children,
  controls,
}: {
  children: React.ReactNode;
  controls: CameraControls | null;
}) {
  const setCameraPreset = useCallback(
    (preset: keyof typeof CAMERA_PRESETS) => {
      if (controls) {
        const { pos, target } = CAMERA_PRESETS[preset];
        controls.setLookAt(
          pos[0],
          pos[1],
          pos[2],
          target[0],
          target[1],
          target[2],
          true
        );
      }
    },
    [controls]
  );

  return (
    <div className='relative w-full h-full bg-background/80'>
      <div className='absolute top-4 right-4 z-10 flex gap-2'>
        {Object.keys(CAMERA_PRESETS).map((preset) => (
          <Button
            key={preset}
            variant='secondary'
            onClick={() =>
              setCameraPreset(preset as keyof typeof CAMERA_PRESETS)
            }
            className='capitalize'
          >
            {preset}
          </Button>
        ))}
      </div>
      {children}
    </div>
  );
}
