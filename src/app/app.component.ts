import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AppConfigSetting } from './configs/app-config-setting';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private router: Router,
  ) {
    translate.setDefaultLang(AppConfigSetting.LANGUAGE);
    translate.use(AppConfigSetting.LANGUAGE);
  }

  back() {
    this.router.navigate(['pokedex']);
  }
}
