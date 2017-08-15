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
            this.createAI('Agnes', 15, 15, 60, 60, 3, 4, true, [this.abilities.scream(), this.abilities.infect()]),
            this.createAI('Matilda', 15, 15, 60, 60, 3, 5, true, [this.abilities.curse(), this.abilities.terrify()]),
            this.createAI('Beatrice', 15, 15, 60, 60, 3, 6, true, [this.abilities.scratch(), this.abilities.bite()])
        ]
    }

    tutorialZed() {
        return {
            id: 0,
            name: 'Zed',
            level: 20,
            maxHealth: 60,
            currentHealth: 60,
            maxEnergy: 80,
            currentEnergy: 80,
            strength: 5,
            agility: 5,
            alive: true,
            heroIndex: Heroes.Warrior,
            targetableAbilitySet: false,
            ready: false,
            buffs: [],
            debuffs: [],
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
            ready: false,
            buffs: [],
            debuffs: [],
            abilities: [this.abilities.bless(), this.abilities.wand(), this.abilities.cleanse()]
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
                abilities: abilities
            }
    }
}
