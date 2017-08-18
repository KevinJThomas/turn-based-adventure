import { Injectable } from '@angular/core';

import { AbilityTypes } from './play.ability-types';

@Injectable()
export class Abilities {    

    // Tutorial
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

    slash() {
        return {
            name: 'Slash',
            typeIndex: AbilityTypes.SingleTargetDamage,
            power: 8,
            cost: 20,
            description: 'Slash an enemy'
        }
    }

    // Jacquelyn
    volley() {
        return {
            name: 'Volley',
            typeIndex: AbilityTypes.AOEDamage,
            power: 6,
            cost: 50,
            description: 'Fire a volley of arrows to damage all enemies'
        }
    }

    fieryArrow() {
        return {
            name: 'Fiery Arrow',
            typeIndex: AbilityTypes.DoT,
            power: 6,
            turns: 3,
            cost: 25,
            description: 'Shoot a fiery arrow at an enemy to start them on fire and burn them over 3 turns'
        }
    }

    powerShot() {
        return {
            name: 'Power Shot',
            typeIndex: AbilityTypes.SingleTargetDamage,
            power: 14,
            cost: 35,
            description: 'Fire a single, powerful shot at an enemy'
        }
    }

    // Ysmay
    fear() {
        return {
            name: 'Fear',
            typeIndex: AbilityTypes.Curse,
            triggerOnCleanse: false,
            power: 0,
            cost: 40,
            turns: 2,
            effect: (target) => {
                
            },
            endEffect: (target) => {
                target.currentHealth -= 40;
                return target.name + ' is injured from Fear';
            },
            description: 'Instill fear in a target, causing them to take massive damage at the end of next turn'
        }
    }

    inspire() {
        return {
            name: 'Inspire',
            typeIndex: AbilityTypes.Buff,
            triggerOnCleanse: true,
            power: 0,
            cost: 30,
            turns: 999,
            effect: (target) => {
                 target.currentHealth += 30;
                 target.maxHealth += 30;
            },
            endEffect: (target) => {
                target.maxHealth -= 30;
                if (target.currentHealth > target.maxHealth) {
                    target.currentHealth = target.maxHealth;
                }
                return 'Inspire wears off';
            },
            description: 'Inspire an ally to increase their maximum health'
        }
    }

    doom() {
        return {
            name: 'DOOM',
            typeIndex: AbilityTypes.AOEDamage,
            power: 1000,
            cost: 300,
            description: 'Bring down the power of the universe on your enemies to destroy them with righteous doom'
        }
    }

    groundSlam() {
        return {
            name: 'Ground Slam',
            typeIndex: AbilityTypes.AOEDamage,
            power: 12,
            cost: 50,
            description: 'Smash your weapon into the ground to cause an earthquake to damage all enemies'
        }
    }

    // Rowan
    bolster() {
        return {
            name: 'Bolster',
            typeIndex: AbilityTypes.AOEBuff,
            triggerOnCleanse: true,
            power: 0,
            turns: 3,
            cost: 30,
            effect: (allies) => {
                for (let ally of allies) {
                    ally.strength += 10;
                }
            },
            endEffect: (target) => {
                target.strength -= 10;
                return 'Bolster wears off';
            },
            description: 'Bolster your allies, increasing their strength for 3 turns'
        }
    }

    rally() {
        return {
            name: 'Rally',
            typeIndex: AbilityTypes.AOEBuff,
            triggerOnCleanse: true,
            power: 0,
            turns: 1,
            cost: 40,
            effect: (allies) => {
                for (let ally of allies) {
                    ally.agility += 25;
                }
            },
            endEffect: (target) => {
                target.agility -= 25;
                return 'Rally wears off';
            },
            description: 'Rally your allies together to massively increase their agility next turn'
        }
    }

    shieldSlam() {
        return {
            name: 'Shield Slam',
            typeIndex: AbilityTypes.SingleTargetDamage,
            power: 10,
            cost: 30,
            description: 'Slam an enemy with your shield to damage them'
        }
    }

    // Thea
    posionMist() {
        return {
            name: 'Posion Mist',
            typeIndex: AbilityTypes.AOEDoT,
            power: 2,
            turns: 3,
            cost: 30,
            description: 'Summon a posionous mist on your enemies to damage them over 3 turns'
        }
    }

    calmingMist() {
        return {
            name: 'Calming Mist',
            typeIndex: AbilityTypes.AOEHoT,
            power: 3,
            turns: 3,
            cost: 30,
            description: 'Summon a calming mist on your allies to heal them over 3 turns'
        }
    }

    revitalizingMist() {
        return {
            name: 'Revitalizing Mist',
            typeIndex: AbilityTypes.AOEBuff,
            triggerOnCleanse: true,
            power: 0,
            turns: 999,
            cost: 30,
            effect: (allies) => {
                for (let ally of allies) {
                    ally.currentEnergy += 50;
                    ally.maxEnergy += 50;
                }
            },
            endEffect: (target) => {
                target.maxEnergy -= 50;
                if (target.currentEnergy > target.maxEnergy) {
                    target.currentEnergy = target.maxEnergy;
                }
            },
            description: 'Summon a revitalizing mist on your allies to increase their maximum energy by 50'
        }
    }

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
                return 'Wind Gust wears off';
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
                target.frozen = true;
            },
            endEffect: (target) => {
                target.frozen = false;
                return target.name + ' is unfrozen';
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
            power: 9,
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
                return 'Soak wears off';
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

    pass() {
        return {
            name: 'Pass',
            typeIndex: AbilityTypes.None,
            power: 0,
            cost: 0,
            description: 'Pass your turn'
        }
    }
}
