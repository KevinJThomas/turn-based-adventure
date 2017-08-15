import { Injectable } from '@angular/core';

import { AbilityTypes } from './play.ability-types';

@Injectable()
export class Abilities {
    bash() {
        return {
            name: 'Bash',
            typeIndex: AbilityTypes.SingleTargetDamage,
            power: 5,
            cost: 10,
            description: 'Bash an enemy'
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

    stab() {
        return {
            name: 'Stab',
            typeIndex: AbilityTypes.SingleTargetDamage,
            power: 5,
            cost: 10,
            description: 'Stab an enemy'
        }
    }

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
            description: 'Cleanse an enemy of any curses that are on them'
        }
    }

    scream() {
        return {
            name: 'Scream',
            typeIndex: AbilityTypes.AOEDamage,
            power: 2,
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

    curse() {
        return {
            name: 'Curse',
            typeIndex: AbilityTypes.Curse,
            power: 0,
            cost: 25,
            turns: 2,
            description: 'Curse a target to kill their entire team after 2 turns'
        }
    }

    terrify() {
        return {
            name: 'Terrify',
            typeIndex: AbilityTypes.Curse,
            power: 0,
            cost: 6,
            turns: 2,
            description: 'Terrify a target to reduce their agility for 2 turns'
        }
    }

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
}
