import { Injectable } from '@angular/core';

import { Heroes } from '../../shared/app.heroes';

@Injectable()
export class Scenarios {
    tutorial() {
        return {
            player: [{
                id: 0,
                name: 'Zed',
                maxHealth: 100,
                currentHealth: 100,
                maxEnergy: 100,
                currentEnergy: 100,
                strength: 5,
                agility: 5,
                alive: true,
                heroIndex: Heroes.Warrior,
                abilities: [{
                    name: 'Bash',
                    typeIndex: 0,
                    power: 5,
                    cost: 10
                }, {
                    name: 'Slice',
                    typeIndex: 0,
                    power: 4,
                    cost: 5
                }]
            }],
            enemy: [{
                id: 1,
                name: 'Bruiser',
                maxHealth: 10,
                currentHealth: 10,
                maxEnergy: 100,
                currentEnergy: 100,
                strength: 5,
                agility: 5,
                alive: true,
                abilities: [{
                    name: 'Bash',
                    typeIndex: 0,
                    power: 5,
                    cost: 10
                }, {
                    name: 'Slice',
                    typeIndex: 0,
                    power: 4,
                    cost: 5
                }]
            }]
        }
    }
}