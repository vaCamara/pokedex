import { Component, OnInit } from '@angular/core';
import { Species } from '../../../models/species';
import { Pokemon } from '../../../models/pokemon';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  species!: Species;
  pokemon!: Pokemon;
  items: MenuItem[] = [];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pokemon, species }) => {
      this.pokemon = pokemon;
      this.species = species;
    });
  }
}
