import { FieldPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';

import { Warrior } from '../../types/warrior';
import { pool } from '../utils/db';

type WarriorModelResults = [WarriorModel[], FieldPacket[]];

export class WarriorModel implements Warrior {
  private id: string;

  constructor(public name: string, public strength: number, public defense: number, public agility: number, public resilience: number, public wonBattles: number, public portraitImagePath: string, public attackImagePath: string) {
    this.id = '';
  }

  static async getAll(): Promise<WarriorModel[]> {
    const [warriors] = await pool.execute('SELECT * FROM warrior') as WarriorModelResults;
    return warriors;
  }

  static async getOne(name: string): Promise<WarriorModel | null> {
    const [warriors] = await pool.execute('SELECT * FROM warrior WHERE name = :name', { name: name }) as WarriorModelResults;
    return warriors.length > 0 ? warriors[0] : null;
  }

  static async warriorExists(name: string): Promise<boolean> {
    const warrior = await WarriorModel.getOne(name);
    return warrior === null ? false : true;
  }

  async insert(): Promise<WarriorModel> {
    if (!this.id) {
      this.id = uuid();
    }

    await pool.execute('INSERT INTO warrior (id, name, strength, defense, agility, resilience, wonBattles, portraitImagePath, attackImagePath) VALUES (:id, :name, :strength, :defense, :agility, :resilience, :wonBattles, :portraitImagePath, :attackImagePath)', {
      id: this.id,
      name: this.name,
      strength: this.strength,
      defense: this.defense,
      agility: this.agility,
      resilience: this.resilience,
      wonBattles: this.wonBattles,
      portraitImagePath: this.portraitImagePath,
      attackImagePath: this.attackImagePath,
    });

    return this;
  }
}