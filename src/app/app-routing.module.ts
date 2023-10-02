import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokedex',
    pathMatch: 'full',
  },
  {
    path: 'pokedex',
    loadChildren: () =>
      import('./modules/listing/listing.module').then((m) => m.ListingModule),
  },
  {
    path: 'detail',
    loadChildren: () =>
      import('./modules/detail-overview/detail-overview.module').then(
        (m) => m.DetailOverviewModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
