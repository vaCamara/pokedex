import { Injectable } from '@angular/core';
import { map, mergeAll, mergeMap, Observable, of, tap, toArray } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
import { ListResult } from '../models/list-result';
import { Species } from '../models/species';
import { CacheItem } from '../models/cache-item';
import { GrowthRate } from '../models/growth-rate';

@Injectable({ providedIn: 'root' })
export class PokedexService {
  endpoint = 'https://pokeapi.co/api/v2';

  map: Map<number, CacheItem> = new Map<number, CacheItem>();

  constructor(protected http: HttpClient) {}

  getFirstVersionPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<ListResult>(`${this.endpoint}/pokemon?offset=0&limit=151`)
      .pipe(
        map((listResult) => listResult.results),
        mergeAll(),
        mergeMap((pokemon) => {
          const a = pokemon.url.split('/');
          const pokemonId = Number(a[a.length - 2]);
          return this.getPokemonDetail(pokemonId);
        }),
        toArray(),
        map((pokemons) => pokemons.sort((a, b) => a.id - b.id)),
      );
  }

  getPokemonDetail(pokemonId: number): Observable<Pokemon> {
    const cachedElement = this.map.get(pokemonId);
    if (cachedElement?.pokemon) {
      return of(cachedElement.pokemon);
    }
    return this.http.get<Pokemon>(`${this.endpoint}/pokemon/${pokemonId}`).pipe(
      tap((el) => {
        this.map.set(el.id, new CacheItem(el, cachedElement?.species));
      }),
    );
  }

  getPokemonSpecies(pokemonId: number): Observable<Species> {
    const cachedElement = this.map.get(pokemonId);
    if (cachedElement?.species) {
      return of(cachedElement.species);
    }
    return this.http
      .get<Species>(`${this.endpoint}/pokemon-species/${pokemonId}`)
      .pipe(
        map((el) => new Species(el)),
        mergeMap((el) =>
          this.getGrowthRateBySpecies(el).pipe(
            map((growthRate) => {
              el.growthRate = new GrowthRate(growthRate);
              return el;
            }),
          ),
        ),
        tap((el) => {
          this.map.set(el.id, new CacheItem(cachedElement?.pokemon, el));
        }),
      );
  }

  getGrowthRateBySpecies(species: Species): Observable<GrowthRate> {
    return this.http.get<GrowthRate>(species.growth_rate.url);
  }
}
