import { WoodType } from './cabinet';

export interface TableDimensions {
  width: number;      // in inches
  depth: number;      // in inches
  height: number;     // in inches
  topThickness: number; // in inches
}

export interface TableConfig {
  dimensions: TableDimensions;
  woodType: WoodType;
  hasApron: boolean;  // whether the table has an apron under the top
}

export interface ChairDimensions {
  seatWidth: number;    // in inches
  seatDepth: number;    // in inches
  seatHeight: number;   // in inches
  backHeight: number;   // total height from ground to top of back
}

export interface ChairConfig {
  dimensions: ChairDimensions;
  woodType: WoodType;
  hasArmrests: boolean;
  style: 'modern' | 'traditional';
}
