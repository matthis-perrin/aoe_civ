export interface Civ {
  name: string;
  imgUrl: string;
  specialty: string;
  uniqUnits: LinkedString[];
  uniqTechs: string[];
  bonuses: string[];
  teamBonus: string;
}

export interface LinkedString {
  value: string;
  link?: string;
}

export interface AoeModel {
  civs: Civ[];
}
