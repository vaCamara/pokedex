import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokedexService } from '../../shared/pokedex.service';
import { Pokemon } from '../../models/pokemon';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConfigSetting } from '../../configs/app-config-setting';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit, OnDestroy {
  pokemons: Pokemon[] = [];
  displayPokemons: Pokemon[] = [];
  subscriptions = new Subscription();
  showFavorites = false;
  favoriteList: number[] = [];

  constructor(
    private pokedexService: PokedexService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const unparsedStorage = localStorage.getItem(AppConfigSetting.FAVORITES);
    if (unparsedStorage) {
      this.favoriteList = JSON.parse(unparsedStorage);
    }

    this.subscriptions.add(
      this.pokedexService.getFirstVersionPokemons().subscribe((pokemons) => {
        this.pokemons = pokemons;
        this.displayPokemons = pokemons;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  seeDetails(pokemonId: number): void {
    this.router.navigate(['detail', pokemonId]);
  }

  filterFavorites(): void {
    this.showFavorites = !this.showFavorites;

    if (this.showFavorites) {
      this.displayPokemons = this.pokemons.filter((value) =>
        this.favoriteList.includes(value.id),
      );
    } else {
      this.displayPokemons = this.pokemons;
    }
  }
}
