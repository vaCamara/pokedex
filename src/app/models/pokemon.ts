import { PokemonType } from './type';
import { Sprite } from './sprite';

export class Pokemon {
  id!: number;
  name!: string;
  sprites!: Sprite;
  order!: number;
  types!: PokemonType[];
}
