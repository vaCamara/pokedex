import { PokemonType } from './type';
import { Sprite } from './sprite';
import { BaseStats } from './base-stats';
import { TypeDetail } from './type-detail';

export class Pokemon {
  id!: number;
  name!: string;
  height!: number;
  weight!: number;
  sprites!: Sprite;
  order!: number;
  types!: PokemonType[];
  typeDetails: TypeDetail[] = [];
  stats!: BaseStats[];
}
