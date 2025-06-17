import { create } from 'zustand';
import { TableConfig, ChairConfig } from '@/types/furniture';
import { CabinetConfig } from '@/types/cabinet';

interface FurnitureStore {
  selectedType: 'cabinet' | 'table' | 'chair';
  
  // Configs
  cabinetConfig: CabinetConfig;
  tableConfig: TableConfig;
  chairConfig: ChairConfig;
  
  // Navigation
  setSelectedType: (type: 'cabinet' | 'table' | 'chair') => void;
  
  // Config updaters
  updateCabinetConfig: (config: Partial<CabinetConfig>) => void;
  updateTableConfig: (config: Partial<TableConfig>) => void;
  updateChairConfig: (config: Partial<ChairConfig>) => void;
}

export const useFurnitureStore = create<FurnitureStore>((set) => ({
  selectedType: 'cabinet',
  
  // Initial configs
  cabinetConfig: {
    dimensions: {
      width: 24,
      depth: 24,
      height: 30,
    },
    woodType: 'oak',
    shelfCount: 2,
  },
  tableConfig: {
    dimensions: {
      width: 48,
      depth: 30,
      height: 30,
      topThickness: 1.5
    },
    woodType: 'oak',
    hasApron: true
  },
  chairConfig: {
    dimensions: {
      seatWidth: 18,
      seatDepth: 16,
      seatHeight: 18,
      backHeight: 36
    },
    woodType: 'oak',
    hasArmrests: true,
    style: 'modern'
  },

  // Navigation
  setSelectedType: (type) => set({ selectedType: type }),

  // Config updaters
  updateCabinetConfig: (config) =>
    set((state) => ({
      cabinetConfig: { ...state.cabinetConfig, ...config }
    })),
  updateTableConfig: (config) =>
    set((state) => ({
      tableConfig: { ...state.tableConfig, ...config }
    })),
  updateChairConfig: (config) =>
    set((state) => ({
      chairConfig: { ...state.chairConfig, ...config }
    }))
}));
