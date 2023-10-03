import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokedexService } from '../../shared/pokedex.service';
import { Pokemon } from '../../models/pokemon';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit, OnDestroy {
  pokemons: Pokemon[] = [];
  subscriptions = new Subscription();

  constructor(
    private pokedexService: PokedexService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.pokedexService.getFirstVersionPokemons().subscribe((pokemons) => {
        this.pokemons = pokemons;
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  seeDetails(pokemonId: number): void {
    this.router.navigate(['detail', pokemonId]);
  }
}
