'use client';

import { useRef, Suspense } from 'react';
import { useTexture } from '@react-three/drei';
import { Group, Vector3Tuple } from 'three';
import { useCabinetStore } from '@/lib/store/cabinet';
import { WOOD_TEXTURES } from '@/data/wood-textures';

interface CabinetPartProps {
  position: Vector3Tuple;
  dimensions: Vector3Tuple;
  rotation?: Vector3Tuple;
  woodTextures: {
    map: string;
    normalMap?: string;
    roughness: number;
  };
}

function CabinetPartContent({
  position,
  dimensions,
  rotation = [0, 0, 0],
  woodTextures,
}: CabinetPartProps) {
  // Load textures as an array
  const [colorMap] = useTexture([woodTextures.map]);

  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={dimensions} />
      <meshStandardMaterial
        map={colorMap}
        roughness={woodTextures.roughness}
        normalScale={[0.5, 0.5]}
      />
    </mesh>
  );
}

function CabinetPart(props: CabinetPartProps) {
  return (
    <Suspense
      fallback={
        <mesh position={props.position} rotation={props.rotation}>
          <boxGeometry args={props.dimensions} />
          <meshStandardMaterial color='#8B4513' roughness={0.8} />
        </mesh>
      }
    >
      <CabinetPartContent {...props} />
    </Suspense>
  );
}

export function Cabinet() {
  const { config } = useCabinetStore();
  const groupRef = useRef<Group>(null);

  // Convert inches to Three.js units (we'll use 1 inch = 0.1 units for better visualization)
  const scale = 0.1;
  const width = config.dimensions.width * scale;
  const depth = config.dimensions.depth * scale;
  const height = config.dimensions.height * scale;
  const thickness = 0.75 * scale; // 3/4 inch standard cabinet material thickness

  // Get the wood textures
  const woodTextures = WOOD_TEXTURES[config.woodType];

  return (
    <group ref={groupRef}>
      {/* Back panel */}
      <CabinetPart
        position={[0, height / 2, -depth / 2]}
        dimensions={[width, height, thickness]}
        woodTextures={woodTextures}
      />

      {/* Left side */}
      <CabinetPart
        position={[-width / 2, height / 2, 0]}
        dimensions={[thickness, height, depth]}
        woodTextures={woodTextures}
      />

      {/* Right side */}
      <CabinetPart
        position={[width / 2, height / 2, 0]}
        dimensions={[thickness, height, depth]}
        woodTextures={woodTextures}
      />

      {/* Top */}
      <CabinetPart
        position={[0, height, 0]}
        dimensions={[width, thickness, depth]}
        woodTextures={woodTextures}
      />

      {/* Bottom */}
      <CabinetPart
        position={[0, 0, 0]}
        dimensions={[width, thickness, depth]}
        woodTextures={woodTextures}
      />

      {/* Shelves */}
      {Array.from({ length: config.shelfCount }).map((_, i) => {
        const shelfHeight = (height * (i + 1)) / (config.shelfCount + 1);
        return (
          <CabinetPart
            key={i}
            position={[0, shelfHeight, 0]}
            dimensions={[width - thickness * 2, thickness, depth - thickness]}
            woodTextures={woodTextures}
          />
        );
      })}
    </group>
  );
}
