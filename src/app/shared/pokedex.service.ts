import { Injectable } from '@angular/core';
import {
  map,
  mergeAll,
  mergeMap,
  Observable,
  of,
  shareReplay,
  tap,
  toArray,
} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
import { ListResult } from '../models/list-result';
import { Species } from '../models/species';
import { CacheItem } from '../models/cache-item';
import { GrowthRate } from '../models/growth-rate';

@Injectable({ providedIn: 'root' })
export class PokedexService {
  endpoint = 'https://pokeapi.co/api/v2';

  map: Map<number, CacheItem> = new Map<number, CacheItem>();
  private pokemons$?: Observable<Pokemon[]>;

  constructor(protected http: HttpClient) {}

  getFirstVersionPokemons(): Observable<Pokemon[]> {
    const params = new HttpParams().append('limit', 151);
    if (!this.pokemons$) {
      this.pokemons$ = this.http
        .get<ListResult>(`${this.endpoint}/pokemon`, { params })
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
          shareReplay(1),
        );
    }
    return this.pokemons$;
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

  private getGrowthRateBySpecies(species: Species): Observable<GrowthRate> {
    return this.http.get<GrowthRate>(species.growth_rate.url);
  }
}
