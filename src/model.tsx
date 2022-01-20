export interface Civ {
  name: string;
  imgUrl: string;
  specialty: string;
  uniqUnits: LinkedString[];
  uniqTechs: LinkedString[];
  bonuses: string[];
  teamBonus: string;
}

export interface ImageInfo {
  src: string;
  width: number;
  height: number;
}

export interface LinkedString {
  value: string;
  link?: string;
  src?: string;
  width?: number;
  height?: number;
}

export interface AoeModel {
  civs: Civ[];
}
