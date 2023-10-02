import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { PokedexService } from '../../../shared/pokedex.service';
import { Pokemon } from '../../../models/pokemon';

export const pokemonResolver: ResolveFn<Pokemon> = (route, state) => {
  return inject(PokedexService).getPokemonDetail(
    Number(route.paramMap.get('id')!),
  );
};
