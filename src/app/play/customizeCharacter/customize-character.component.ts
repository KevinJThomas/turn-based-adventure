import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './customize-character.component.html',
    styleUrls: ['./customize-character.component.css']
})
export class CustomizeCharacterComponent {
    availablePoints = 10;
    baseStamina = 1;
    baseStrength = 2;
    baseAgility = 3;
    baseMagic = 4;
    stamina = 1;
    strength = 2;
    agility = 3;
    magic = 4;

    constructor(private router: Router) {}

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

    apply() {

    }

    cancel() {
        this.router.navigate(['/play/new-story']);
    }
}
