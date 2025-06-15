'use client'

import { useRef } from 'react';
import { Mesh } from 'three';
import { ChairConfig } from '@/types/furniture';

interface ChairProps {
  config: ChairConfig;
}

export function Chair({ config }: ChairProps) {
  const seatRef = useRef<Mesh>(null);
  const backRef = useRef<Mesh>(null);
  const legsRef = useRef<Mesh[]>([]);
  const armRestsRef = useRef<Mesh[]>([]);

  const {
    dimensions: { seatWidth, seatDepth, seatHeight, backHeight },
    // woodType,
    hasArmrests,
    style
  } = config;

  const backAngle = style === 'modern' ? Math.PI * 0.1 : Math.PI * 0.05; // 18° or 9° tilt

  return (
    <group>
      {/* Seat */}
      <mesh ref={seatRef} position={[0, seatHeight, 0]}>
        <boxGeometry args={[seatWidth, 2, seatDepth]} />
        <meshStandardMaterial color="#d4b285" />
      </mesh>

      {/* Back */}
      <group position={[0, seatHeight + (backHeight - seatHeight) / 2, -seatDepth / 2]} rotation={[-backAngle, 0, 0]}>
        <mesh ref={backRef}>
          <boxGeometry args={[seatWidth, backHeight - seatHeight, 1]} />
          <meshStandardMaterial color="#d4b285" />
        </mesh>
      </group>

      {/* Legs */}
      {Array.from({ length: 4 }).map((_, index) => {
        const x = index % 2 === 0 ? seatWidth / 2 - 1 : -(seatWidth / 2 - 1);
        const z = index < 2 ? seatDepth / 2 - 1 : -(seatDepth / 2 - 1);
        return (
          <mesh
            key={index}
            ref={(el) => (legsRef.current[index] = el as Mesh)}
            position={[x, seatHeight / 2, z]}
          >
            <boxGeometry args={[1.5, seatHeight, 1.5]} />
            <meshStandardMaterial color="#d4b285" />
          </mesh>
        );
      })}

      {/* Armrests */}
      {hasArmrests && (
        <>
          {[-1, 1].map((side, index) => (
            <group key={index} position={[side * (seatWidth / 2 + 1), seatHeight + 8, 0]}>
              <mesh ref={(el) => (armRestsRef.current[index] = el as Mesh)}>
                <boxGeometry args={[1, 2, seatDepth]} />
                <meshStandardMaterial color="#d4b285" />
              </mesh>
              {/* Armrest support */}
              <mesh position={[0, -4, 0]}>
                <boxGeometry args={[1, 8, 1]} />
                <meshStandardMaterial color="#d4b285" />
              </mesh>
            </group>
          ))}
        </>
      )}
    </group>
  );
}
