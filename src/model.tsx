export interface Civ {
  name: string;
  imgUrl: string;
  specialty: string;
  uniqUnits: string[];
  uniqTechs: string[];
  bonuses: string[];
  teamBonus: string;
}

export interface AoeModel {
  civs: Civ[];
}
