import { TextEntry } from './text-entry';
import { LightInfo } from './light-info';
import { Genera } from './genus';
import { GrowthRate } from './growth-rate';
import { AppConfigSetting } from '../configs/app-config-setting';

export class Species {
  id!: number;
  gender_rate!: number;
  genera!: Genera[];
  genusDisplay!: string;
  egg_groups!: LightInfo[];
  hatch_counter!: number;
  stepsToHacth!: number;
  flavor_text_entries!: TextEntry[];
  textEntryDisplay!: string;
  growth_rate!: LightInfo;
  growthRate?: GrowthRate;

  constructor(species?: Partial<Species>) {
    Object.assign(this, species);

    this.stepsToHacth = 255 * (this.hatch_counter + 1);
    this.genusDisplay = this.genera.find(
      (value) => value.language.name === AppConfigSetting.LANGUAGE,
    )?.genus!;
    this.textEntryDisplay = this.flavor_text_entries
      .find((value) => value.language.name === AppConfigSetting.LANGUAGE)
      ?.flavor_text!.replace(/\s/g, ' ')!;
  }
}
