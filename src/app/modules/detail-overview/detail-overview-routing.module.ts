import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailOverviewComponent } from './detail-overview.component';
import { AboutComponent } from './about/about.component';
import { pokemonSpeciesResolver } from './resolvers/pokemon-species.resolver';
import { pokemonResolver } from './resolvers/pokemon.resolver';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  {
    path: ':id',
    component: DetailOverviewComponent,
    resolve: {
      pokemon: pokemonResolver,
      species: pokemonSpeciesResolver,
    },
    children: [
      { path: '', redirectTo: 'about', pathMatch: 'full' },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'stats',
        component: StatsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailOverviewRoutingModule {}
