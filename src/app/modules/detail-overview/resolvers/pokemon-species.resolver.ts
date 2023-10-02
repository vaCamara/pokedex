import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { PokedexService } from '../../../shared/pokedex.service';
import { Species } from '../../../models/species';

export const pokemonSpeciesResolver: ResolveFn<Species> = (route) => {
  return inject(PokedexService).getPokemonSpecies(
    Number(route.paramMap.get('id')!),
  );
};
