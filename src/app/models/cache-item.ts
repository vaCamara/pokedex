import { Pokemon } from './pokemon';
import { Species } from './species';

export class CacheItem {
  pokemon?: Pokemon;
  species?: Species;

  constructor(pokemon?: Pokemon, species?: Species) {
    this.pokemon = pokemon;
    this.species = species;
  }
}
