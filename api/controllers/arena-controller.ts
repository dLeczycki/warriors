import { Request, Response } from "express";

import { FightLog, AttackResult } from "../../types/fightLog";
import { WarriorModel } from "../models/warrior-model";
import { ValidationError } from "../utils/errors";
import { randomEnum } from "../utils/helpers";

type FightResult = { fightLogs: FightLog[], winner: WarriorModel, looser: WarriorModel };
export enum Turn {
  firstWarrior,
  secondWarrior
}

export async function fight(req: Request, res: Response) {
  const { firstWarriorName, secondWarriorName } = req.body;

  if (!firstWarriorName || !secondWarriorName) {
    throw new ValidationError('You must specify warrior names');
  }

  const firstWarrior = await WarriorModel.getOne(firstWarriorName);
  const secondWarrior = await WarriorModel.getOne(secondWarriorName);

  if (!firstWarrior || !secondWarrior) {
    throw new ValidationError('Wrong warrior names specified');
  }

  const { fightLogs, winner, looser } = generateFightLogs(firstWarrior, secondWarrior);
  await WarriorModel.increaseWonBattles(winner);

  res.json({ fightLogs, winner, looser });
}

function generateFightLogs(firstWarrior: WarriorModel, secondWarrior: WarriorModel): FightResult {
  const fightLogs: FightLog[] = [];
  firstWarrior.hp = firstWarrior.resilience * 10;
  firstWarrior.dp = firstWarrior.defense;
  secondWarrior.hp = secondWarrior.resilience * 10;
  secondWarrior.dp = secondWarrior.defense;

  let turn = randomEnum(Turn);

  while (firstWarrior.hp > 0 && secondWarrior.hp > 0) {
    const attacker = turn === Turn.firstWarrior ? firstWarrior : secondWarrior;
    const defender = turn === Turn.firstWarrior ? secondWarrior : firstWarrior;

    const attackResult: AttackResult = attack(attacker, defender);

    const log: FightLog = {
      attackerName: attacker.name,
      defenderName: defender.name,
      defenderHp: defender.hp,
      defenderDp: defender.dp,
      attackResult,
    }
    fightLogs.push(log);

    turn = turn === Turn.firstWarrior ? Turn.secondWarrior : Turn.firstWarrior;
  }

  const winner = turn === Turn.firstWarrior ? secondWarrior : firstWarrior;
  const looser = turn === Turn.firstWarrior ? firstWarrior : secondWarrior;

  return { fightLogs, winner, looser };
}

function attack(attacker: WarriorModel, defender: WarriorModel): AttackResult {
  let dodge = false;
  if (defender.agility > attacker.agility) {
    const rand = Math.random();
    const dodgeThreshold = 0.1 * (defender.agility - attacker.agility)
    if (rand < dodgeThreshold) {
      dodge = true;
    }
  }

  if (dodge) {
    return AttackResult.dodge;
  }
  else if (defender.dp > 0) {
    if (defender.dp > 1) {
      defender.dp--;
      return AttackResult.dpDamage;
    }
    else {
      defender.dp = 0;
      return AttackResult.dpDestroyed;
    }
  } else {
    defender.hp -= attacker.strength;
    return AttackResult.hpDamage;
  }
}