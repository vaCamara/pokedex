import { LightInfo } from './light-info';
import { AppConfigSetting } from '../configs/app-config-setting';

export class GrowthRate {
  descriptions!: { description: string; language: LightInfo }[];
  descriptionDisplay!: string;

  constructor(growthRate: GrowthRate) {
    Object.assign(this, growthRate);

    this.descriptionDisplay = this.descriptions.find(
      (value) => value.language.name === AppConfigSetting.LANGUAGE,
    )?.description!;
  }
}
