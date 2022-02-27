export interface Warrior {
  name: string;
  strength: number;
  defense: number;
  agility: number;
  resilience: number;
  wonBattles: number;
  portraitImagePath: string;
  attackImagePath: string;
  hp: number;
  dp: number;
}

export interface WarriorToInsert {
  name: string;
  strength: number;
  defense: number;
  agility: number;
  resilience: number;
}