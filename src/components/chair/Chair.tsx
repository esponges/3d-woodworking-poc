'use client';

import { useRef } from 'react';
import { Mesh } from 'three';
import { useTexture } from '@react-three/drei';
import { WOOD_TEXTURES } from '@/data/wood-textures';
import { useFurnitureStore } from '@/lib/store/furniture';


export function Chair() {
  const { chairConfig: config } = useFurnitureStore();

  const seatRef = useRef<Mesh>(null);
  const backRef = useRef<Mesh>(null);
  const legsRef = useRef<Mesh[]>([]);
  const armRestsRef = useRef<Mesh[]>([]);

  // Convert inches to Three.js units (consistent with cabinet)
  const scale = 0.1;
  const {
    dimensions: { seatWidth: rawSeatWidth, seatDepth: rawSeatDepth, seatHeight: rawSeatHeight, backHeight: rawBackHeight },
    woodType,
    hasArmrests,
    style
  } = config;

  // Apply scaling to dimensions
  const seatWidth = rawSeatWidth * scale;
  const seatDepth = rawSeatDepth * scale;
  const seatHeight = rawSeatHeight * scale;
  const backHeight = rawBackHeight * scale;
  
  // Standard thicknesses (scaled)
  const thickness = 0.75 * scale; // 3/4" standard thickness
  const seatThickness = 1 * scale; // 1" seat thickness
  const legThickness = 1.5 * scale; // 1.5" leg thickness

  const woodTextures = WOOD_TEXTURES[woodType];
  const [colorMap] = useTexture([woodTextures.map]);

  const backAngle = style === 'modern' ? Math.PI * 0.1 : Math.PI * 0.05; // 18° or 9° tilt

  const sharedMaterial = (
    <meshStandardMaterial
      map={colorMap}
      roughness={woodTextures.roughness}
      normalScale={[0.5, 0.5]}
    />
  );

  return (
    <group>
      {/* Seat */}
      <mesh ref={seatRef} position={[0, seatHeight, 0]}>
        <boxGeometry args={[seatWidth, seatThickness, seatDepth]} />
        {sharedMaterial}
      </mesh>

      {/* Back */}
      <group position={[0, seatHeight + (backHeight - seatHeight) / 2, -seatDepth / 2]} rotation={[-backAngle, 0, 0]}>
        <mesh ref={backRef}>
          <boxGeometry args={[seatWidth, backHeight - seatHeight, thickness]} />
          {sharedMaterial}
        </mesh>
      </group>

      {/* Legs */}
      {Array.from({ length: 4 }).map((_, index) => {
        const x = index % 2 === 0 ? seatWidth / 2 - legThickness : -(seatWidth / 2 - legThickness);
        const z = index < 2 ? seatDepth / 2 - legThickness : -(seatDepth / 2 - legThickness);
        return (
          <mesh
            key={index}
            ref={(el) => (legsRef.current[index] = el as Mesh)}
            position={[x, seatHeight / 2, z]}
          >
            <boxGeometry args={[legThickness, seatHeight, legThickness]} />
            {sharedMaterial}
          </mesh>
        );
      })}

      {/* Armrests */}
      {hasArmrests && (
        <>
          {[-1, 1].map((side, index) => (
            <group key={index} position={[side * (seatWidth / 2 + thickness), seatHeight + 8 * scale, 0]}>
              <mesh ref={(el) => (armRestsRef.current[index] = el as Mesh)}>
                <boxGeometry args={[thickness, seatThickness, seatDepth]} />
                {sharedMaterial}
              </mesh>
              {/* Armrest support */}
              <mesh position={[0, -4 * scale, 0]}>
                <boxGeometry args={[thickness, 8 * scale, thickness]} />
                {sharedMaterial}
              </mesh>
            </group>
          ))}
        </>
      )}
    </group>
  );
}
