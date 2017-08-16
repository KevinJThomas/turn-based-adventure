import { Injectable } from '@angular/core';

import { Heroes } from '../../shared/app.heroes';
import { AbilityTypes } from './play.ability-types';
import { Abilities } from './play.abilities';

@Injectable()
export class Scenarios {
    aiId = -1;

    constructor(private abilities: Abilities) {}

    tutorial() {
        return {
            player: [ this.tutorialZed() ],
            enemy: [
                this.createAI('Bruiser', 0, 10, 30, 30, 5, 4, true, [this.abilities.bash(), this.abilities.slice()]),
                this.createAI('Crusher', 4, 6, 50, 50, 5, 4, true, [this.abilities.crush(), this.abilities.stomp()])
            ]
        }
    }

    tutorialWitches() {
        return [
            this.createAI('Agnes', 2, 15, 70, 70, 3, 4, true, [this.abilities.scream(), this.abilities.infect()]),
            this.createAI('Matilda', 0, 15, 70, 70, 3, 5, true, [this.abilities.curse(), this.abilities.terrify()]),
            this.createAI('Beatrice', 0, 15, 70, 70, 3, 6, true, [this.abilities.scratch(), this.abilities.bite()])
        ]
    }

    tutorialPlayerArmy() {
        return [this.tutorialFendrel(), this.tutorialJacquelyn(), this.tutorialYsmay(), this.tutorialRowan(), this.tutorialThea()];
    }

    tutorialEnemyArmy() {
        return [
            this.createAI('God of Air', 200, 200, 200, 200, 20, 4, true, [this.abilities.windGust(), this.abilities.tornado()]),
            this.createAI('God of Ice', 200, 200, 200, 200, 20, 4, true, [this.abilities.freeze(), this.abilities.iceShards()]),
            this.createAI('God of Lightning', 200, 200, 200, 200, 20, 4, true, [this.abilities.lightningShock(), this.abilities.lightningStorm()]),
            this.createAI('God of Fire', 200, 200, 200, 200, 20, 4, true, [this.abilities.sear(), this.abilities.fireStorm()]),
            this.createAI('God of Earth', 200, 200, 200, 200, 20, 4, true, [this.abilities.callOfNature(), this.abilities.rejuvenation()]),
            this.createAI('God of Shadows', 200, 200, 200, 200, 20, 4, true, [this.abilities.backstab(), this.abilities.ambush()]),
            this.createAI('God of Water', 200, 200, 200, 200, 20, 4, true, [this.abilities.soak(), this.abilities.waterfall()])            
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
            heroIndex: Heroes.Warrior,
            targetableAbilitySet: false,
            friendlyTargetableAbilitySet: false,
            ready: false,
            buffs: [],
            debuffs: [],
            frozen: false,
            abilities: [this.abilities.stab(), this.abilities.slice()]
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
            heroIndex: Heroes.Cleric,
            targetableAbilitySet: false,
            friendlyTargetableAbilitySet: false,
            ready: false,
            buffs: [],
            debuffs: [],
            frozen: false,
            abilities: [this.abilities.bless(), this.abilities.wand(), this.abilities.cleanse()]
        }
    }

    tutorialFendrel() {
        return {
            id: 2,
            name: 'Fendrel',
            level: 20,
            maxHealth: 150,
            currentHealth: 150,
            maxEnergy: 150,
            currentEnergy: 150,
            strength: 15,
            agility: 5,
            alive: true,
            heroIndex: Heroes.Warrior,
            targetableAbilitySet: false,
            friendlyTargetableAbilitySet: false,
            ready: false,
            buffs: [],
            debuffs: [],
            frozen: false,
            abilities: [this.abilities.stab(), this.abilities.slice()]
        } 
    }

    tutorialJacquelyn() {
        return {
            id: 2,
            name: 'Jacquelyn',
            level: 20,
            maxHealth: 150,
            currentHealth: 150,
            maxEnergy: 150,
            currentEnergy: 150,
            strength: 15,
            agility: 5,
            alive: true,
            heroIndex: Heroes.Warrior,
            targetableAbilitySet: false,
            friendlyTargetableAbilitySet: false,
            ready: false,
            buffs: [],
            debuffs: [],
            frozen: false,
            abilities: [this.abilities.stab(), this.abilities.slice()]
        } 
    }

    tutorialYsmay() {
        return {
            id: 2,
            name: 'Ysmay',
            level: 20,
            maxHealth: 150,
            currentHealth: 150,
            maxEnergy: 150,
            currentEnergy: 150,
            strength: 15,
            agility: 5,
            alive: true,
            heroIndex: Heroes.Warrior,
            targetableAbilitySet: false,
            friendlyTargetableAbilitySet: false,
            ready: false,
            buffs: [],
            debuffs: [],
            frozen: false,
            abilities: [this.abilities.stab(), this.abilities.slice()]
        } 
    }

    tutorialRowan() {
        return {
            id: 2,
            name: 'Rowan',
            level: 20,
            maxHealth: 150,
            currentHealth: 150,
            maxEnergy: 150,
            currentEnergy: 150,
            strength: 15,
            agility: 5,
            alive: true,
            heroIndex: Heroes.Warrior,
            targetableAbilitySet: false,
            friendlyTargetableAbilitySet: false,
            ready: false,
            buffs: [],
            debuffs: [],
            frozen: false,
            abilities: [this.abilities.stab(), this.abilities.slice()]
        } 
    }

    tutorialThea() {
        return {
            id: 2,
            name: 'Thea',
            level: 20,
            maxHealth: 150,
            currentHealth: 150,
            maxEnergy: 150,
            currentEnergy: 150,
            strength: 15,
            agility: 5,
            alive: true,
            heroIndex: Heroes.Warrior,
            targetableAbilitySet: false,
            friendlyTargetableAbilitySet: false,
            ready: false,
            buffs: [],
            debuffs: [],
            frozen: false,
            abilities: [this.abilities.stab(), this.abilities.slice()]
        } 
    }

    createAI(name: string, currentHealth: number, maxHealth: number, currentEnergy: number, maxEnergy: number, strength: number,
        agility: number, alive: boolean, abilities: any[]) {
            this.aiId++;
            return {
                id: this.aiId,
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
                abilities: abilities
            }
    }
}
