import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Species } from '../../models/species';
import { Pokemon } from '../../models/pokemon';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { AppConfigSetting } from '../../configs/app-config-setting';

@Component({
  selector: 'app-detail-overview',
  templateUrl: './detail-overview.component.html',
  styleUrls: ['./detail-overview.component.scss'],
})
export class DetailOverviewComponent implements OnInit {
  species!: Species;
  pokemon!: Pokemon;
  items: MenuItem[] = [];
  isFavorite: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.initMenuItem();
    this.activatedRoute.data.subscribe(({ pokemon, species }) => {
      this.pokemon = pokemon;
      this.species = species;

      const unparsedStorage = localStorage.getItem(AppConfigSetting.FAVORITES);
      if (unparsedStorage) {
        this.isFavorite = (JSON.parse(unparsedStorage) as number[]).includes(
          this.pokemon.id,
        );
      }
    });
  }

  updateFavorites() {
    this.isFavorite = !this.isFavorite;
    const unparsedStorage = localStorage.getItem(AppConfigSetting.FAVORITES);
    const favorites: number[] = unparsedStorage
      ? JSON.parse(unparsedStorage)
      : [];

    if (this.isFavorite) {
      favorites.push(this.pokemon.id);
      localStorage.setItem(
        AppConfigSetting.FAVORITES,
        JSON.stringify(favorites),
      );
    } else {
      const indexOfPokemon = favorites.indexOf(this.pokemon.id);
      // The pokemon can be absent as cache can be cleared manually
      if (indexOfPokemon > -1) {
        favorites.splice(indexOfPokemon, 1);
        localStorage.setItem(
          AppConfigSetting.FAVORITES,
          JSON.stringify(favorites),
        );
      }
    }
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
