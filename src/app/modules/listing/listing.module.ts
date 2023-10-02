import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingRoutingModule } from './listing-routing.module';
import { ListingComponent } from './listing.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ListingComponent],
  imports: [CommonModule, ListingRoutingModule, TranslateModule],
})
export class ListingModule {}
