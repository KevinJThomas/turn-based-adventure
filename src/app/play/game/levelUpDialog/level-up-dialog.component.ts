import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { AppService } from '../../../shared/app.service';

@Component({
    templateUrl: './level-up-dialog.component.html',
    styleUrls: ['./level-up-dialog.component.css']
})
export class LevelUpDialogComponent implements OnInit {
    hero: any;
    baseStamina: number;
    baseStrength: number;
    baseAgility: number;
    baseMagic: number;
    baseEnergy: number;
    gameId: string;
    leveledUp: boolean;

    constructor(private dialogRef: MdDialogRef<LevelUpDialogComponent>, private appSVC: AppService) {}

    ngOnInit() {
        this.baseStamina = this.hero.stamina;
        this.baseStrength = this.hero.strength;
        this.baseAgility = this.hero.agility;
        this.baseMagic = this.hero.magic;
        this.baseEnergy = this.hero.energy;
    }

    increaseStamina() {
        if (this.hero.statPoints > 0) {
            this.hero.statPoints--;
            this.hero.stamina++;
        }
    }

    decreaseStamina() {
        if (this.hero.stamina > this.baseStamina) {
            this.hero.statPoints++;
            this.hero.stamina--;
        }
    }

    increaseStrength() {
        if (this.hero.statPoints > 0) {
            this.hero.statPoints--;
            this.hero.strength++;
        }
    }

    decreaseStrength() {
        if (this.hero.strength > this.baseStrength) {
            this.hero.statPoints++;
            this.hero.strength--;
        }
    }

    increaseAgility() {
        if (this.hero.statPoints > 0) {
            this.hero.statPoints--;
            this.hero.agility++;
        }
    }

    decreaseAgility() {
        if (this.hero.agility > this.baseAgility) {
            this.hero.statPoints++;
            this.hero.agility--;
        }
    }

    increaseMagic() {
        if (this.hero.statPoints > 0) {
            this.hero.statPoints--;
            this.hero.magic++;
        }
    }

    decreaseMagic() {
        if (this.hero.magic > this.baseMagic) {
            this.hero.statPoints++;
            this.hero.magic--;
        }
    }

    increaseEnergy() {
        if (this.hero.statPoints > 0) {
            this.hero.statPoints--;
            this.hero.energy++;
        }
    }

    decreaseEnergy() {
        if (this.hero.energy > this.baseEnergy) {
            this.hero.statPoints++;
            this.hero.energy--;
        }
    }

    apply() {
        this.appSVC.updateHero(this.hero, this.gameId);
    }
}
