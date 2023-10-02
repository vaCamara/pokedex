import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Species } from '../../models/species';
import { Pokemon } from '../../models/pokemon';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-detail-overview',
  templateUrl: './detail-overview.component.html',
  styleUrls: ['./detail-overview.component.scss'],
})
export class DetailOverviewComponent implements OnInit {
  species!: Species;
  pokemon!: Pokemon;
  items: MenuItem[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.initMenuItem();
    this.activatedRoute.data.subscribe(({ pokemon, species }) => {
      this.pokemon = pokemon;
      this.species = species;
    });
  }

  private initMenuItem(): void {
    this.items = [
      {
        label: this.translate.instant('detail.about.title'),
        routerLink: 'about',
      },
      {
        label: this.translate.instant('detail.stats.title'),
        routerLink: 'stats',
      },
    ];
  }
}
