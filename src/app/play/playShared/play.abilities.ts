import { Injectable } from '@angular/core';

import { AbilityTypes } from './play.ability-types';

@Injectable()
export class Abilities {

    // Heroes
    // Zed
    stab() {
        return {
            name: 'Stab',
            typeIndex: AbilityTypes.SingleTargetDamage,
            power: 5,
            cost: 10,
            description: 'Stab an enemy'
        }
    }
    
    slice() {
        return {
            name: 'Slice',
            typeIndex: AbilityTypes.SingleTargetDamage,
            power: 4,
            cost: 5,
            description: 'Slice an enemy'
        }
    }

    // Mercy
    bless() {
        return {
            name: 'Bless',
            typeIndex: AbilityTypes.SingleTargetHeal,
            power: 12,
            cost: 10,
            description: 'Bless an ally to heal them'
        }
    }

    wand() {
        return {
            name: 'Wand',
            typeIndex: AbilityTypes.SingleTargetDamage,
            power: 2,
            cost: 5,
            description: 'Fire your magic wand at an enemy'
        }
    }

    cleanse() {
        return {
            name: 'Cleanse',
            typeIndex: AbilityTypes.Cleanse,
            power: 0,
            cost: 8,
            description: 'Cleanse an ally of any curses that are on them'
        }
    }

    // Fendrel
    serenity() {
        return {
            name: 'Serenity',
            typeIndex: AbilityTypes.AOEHeal,
            power: 6,
            cost: 40,
            description: 'Heal all of your allies'
        }
    }

    spiritTouch() {
        return {
            name: 'Spirit Touch',
            typeIndex: AbilityTypes.SingleTargetHeal,
            power: 16,
            cost: 20,
            description: 'Heal an ally'
        }
    }

    // dmg ability?

    // Tutorial
    // Stage 1
    // Bruiser
    bash() {
        return {
            name: 'Bash',
            typeIndex: AbilityTypes.SingleTargetDamage,
            power: 5,
            cost: 10,
            description: 'Bash an enemy'
        }
    }

    // Crusher
    crush() {
        return {
            name: 'Crush',
            typeIndex: AbilityTypes.SingleTargetDamage,
            power: 7,
            cost: 15,
            description: 'Crush an enemy'
        }
    }

    stomp() {
        return {
            name: 'Stomp',
            typeIndex: AbilityTypes.SingleTargetDamage,
            power: 5,
            cost: 10,
            description: 'Stomp an enemy'
        }
    }

    // Stage 2
    // Agnes
    scream() {
        return {
            name: 'Scream',
            typeIndex: AbilityTypes.AOEDamage,
            power: 3,
            cost: 10,
            description: 'Scream at all enemies to damage them'
        }
    }

    infect() {
        return {
            name: 'Infect',
            typeIndex: AbilityTypes.DoT,
            power: 3,
            turns: 3,
            cost: 10,
            description: 'Infect an enemy with a grevious wound, damaging them over 3 turns'
        }
    }

    // Matilda
    curse() {
        return {
            name: 'Curse',
            typeIndex: AbilityTypes.Curse,
            triggerOnCleanse: false,
            power: 0,
            cost: 25,
            turns: 2,
            effect: (target) => {
                
            },
            endEffect: (target) => {
                target.currentHealth = 0;
                target.alive = false;
                target.debuffs = [];
                return target.name + ' is killed by Curse';
            },
            description: 'Curse a target to kill their entire team after 2 turns'
        }
    }

    terrify() {
        return {
            name: 'Terrify',
            typeIndex: AbilityTypes.Curse,
            triggerOnCleanse: true,
            power: 0,
            cost: 6,
            turns: 2,
            effect: (target) => {
                target.agility -= 3;
            },
            endEffect: (target) => {
                target.agility += 3;
                return 'Terrify wears off of ' + target.name;
            },
            description: 'Terrify a target to reduce their agility for 2 turns'
        }
    }

    // Beatrice
    scratch() {
        return {
            name: 'Scratch',
            typeIndex: AbilityTypes.SingleTargetDamage,
            power: 5,
            cost: 8,
            description: 'Scratch an enemy'
        }
    }

