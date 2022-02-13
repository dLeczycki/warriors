export enum AttackResult {
  dpDamage,
  dpDestroyed,
  dpDestroyedAndHpDamage,
  hpDamage,
}

export interface FightLog {
  attackerName: string;
  defenderName: string;
  defenderHp: number;
  defenderDp: number;
  attackResult: AttackResult;
}