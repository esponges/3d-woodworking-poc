import { WoodType } from "@/types/cabinet";

export interface WoodTextures {
  map: string;
  normalMap?: string;
  roughness: number;
}

export const WOOD_TEXTURES: Record<WoodType, WoodTextures> = {
  oak: {
    map: '/textures/oak/WoodFloor051_1K-JPG_Color.jpg',
    roughness: 0.8,
  },
  maple: {
    map: '/textures/maple/WoodFloor053_1K-JPG_Color.jpg',
    roughness: 0.7,
  },
  cherry: {
    map: '/textures/cherry/WoodFloor052_1K-JPG_Color.jpg',
    roughness: 0.6,
  },
  walnut: {
    map: '/textures/walnut/WoodFloor054_1K-JPG_Color.jpg',
    roughness: 0.7,
  },
  pine: {
    map: '/textures/pine/WoodFloor055_1K-JPG_Color.jpg',
    roughness: 0.9,
  },
  fir: {
    map: '/textures/pine/WoodFloor055_1K-JPG_Color.jpg', // Using pine as a temporary substitute
    roughness: 0.85,
  },
  cedar: {
    map: '/textures/cherry/WoodFloor052_1K-JPG_Color.jpg', // Using cherry as a temporary substitute
    roughness: 0.75,
  },
  plywood: {
    map: '/textures/oak/WoodFloor051_1K-JPG_Color.jpg', // Using oak as a temporary substitute
    roughness: 0.9,
  },
  mdf: {
    map: '/textures/walnut/WoodFloor054_1K-JPG_Color.jpg', // Using walnut as a temporary substitute
    roughness: 0.95,
  },
};
