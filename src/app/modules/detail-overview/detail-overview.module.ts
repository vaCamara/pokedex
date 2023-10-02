import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailOverviewRoutingModule } from './detail-overview-routing.module';
import { AboutComponent } from './about/about.component';
import { SharedModule } from 'primeng/api';
import { DetailOverviewComponent } from './detail-overview.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { StatsComponent } from './stats/stats.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DetailOverviewComponent, AboutComponent, StatsComponent],
  imports: [
    CommonModule,
    DetailOverviewRoutingModule,
    SharedModule,
    TabMenuModule,
    ButtonModule,
    TranslateModule,
  ],
})
export class DetailOverviewModule {}
