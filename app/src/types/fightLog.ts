import { Warrior } from "./warrior";

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

export enum AttackResult {
  dodge,
  dpDamage,
  hpDamage,
}

export enum FightEffects {
  NONE = "",
  DODGE = 'dodge',
  WIN = 'win',
}