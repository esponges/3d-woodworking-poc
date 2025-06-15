import { create } from 'zustand';
import { TableConfig, ChairConfig } from '@/types/furniture';

interface FurnitureStore {
  selectedType: 'cabinet' | 'table' | 'chair';
  tableConfig: TableConfig;
  chairConfig: ChairConfig;
  setSelectedType: (type: 'cabinet' | 'table' | 'chair') => void;
  updateTableConfig: (config: Partial<TableConfig>) => void;
  updateChairConfig: (config: Partial<ChairConfig>) => void;
}

export const useFurnitureStore = create<FurnitureStore>((set) => ({
  selectedType: 'cabinet',
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
  setSelectedType: (type) => set({ selectedType: type }),
  updateTableConfig: (config) =>
    set((state) => ({
      tableConfig: { ...state.tableConfig, ...config }
    })),
  updateChairConfig: (config) =>
    set((state) => ({
      chairConfig: { ...state.chairConfig, ...config }
    }))
}));
