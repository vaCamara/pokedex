import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingRoutingModule } from './listing-routing.module';
import { PokedexService } from '../../shared/pokedex.service';
import { ListingComponent } from './listing.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ListingComponent],
  imports: [CommonModule, ListingRoutingModule, TranslateModule],
  providers: [PokedexService],
})
export class ListingModule {}
