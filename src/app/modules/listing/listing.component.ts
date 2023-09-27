import { Component, OnInit } from '@angular/core';
import { PokedexService } from '../../shared/pokedex.service';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(private pokedexService: PokedexService) {}

  ngOnInit(): void {
    this.pokedexService.getFirstVersionPokemons().subscribe((v) => {
      console.log(v);
      this.pokemons = v;
    });
  }
}
