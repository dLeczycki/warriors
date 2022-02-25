import { Warrior } from "./warrior";

export enum AttackResult {
  dodge,
  dpDamage,
  dpDestroyed,
  hpDamage,
}

export interface FightLog {
  attackerName: string;
  defenderName: string;
  defenderHp: number;
  defenderDp: number;
  attackResult: AttackResult;
}

export interface FightResult {
  fightLogs: FightLog[];
  winner: Warrior;
  looser: Warrior;
}

export enum FightStages {
  NOT_STARTED,
  IN_FIGHT,
  FINISHED,
}