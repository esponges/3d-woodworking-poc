import { WoodType } from "@/types/cabinet";

export interface WoodTextures {
  map: string;
  normalMap?: string;
  roughness: number;
}

export const WOOD_TEXTURES: Record<WoodType, WoodTextures> = {
  oak: {
    map: '/textures/oak/color.jpg',
    roughness: 0.8,
  },
  maple: {
    map: '/textures/maple/color.jpg',
    roughness: 0.7,
  },
  cherry: {
    map: '/textures/cherry/color.jpg',
    roughness: 0.6,
  },
  walnut: {
    map: '/textures/walnut/color.jpg',
    roughness: 0.7,
  },
  pine: {
    map: '/textures/pine/color.jpg',
    roughness: 0.9,
  },
  fir: {
    map: '/textures/pine/color.jpg', // Using pine as a temporary substitute
    roughness: 0.85,
  },
  cedar: {
    map: '/textures/cherry/color.jpg', // Using cherry as a temporary substitute
    roughness: 0.75,
  },
  plywood: {
    map: '/textures/oak/color.jpg', // Using oak as a temporary substitute
    roughness: 0.9,
  },
  mdf: {
    map: '/textures/walnut/color.jpg', // Using walnut as a temporary substitute
    roughness: 0.95,
  },
};
