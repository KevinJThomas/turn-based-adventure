import { Injectable } from '@angular/core';

import { AbilityTypes } from './play.ability-types';
import { Abilities } from './play.abilities';

@Injectable()
export class Scenarios {
    aiId = -1;

    constructor(private abilities: Abilities) {}

    // Tutorial
    tutorial() {
        return {
            player: [ this.tutorialZed() ],
            enemy: [
                this.createAI(5, 'Bruiser', 10, 10, 30, 30, 5, 4, true, [this.abilities.bash(), this.abilities.slice()]),
                this.createAI(5, 'Crusher', 6, 6, 50, 50, 5, 4, true, [this.abilities.crush(), this.abilities.stomp()])
            ]
        }
    }

    tutorialWitches() {
        return [
            this.createAI(10, 'Agnes', 15, 15, 70, 70, 3, 4, true, [this.abilities.scream(), this.abilities.infect()]),
            this.createAI(10, 'Matilda', 15, 15, 70, 70, 3, 5, true, [this.abilities.curse(), this.abilities.terrify()]),
            this.createAI(10, 'Beatrice', 15, 15, 70, 70, 3, 6, true, [this.abilities.scratch(), this.abilities.bite()])
        ]
    }

    tutorialPlayerArmy() {
        return [this.tutorialFendrel(), this.tutorialJacquelyn(), this.tutorialYsmay(), this.tutorialRowan(), this.tutorialThea()];
    }

    tutorialEnemyArmy() {
        return [
            this.createAI(20, 'God of Air', 200, 200, 200, 200, 20, 4, true, [this.abilities.windGust(), this.abilities.tornado()]),
            this.createAI(20, 'God of Ice', 200, 200, 200, 200, 20, 4, true, [this.abilities.freeze(), this.abilities.iceShards()]),
            this.createAI(20, 'God of Lightning', 200, 200, 200, 200, 20, 4, true, [this.abilities.lightningShock(), this.abilities.lightningStorm()]),
            this.createAI(20, 'God of Fire', 200, 200, 200, 200, 20, 4, true, [this.abilities.sear(), this.abilities.fireStorm()]),
            this.createAI(20, 'God of Earth', 200, 200, 200, 200, 20, 4, true, [this.abilities.callOfNature(), this.abilities.rejuvenation()]),
            this.createAI(20, 'God of Shadows', 200, 200, 200, 200, 20, 4, true, [this.abilities.backstab(), this.abilities.ambush()]),
            this.createAI(20, 'God of Water', 200, 200, 200, 200, 20, 4, true, [this.abilities.soak(), this.abilities.waterfall()])
        ]
    }

    tutorialZed() {
        return {
            id: 0,
            name: 'Zed',
            level: 20,
            maxHealth: 50,
            currentHealth: 50,
            maxEnergy: 80,
            currentEnergy: 80,
            strength: 5,
            agility: 5,
            alive: true,
            targetableAbilitySet: false,
            friendlyTargetableAbilitySet: false,
            ready: false,
            buffs: [],
            debuffs: [],
            frozen: false,
            abilities: [this.abilities.stab(), this.abilities.slice(), this.abilities.pass()]
        }
    }

    tutorialMercy() {
        return {
            id: 1,
            name: 'Mercy',
            level: 20,
            maxHealth: 30,
            currentHealth: 30,
            maxEnergy: 100,
            currentEnergy: 100,
            strength: 5,
            agility: 4,
            alive: true,
            targetableAbilitySet: false,
            friendlyTargetableAbilitySet: false,
            ready: false,
            buffs: [],
            debuffs: [],
            frozen: false,
            abilities: [this.abilities.bless(), this.abilities.wand(), this.abilities.cleanse(), this.abilities.pass()]
        }
    }

    tutorialFendrel() {
        return {
            id: 2,
            name: 'Fendrel',
            level: 20,
            maxHealth: 100,
            currentHealth: 100,
            maxEnergy: 150,
            currentEnergy: 150,
            strength: 15,
            agility: 5,
            alive: true,
            targetableAbilitySet: false,
            friendlyTargetableAbilitySet: false,
            ready: false,
            buffs: [],
            debuffs: [],
            frozen: false,
            abilities: [this.abilities.serenity(), this.abilities.spiritTouch(), this.abilities.slash(), this.abilities.pass()]
        }
    }

    tutorialJacquelyn() {
        return {
            id: 3,
            name: 'Jacquelyn',
            level: 20,
            maxHealth: 100,
            currentHealth: 100,
            maxEnergy: 150,
            currentEnergy: 150,
            strength: 15,
            agility: 5,
            alive: true,
            targetableAbilitySet: false,
            friendlyTargetableAbilitySet: false,
            ready: false,
            buffs: [],
            debuffs: [],
            frozen: false,
            abilities: [this.abilities.volley(), this.abilities.fieryArrow(), this.abilities.powerShot(), this.abilities.pass()]
        }
    }

    tutorialYsmay() {
        return {
            id: 4,
            name: 'Ysmay',
            level: 20,
            maxHealth: 100,
            currentHealth: 100,
            maxEnergy: 150,
            currentEnergy: 150,
            strength: 15,
            agility: 5,
            alive: true,
            targetableAbilitySet: false,
            friendlyTargetableAbilitySet: false,
            ready: false,
            buffs: [],
            debuffs: [],
            frozen: false,
            abilities: [this.abilities.fear(), this.abilities.inspire(), this.abilities.doom(), this.abilities.groundSlam(), this.abilities.pass()]
        }
    }

    tutorialRowan() {
        return {
            id: 5,
            name: 'Rowan',
            level: 20,
            maxHealth: 100,
            currentHealth: 100,
            maxEnergy: 150,
            currentEnergy: 150,
            strength: 15,
            agility: 5,
            alive: true,
            targetableAbilitySet: false,
            friendlyTargetableAbilitySet: false,
            ready: false,
            buffs: [],
            debuffs: [],
            frozen: false,
            abilities: [this.abilities.bolster(), this.abilities.rally(), this.abilities.shieldSlam(), this.abilities.pass()]
        }
    }

    tutorialThea() {
        return {
            id: 6,
            name: 'Thea',
            level: 20,
            maxHealth: 100,
            currentHealth: 100,
            maxEnergy: 150,
            currentEnergy: 150,
            strength: 15,
            agility: 5,
            alive: true,
            targetableAbilitySet: false,
            friendlyTargetableAbilitySet: false,
            ready: false,
            buffs: [],
            debuffs: [],
            frozen: false,
            abilities: [this.abilities.posionMist(), this.abilities.calmingMist(), this.abilities.revitalizingMist(), this.abilities.pass()]
        }
    }

    createAI(level: number, name: string, currentHealth: number, maxHealth: number, currentEnergy: number, maxEnergy: number, strength: number,
        agility: number, alive: boolean, abilities: any[]) {
            this.aiId++;
            return {
                id: this.aiId,
                level: level,
                name: name,
                maxHealth: maxHealth,
                currentHealth: currentHealth,
                maxEnergy: maxEnergy,
                currentEnergy: currentEnergy,
                strength: strength,
                agility: agility,
                alive: alive,
                buffs: [],
                debuffs: [],
                frozen: false,
                abilityList: abilities
            }
    }

    // Basic
    rats(count: number) {
        let ratArray = [];
        for (var i = 0; i < count; i++) {
            ratArray.push(this.createAI(1, 'Rat', 4, 4, 15, 15, 2, 2, true, [this.abilities.ratScratch()]));
        }
        return ratArray;
    }
}
