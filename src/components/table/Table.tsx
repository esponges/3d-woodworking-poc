'use client';

import { useRef } from 'react';
import { Mesh } from 'three';
import { useTexture } from '@react-three/drei';
import { WOOD_TEXTURES } from '@/data/wood-textures';
import { useFurnitureStore } from '@/lib/store/furniture';


export function Table() {
  const { tableConfig: config } = useFurnitureStore();

  const tableTopRef = useRef<Mesh>(null);
  const legsRef = useRef<Mesh[]>([]);
  const apronRef = useRef<Mesh>(null);

  // Convert inches to Three.js units (consistent with cabinet)
  const scale = 0.1;
  const {
    dimensions: { width: rawWidth, depth: rawDepth, height: rawHeight, topThickness: rawTopThickness },
    woodType,
    hasApron,
  } = config;

  // Apply scaling to dimensions
  const width = rawWidth * scale;
  const depth = rawDepth * scale;
  const height = rawHeight * scale;
  const topThickness = rawTopThickness * scale;
  
  // Standard thicknesses (scaled)
  const legThickness = 2 * scale; // 2" leg thickness
  const apronHeight = 3 * scale; // 3" apron height

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
        const x = index % 2 === 0 ? width / 2 - legThickness : -(width / 2 - legThickness);
        const z = index < 2 ? depth / 2 - legThickness : -(depth / 2 - legThickness);
        return (
          <mesh
            key={index}
            ref={(el) => (legsRef.current[index] = el as Mesh)}
            position={[x, height / 2, z]}
          >
            <boxGeometry args={[legThickness, height, legThickness]} />
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
        <mesh ref={apronRef} position={[0, height - apronHeight * 2, 0]}>
          <boxGeometry args={[width - legThickness * 2, apronHeight, depth - legThickness * 2]} />
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
