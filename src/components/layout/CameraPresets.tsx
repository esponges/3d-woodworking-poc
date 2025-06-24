import React, { useCallback, useState } from 'react';
import { Vector3Tuple } from 'three';
import { CameraControls } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

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
  canvasProps = {
    position: [5, 5, 5],
    fov: 45,
  },
}: {
  children: React.ReactNode;
  canvasProps?: {
    position?: Vector3Tuple;
    fov?: number;
  };
}) {
  const [controls, setControls] = useState<CameraControls | null>(null);

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
      <Canvas camera={canvasProps}>
        <CameraControls ref={setControls} />
        <Environment preset='warehouse' background blur={0.5} />
        {children}
      </Canvas>
    </div>
  );
}
