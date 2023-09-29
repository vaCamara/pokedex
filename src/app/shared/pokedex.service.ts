import { Injectable } from '@angular/core';
import { map, mergeAll, mergeMap, Observable, toArray } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
import { ListResult } from '../models/list-result';

@Injectable()
export class PokedexService {
  endpoint = 'https://pokeapi.co/api/v2/pokemon';

  constructor(protected http: HttpClient) {}

  getFirstVersionPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<ListResult>(`${this.endpoint}?offset=0&limit=151`)
      .pipe(
        map((listResult) => listResult.results),
        mergeAll(),
        mergeMap((pokemon) => this.getPokemonDetail(pokemon.name)),
        toArray(),
        map((pokemons) => pokemons.sort((a, b) => a.id - b.id)),
      );
  }

  getPokemonDetail(pokemonName: string) {
    return this.http.get<Pokemon>(`${this.endpoint}/${pokemonName}`);
  }
}
