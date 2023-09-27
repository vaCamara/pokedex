import { Pokemon } from './pokemon';

export class ListResult {
  count!: string;
  next?: string;
  previous?: string;
  results!: Pokemon[];
}
