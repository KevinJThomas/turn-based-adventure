import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from '../../shared/app.service';

@Component({
    templateUrl: './customize-character.component.html',
    styleUrls: ['./customize-character.component.css']
})
export class CustomizeCharacterComponent implements OnInit, OnDestroy {
    availablePoints = 10;
    baseStamina = 1;
    baseStrength = 1;
    baseAgility = 1;
    baseMagic = 1;
    baseEnergy = 1;
    stamina = 1;
    strength = 1;
    agility = 1;
    magic = 1;
    energy = 1;
    sub: any;
    heroName: string;
    loading = false;
    storyName: string;

    constructor(private router: Router, private route: ActivatedRoute, private appSVC: AppService) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.heroName = params['hero'];
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    increaseStamina() {
        if (this.availablePoints > 0) {
            this.availablePoints--;
            this.stamina++;
        }
    }

    decreaseStamina() {
        if (this.stamina > this.baseStamina) {
            this.availablePoints++;
            this.stamina--;
        }
    }

    increaseStrength() {
        if (this.availablePoints > 0) {
            this.availablePoints--;
            this.strength++;
        }
    }

    decreaseStrength() {
        if (this.strength > this.baseStrength) {
            this.availablePoints++;
            this.strength--;
        }
    }

    increaseAgility() {
        if (this.availablePoints > 0) {
            this.availablePoints--;
            this.agility++;
        }
    }

    decreaseAgility() {
        if (this.agility > this.baseAgility) {
            this.availablePoints++;
            this.agility--;
        }
    }

    increaseMagic() {
        if (this.availablePoints > 0) {
            this.availablePoints--;
            this.magic++;
        }
    }

    decreaseMagic() {
        if (this.magic > this.baseMagic) {
            this.availablePoints++;
            this.magic--;
        }
    }

    increaseEnergy() {
        if (this.availablePoints > 0) {
            this.availablePoints--;
            this.energy++;
        }
    }

    decreaseEnergy() {
        if (this.energy > this.baseEnergy) {
            this.availablePoints++;
            this.energy--;
        }
    }

    async create() {
        this.loading = true;
        this.appSVC.newStory(this.storyName, this.heroName, this.stamina, this.strength, this.agility, this.magic, this.energy);
        await this.sleep(2000);
        const gameKey = this.appSVC.getCurrentGame();
        this.loading = false;
        this.router.navigate(['/play/game/', gameKey]);
    }

    cancel() {
        this.router.navigate(['/play/new-story']);
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
