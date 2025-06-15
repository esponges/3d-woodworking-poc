'use client';

import { useRef } from 'react';
import { Mesh } from 'three';
import { TableConfig } from '@/types/furniture';

interface TableProps {
  config: TableConfig;
}

export function Table({ config }: TableProps) {
  const tableTopRef = useRef<Mesh>(null);
  const legsRef = useRef<Mesh[]>([]);
  const apronRef = useRef<Mesh>(null);

  const {
    dimensions: { width, depth, height, topThickness },
    // woodType,
    hasApron,
  } = config;

  return (
    <group>
      {/* Table Top */}
      <mesh ref={tableTopRef} position={[0, height, 0]}>
        <boxGeometry args={[width, topThickness, depth]} />
        <meshStandardMaterial color='#d4b285' />
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
            <meshStandardMaterial color='#d4b285' />
          </mesh>
        );
      })}

      {/* Apron (optional) */}
      {hasApron && (
        <mesh ref={apronRef} position={[0, height - 4, 0]}>
          <boxGeometry args={[width - 4, 3, depth - 4]} />
          <meshStandardMaterial color='#d4b285' />
        </mesh>
      )}
    </group>
  );
}
