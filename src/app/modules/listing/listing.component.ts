import { Component, OnInit } from '@angular/core';
import { PokedexService } from '../../shared/pokedex.service';
import { Pokemon } from '../../models/pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(
    private pokedexService: PokedexService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.pokedexService.getFirstVersionPokemons().subscribe((pokemons) => {
      this.pokemons = pokemons;
    });
  }

  seeDetails(pokemonId: number): void {
    this.router.navigate(['detail', pokemonId]);
  }
}
