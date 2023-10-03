import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../../models/pokemon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  pokemon!: Pokemon;
  totalStats!: number;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.parent?.data.subscribe(({ pokemon }) => {
      this.pokemon = pokemon;
      this.totalStats = this.pokemon.stats.reduce(
        (total: number, baseStat) => total + baseStat.base_stat,
        0,
      );
    });
  }
}
