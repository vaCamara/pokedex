import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfigSetting } from './configs/app-config-setting';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private location: Location,
  ) {
    this.translate.setDefaultLang(AppConfigSetting.LANGUAGE);
    this.translate.use(AppConfigSetting.LANGUAGE);
  }

  back() {
    this.location.back();
  }
}
