import { create } from 'zustand';
import { CabinetConfig, WoodType } from '@/types/cabinet';

interface CabinetStore {
  config: CabinetConfig;
  setDimensions: (width: number, depth: number, height: number) => void;
  setWoodType: (woodType: WoodType) => void;
  setShelfCount: (count: number) => void;
}

export const useCabinetStore = create<CabinetStore>((set) => ({
  config: {
    dimensions: {
      width: 24,
      depth: 24,
      height: 30,
    },
    woodType: 'oak',
    shelfCount: 2,
  },
  setDimensions: (width, depth, height) =>
    set((state) => ({
      config: {
        ...state.config,
        dimensions: { width, depth, height },
      },
    })),
  setWoodType: (woodType) =>
    set((state) => ({
      config: {
        ...state.config,
        woodType,
      },
    })),
  setShelfCount: (count) =>
    set((state) => ({
      config: {
        ...state.config,
        shelfCount: count,
      },
    })),
}));
