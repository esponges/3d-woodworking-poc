'use client';

import { useRef } from 'react';
import { Mesh } from 'three';
import { useTexture } from '@react-three/drei';
import { TableConfig } from '@/types/furniture';
import { WOOD_TEXTURES } from '@/data/wood-textures';

interface TableProps {
  config: TableConfig;
}

export function Table({ config }: TableProps) {
  const tableTopRef = useRef<Mesh>(null);
  const legsRef = useRef<Mesh[]>([]);
  const apronRef = useRef<Mesh>(null);

  const {
    dimensions: { width, depth, height, topThickness },
    woodType,
    hasApron,
  } = config;

  const woodTextures = WOOD_TEXTURES[woodType];
  const [colorMap] = useTexture([woodTextures.map]);

  return (
    <group>
      {/* Table Top */}
      <mesh ref={tableTopRef} position={[0, height, 0]}>
        <boxGeometry args={[width, topThickness, depth]} />
        <meshStandardMaterial
          map={colorMap}
          roughness={woodTextures.roughness}
          normalScale={[0.5, 0.5]}
        />
      </mesh>

      {/* Table Legs */}
      {Array.from({ length: 4 }).map((_, index) => {
        const x = index % 2 === 0 ? width / 2 - 1 : -(width / 2 - 1);
        const z = index < 2 ? depth / 2 - 1 : -(depth / 2 - 1);
        return (
          <mesh
            key={index}
            ref={(el) => (legsRef.current[index] = el as Mesh)}
            position={[x, height / 2, z]}
          >
            <boxGeometry args={[2, height, 2]} />
            <meshStandardMaterial
              map={colorMap}
              roughness={woodTextures.roughness}
              normalScale={[0.5, 0.5]}
            />
          </mesh>
        );
      })}

      {/* Apron (optional) */}
      {hasApron && (
        <mesh ref={apronRef} position={[0, height - 4, 0]}>
          <boxGeometry args={[width - 4, 3, depth - 4]} />
          <meshStandardMaterial
            map={colorMap}
            roughness={woodTextures.roughness}
            normalScale={[0.5, 0.5]}
          />
        </mesh>
      )}
    </group>
  );
}
