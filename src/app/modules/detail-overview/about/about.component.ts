import { Component, OnInit } from '@angular/core';
import { Species } from '../../../models/species';
import { Pokemon } from '../../../models/pokemon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  species!: Species;
  pokemon!: Pokemon;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.parent?.data.subscribe(({ pokemon, species }) => {
      this.pokemon = pokemon;
      this.species = species;
    });
  }
}