    bite() {
        return {
            name: 'Bite',
            typeIndex: AbilityTypes.SingleTargetDamage,
            power: 8,
            cost: 12,
            description: 'Bite an enemy'
        }
    }

    // Stage 3
    // God of Air
    windGust() {
        return {
            name: 'Wind Gust',
            typeIndex: AbilityTypes.AOEBuff,
            triggerOnCleanse: true,
            power: 0,
            turns: 2,
            cost: 20,
            effect: (allies) => {
                for (let ally of allies) {
                    ally.agility += 10;
                }
            },
            endEffect: (target) => {
                target.agility -= 10;
            },
            description: 'A powerful gust of wind greatly increases all allies agility for 2 turns'
        }
    }

    tornado() {
        return {
            name: 'Tornado',
            typeIndex: AbilityTypes.SingleTargetDamage,
            power: 12,
            cost: 30,
            description: 'Launch a powerful tornado at an enemy'
        }
    }

    // God of Ice
    freeze() {
        return {
            name: 'Freeze',
            typeIndex: AbilityTypes.Curse,
            triggerOnCleanse: true,
            power: 0,
            turns: 999,
            cost: 15,
            effect: (target) => {
                target.frozen = true; // add login for this
            },
            endEffect: (target) => {
                target.frozen = false;
            },
            description: 'Freeze an enemy to prevent them from attacking'
        }
    }

    iceShards() {
        return {
            name: 'Ice Shards',
            typeIndex: AbilityTypes.AOEDamage,
            power: 5,
            cost: 30,
            description: 'Raise ice shards up from the ground your enemies are standing on to damage them all'
        }
    }

    // God of Lightning
    lightningShock() {
        return {
            name: 'Lightning Shock',
            typeIndex: AbilityTypes.SingleTargetDamage,
            power: 10,
            cost: 20,
            description: 'Shock an enemy with lightning'
        }
    }

    lightningStorm() {
        return {
            name: 'Lightning Storm',
            typeIndex: AbilityTypes.AOEDamage,
            power: 5,
            cost: 30,
            description: 'Call a storm of lightning down upon all enemies'
        }
    }

    // God of Fire
    sear() {
        return {
            name: 'Sear',
            typeIndex: AbilityTypes.DoT,
            power: 8,
            turns: 2,
            cost: 25,
            description: 'Sear an enemy to start them on fire and burn them over 2 turns'
        }
    }

    fireStorm() {
        return {
            name: 'Fire Storm',
            typeIndex: AbilityTypes.AOEDamage,
            power: 8,
            cost: 70,
            description: 'Call down a fury of fire from the sky to damage all enemies'
        }
    }

    // God of Earth
    callOfNature() {
        return {
            name: 'Call of Nature',
            typeIndex: AbilityTypes.AOECleanse,
            power: 0,
            cost: 20,
            description: 'Cleanse all allies of harmful effects'
        }
    }

    rejuvenation() {
        return {
            name: 'Rejuvenation',
            typeIndex: AbilityTypes.AOEHeal,
            power: 10,
            cost: 40,
            description: 'Heal all of your allies'
        }
    }

    // God of Shadows
    backstab() {
        return {
            name: 'Backstab',
            typeIndex: AbilityTypes.SingleTargetDamage,
            power: 10,
            cost: 20,
            description: 'Stab an enemy in the back'
        }
    }

    ambush() {
        return {
            name: 'Ambush',
            typeIndex: AbilityTypes.SingleTargetDamage,
            power: 20,
            cost: 60,
            description: 'Ambush an enemy for massive damage'
        }
    }

    // God of Water
    soak() {
        return {
            name: 'Soak',
            typeIndex: AbilityTypes.AOECurse,
            triggerOnCleanse: true,
            power: 0,
            turns: 3,
            cost: 30,
            effect: (enemies) => {
                for (let enemy of enemies) {
                    enemy.agility -= 5;
                }
            },
            endEffect: (target) => {
                target.agility += 5;
            },
            description: 'Soak the enemy with water, reducing their agility for 2 turns'
        }
    }

    waterfall() {
        return {
            name: 'Waterfall',
            typeIndex: AbilityTypes.AOEDamage,
            power: 6,
            cost: 40,
            description: 'Create a waterfall over enemies to damage them all'
        }
    }
}
