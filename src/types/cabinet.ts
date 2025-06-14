export type WoodType = 'oak' | 'maple' | 'cherry' | 'walnut' | 'pine' | 'fir' | 'cedar' | 'plywood' | 'mdf';

export interface CabinetDimensions {
  width: number;  // in inches
  depth: number;  // in inches
  height: number; // in inches
}

export interface CabinetConfig {
  dimensions: CabinetDimensions;
  woodType: WoodType;
  shelfCount: number;
}

export interface WoodTypeOption {
  value: WoodType;
  label: string;
  color: string; // hex color for visualization
}

export const WOOD_TYPES: WoodTypeOption[] = [
  { value: 'oak', label: 'Oak', color: '#b68c3d' },
  { value: 'maple', label: 'Maple', color: '#d4b285' },
  { value: 'cherry', label: 'Cherry', color: '#922724' },
  { value: 'walnut', label: 'Walnut', color: '#4a3728' },
  { value: 'pine', label: 'Pine', color: '#d4b285' },
  { value: 'fir', label: 'Fir', color: '#b68c3d' },
  { value: 'cedar', label: 'Cedar', color: '#922724' },
  { value: 'plywood', label: 'Plywood', color: '#d4b285' },
  { value: 'mdf', label: 'MDF', color: '#8b7355' }
];
