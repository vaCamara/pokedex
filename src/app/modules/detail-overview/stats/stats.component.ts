import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../../models/pokemon';
import { ActivatedRoute } from '@angular/router';
import { TypeDetail } from '../../../models/type-detail';
import { DmgRelationEnum } from '../../../models/enums/dmg-relation.enum';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  pokemon!: Pokemon;
  totalStats!: number;
  dmgRelationEnum = DmgRelationEnum;
  effectToTypeMap: Map<DmgRelationEnum, string[]> = new Map<
    DmgRelationEnum,
    string[]
  >();

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.parent?.data.subscribe(({ pokemon }) => {
      this.pokemon = pokemon;
      this.totalStats = this.pokemon.stats.reduce(
        (total: number, baseStat) => total + baseStat.base_stat,
        0,
      );
      this.handleDmgRelations();
    });
  }

  private handleDmgRelations() {
    /**
     * dmgMap<type, dmg of type>
     * if dmg of type = 0 no dmg is taken
     * if dmg of type = 1 pas efficace
     * if dmg of type = 2 normal dmg
     * if dmg of type = 3 super efficace
     */
    const dmgMap: Map<string, DmgRelationEnum> = new Map<
      string,
      DmgRelationEnum
    >();
    for (let typeDetail of this.pokemon.typeDetails) {
      this.handleDoubleDamage(typeDetail, dmgMap);
      this.handleHalfDamage(typeDetail, dmgMap);
      typeDetail.damage_relations.no_damage_from.forEach((value) => {
        dmgMap.set(value.name, DmgRelationEnum.IMMUNE);
      });
    }

    this.effectToTypeMap.set(DmgRelationEnum.IMMUNE, []);
    this.effectToTypeMap.set(DmgRelationEnum.RESISTANCE, []);
    this.effectToTypeMap.set(DmgRelationEnum.WEAKNESS, []);
    dmgMap.forEach((value, key) => {
      this.effectToTypeMap.get(value)?.push(key);
    });
  }

  private handleDoubleDamage(
    typeDetail: TypeDetail,
    dmgMap: Map<string, DmgRelationEnum>,
  ): void {
    typeDetail.damage_relations.double_damage_from.forEach((value) => {
      const existingDmgRelation = dmgMap.get(value.name);
      if (existingDmgRelation) {
        if (
          existingDmgRelation !== DmgRelationEnum.IMMUNE &&
          existingDmgRelation === DmgRelationEnum.RESISTANCE
        ) {
          // if a previous type set the dmg relation to resistance, it must be updated to normal
          dmgMap.set(value.name, DmgRelationEnum.NORMAL);
        }
      } else {
        dmgMap.set(value.name, DmgRelationEnum.WEAKNESS);
      }
    });
  }

  private handleHalfDamage(
    typeDetail: TypeDetail,
    dmgMap: Map<string, DmgRelationEnum>,
  ): void {
    typeDetail.damage_relations.half_damage_from.forEach((value) => {
      const existingDmgRelation = dmgMap.get(value.name);
      if (existingDmgRelation) {
        if (
          existingDmgRelation !== DmgRelationEnum.IMMUNE &&
          existingDmgRelation === DmgRelationEnum.WEAKNESS
        ) {
          // if a previous type set the dmg relation to weakness, it must be updated to normal
          dmgMap.set(value.name, DmgRelationEnum.NORMAL);
        }
      } else {
        dmgMap.set(value.name, DmgRelationEnum.RESISTANCE);
      }
    });
  }
}
