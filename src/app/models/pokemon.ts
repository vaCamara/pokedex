import { PokemonType } from './type';
import { Sprite } from './sprite';

export class Pokemon {
  id!: number;
  name!: string;
  height!: number;
  weight!: number;
  sprites!: Sprite;
  order!: number;
  types!: PokemonType[];
}
