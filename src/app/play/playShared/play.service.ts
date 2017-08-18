import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Heroes } from '../../shared/app.heroes';
import { AbilityTypes } from './play.ability-types';
import { WinConditions } from './play.win-conditions';
import { Scenarios } from './play.scenarios';
import { PlayDialogComponent } from '../playShared/playDialog/play-dialog.component';
import { HeroDialogComponent } from '../playShared/heroDialog/hero-dialog.component';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayService {
    theGame: any;
    playerActions = [];
    enemyActions = [];

    constructor(private scenarios: Scenarios, private dialog: MdDialog) {}

    clearLog() {
        this.theGame.playByPlay = '';
    }

    newTutorial(): Observable<any[]> {
        this.theGame = this.scenarios.tutorial();
        this.theGame.playByPlay = '';
        
        return Observable.of(this.theGame);
    }

    newBattle(playerHeroes: any[], enemyHeroes: any[]): Observable<any[]> {
        this.theGame = {
            player: playerHeroes,
            enemy: enemyHeroes,
            playerAlive: playerHeroes,
            enemyAlive: enemyHeroes
        }
        
        return Observable.of(this.theGame);
    }

    tutorialStageTwo() {
        this.theGame.player.splice(0, this.theGame.player.length);
        this.theGame.enemy.splice(0, this.theGame.enemy.length);
        this.theGame.player.push(this.scenarios.tutorialZed());
        this.theGame.player.push(this.scenarios.tutorialMercy());
        this.theGame.enemy = this.scenarios.tutorialWitches();
        this.theGame.playByPlay = '';
    }

    tutorialStageThree() {
        this.theGame.player.splice(0, this.theGame.player.length);
        this.theGame.enemy.splice(0, this.theGame.enemy.length);
        this.theGame.player = this.scenarios.tutorialPlayerArmy();
        this.theGame.enemy = this.scenarios.tutorialEnemyArmy();
        this.theGame.playByPlay = '';
    }

    setAbility(player: any, ability: any) {
        for (let hero of this.theGame.player) {
            if (hero.id === player.id) {
                switch (ability.typeIndex) {
                    case AbilityTypes.None:
                    case AbilityTypes.AOEDamage:
                    case AbilityTypes.AOEHeal:
                    case AbilityTypes.AOEBuff:
                    case AbilityTypes.AOECurse:
                    case AbilityTypes.AOECleanse:
                    case AbilityTypes.AOEDoT:
                    case AbilityTypes.AOEHoT:
                        hero.targetableAbilitySet = false;
                        hero.friendlyTargetableAbilitySet = false;
                        hero.ready = true;
                        break;
                    case AbilityTypes.SingleTargetDamage:
                    case AbilityTypes.Curse:
                    case AbilityTypes.DoT:
                        hero.targetableAbilitySet = true;
                        hero.friendlyTargetableAbilitySet = false;
                        hero.ready = false;
                        break;
                    case AbilityTypes.SingleTargetHeal:
                    case AbilityTypes.Cleanse:
                    case AbilityTypes.HoT:
                    case AbilityTypes.Buff:
                        hero.targetableAbilitySet = false;
                        hero.friendlyTargetableAbilitySet = true;
                        hero.ready = false;
                        break;
                    default:
                        console.log('ERROR: Default in play.service.ts.setAbility() hit');
                        break;
                }

                if (this.playerActions.length > 0) {
                    let duplicate = false;
                    for (let action of this.playerActions) {                        
                        if (action.hero.id === hero.id) {
                            action.ability = ability;
                            duplicate = true;
                        }                        
                    }
                    if (!duplicate) {
                        this.playerActions.push({
                            hero: player,
                            ability: ability
                        })
                    }
                } else {
                    this.playerActions.push({
                        hero: player,
                        ability: ability
                    })
                }
            }
        }
    }

    setTarget(player: any, target: any): boolean {
        player.ready = true;
        for (let hero of this.theGame.player) {
            if (hero.id === player.id) {
                let duplicate = false;
                for (let action of this.playerActions) {                    
                    if (action.hero.id === hero.id) {
                        action.target = target;
                        duplicate = true;
                    }                    
                }
                if (!duplicate) {
                    this.playerActions.push({
                        hero: player,
                        target: target
                    })
                }
            }
        }
        return this.playerReady();
    }

    playerReady(): boolean {
        for (let hero of this.theGame.player) {
            if (hero.alive === true && hero.ready === false) {
                return false;
            }
        }
        return true;
    }

    findEnemyAbility(enemy: any) {
        const availableAbilities = enemy.abilities.filter(ability => ability.cost <= enemy.currentEnergy);
        return availableAbilities[this.getRandomNumber(0, availableAbilities.length - 1)];
    }

    findEnemyTarget(ability: any) {
        switch (ability.typeIndex) {
            case AbilityTypes.None:
            case AbilityTypes.AOEDamage:
            case AbilityTypes.AOEHeal:
            case AbilityTypes.AOEBuff:
            case AbilityTypes.AOECurse:
            case AbilityTypes.AOECleanse:
            case AbilityTypes.AOEDoT:
            case AbilityTypes.AOEHoT:
                break;
            case AbilityTypes.SingleTargetDamage:
            case AbilityTypes.Curse:
            case AbilityTypes.DoT:
                const livingTargets = this.theGame.player.filter(hero => hero.alive === true);
                return livingTargets[this.getRandomNumber(0, livingTargets.length - 1)];
            case AbilityTypes.SingleTargetHeal:
            case AbilityTypes.Cleanse:
            case AbilityTypes.HoT:
            case AbilityTypes.Buff:
                const livingAllies = this.theGame.enemy.filter(hero => hero.alive === true);
                return livingAllies[this.getRandomNumber(0, livingAllies.length - 1)];
            default:
                console.log('ERROR: Default in play.service.ts.findEnemyTarget() hit');
                break;
        }
    }

    unfreeze() {
        for (let hero of this.theGame.player) {
            hero.frozen = false;
        }
        for (let hero of this.theGame.enemy) {
            hero.frozen = false;
        }
    }

    async battle() {
        for (let enemy of this.theGame.enemy) {
            if (enemy.alive && !enemy.frozen) {
                const enemyAbility = this.findEnemyAbility(enemy);                
                if (enemyAbility) {
                    const target = this.findEnemyTarget(enemyAbility);
                    this.enemyActions.push({
                        hero: enemy,
                        ability: enemyAbility,
                        target: target
                    });
                }
            }
        }

        let allActions = this.playerActions.concat(this.enemyActions);
        allActions.sort((t1, t2) => {
            if (t1.hero.agility > t2.hero.agility) {
                return -1;
            }
            if (t1.hero.agility < t2.hero.agility) {
                return 1
            }
            return 0;
        });

        this.unfreeze();

        for (let action of allActions) {
            if (action.hero.alive) {
                action.hero.currentEnergy -= action.ability.cost;
                switch (action.ability.typeIndex) {
                    case AbilityTypes.None: {
                        break;
                    }
                    case AbilityTypes.SingleTargetDamage: {
                        this.damageAbility(action);
                        break;
                    }
                    case AbilityTypes.SingleTargetHeal: {
                        this.healAbility(action);
                        break;
                    }
                    case AbilityTypes.AOEDamage: {
                        this.aoeDamageAbility(action);
                        break;
                    }
                    case AbilityTypes.AOEHeal: {
                        this.aoeHealAbility(action);
                        break;
                    }
                    case AbilityTypes.DoT: {
                        this.dotAbility(action);
                        break;
                    }
                    case AbilityTypes.HoT: {
                        this.hotAbility(action);
                        break;
                    }
                    case AbilityTypes.Cleanse: {
                        this.cleanseAbility(action);
                        break;
                    }
                    case AbilityTypes.Curse: {
                        this.curseAbility(action);
                        break;
                    }
                    case AbilityTypes.Buff: {
                        this.buffAbility(action);
                        break;
                    }
                    case AbilityTypes.AOEBuff: {
                        this.aoeBuffAbility(action);
                        break;
                    }
                    case AbilityTypes.AOECurse: {
                        this.aoeCurseAbility(action);
                        break;
                    }
                    case AbilityTypes.AOECleanse: {
                        this.aoeCleanseAbility(action);
                        break;
                    }
                    case AbilityTypes.AOEDoT: {
                        this.aoeDoTAbility(action);
                        break;
                    }
                    case AbilityTypes.AOEHoT: {
                        this.aoeHoTAbility(action);
                        break;
                    }
                    default: {
                        console.log('ERROR: Default in play.service.ts.battle() hit');
                    }
                }
                await this.sleep(1600);
            }
        }

        for (let hero of this.theGame.player) {
            if (hero.buffs.length > 0) {
                for (let buff of hero.buffs) {
                    if (buff.typeIndex === AbilityTypes.HoT) {
                        if ((hero.currentHealth + buff.power) < hero.maxHealth) {
                            hero.currentHealth += buff.power;                            
                        } else {
                            hero.currentHealth = hero.maxHealth;
                        }
                        buff.turns--;
                        if (buff.turns <= 0) {
                            const index = hero.buffs.indexOf(buff, 0);
                            hero.buffs.splice(index, 1);
                        }
                    } else if (buff.typeIndex === AbilityTypes.Buff) {
                        if (buff.turns <= 0) {
                            this.theGame.playByPlay = buff.endEffect(hero) + '\n' + this.theGame.playByPlay;
                            const index = hero.buffs.indexOf(buff, 0);
                            hero.buffs.splice(index, 1);
                        } else {
                            buff.turns--;
                        }
                    }
                }
            }
            
            if (hero.debuffs.length > 0) {
                for (let debuff of hero.debuffs) {
                    if (debuff.typeIndex === AbilityTypes.DoT) {
                        hero.currentHealth -= debuff.power;
                        debuff.turns--;
                        if (debuff.turns <= 0) {
                            const index = hero.debuffs.indexOf(debuff, 0);
                            hero.debuffs.splice(index, 1);
                        }
                    } else if (debuff.typeIndex === AbilityTypes.Curse) {
                        if (debuff.turns <= 0) {
                            this.theGame.playByPlay = debuff.endEffect(hero) + '\n' + this.theGame.playByPlay;
                            const index = hero.debuffs.indexOf(debuff, 0);
                            hero.debuffs.splice(index, 1);
                        } else {
                            debuff.turns--;
                        }
                    }
                }
            }
            hero.targetableAbilitySet = false;
            hero.friendlyTargetableAbilitySet = false;
            hero.ready = false;
        }

        for (let hero of this.theGame.enemy) {
            if (hero.buffs.length > 0) {
                for (let buff of hero.buffs) {
                    if (buff.typeIndex === AbilityTypes.HoT) {
                        if ((hero.currentHealth + buff.power) < hero.maxHealth) {
                            hero.currentHealth += buff.power;                            
                        } else {
                            hero.currentHealth = hero.maxHealth;
                        }
                        buff.turns--;
                        if (buff.turns <= 0) {
                            const index = hero.buffs.indexOf(buff, 0);
                            hero.buffs.splice(index, 1);
                        }
                    } else if (buff.typeIndex === AbilityTypes.Buff) {
                        if (buff.turns <= 0) {
                            this.theGame.playByPlay = buff.endEffect(hero) + '\n' + this.theGame.playByPlay;
                            const index = hero.buffs.indexOf(buff, 0);
                            hero.buffs.splice(index, 1);
                        } else {
                            buff.turns--;
                        }
                    }
                }
            }
            if (hero.debuffs.length > 0) {
                for (let debuff of hero.debuffs) {
                    if (debuff.typeIndex === AbilityTypes.DoT) {
                        hero.currentHealth -= debuff.power;
                        debuff.turns--;
                        if (debuff.turns <= 0) {
                            const index = hero.debuffs.indexOf(debuff, 0);
                            hero.debuffs.splice(index, 1);
                        }
                    } else if (debuff.typeIndex === AbilityTypes.Curse) {
                        if (debuff.turns <= 0) {
                            this.theGame.playByPlay = debuff.endEffect(hero) + '\n' + this.theGame.playByPlay;
                            const index = hero.debuffs.indexOf(debuff, 0);
                            hero.debuffs.splice(index, 1);
                        } else {
                            debuff.turns--;
                        }
                    }
                }
            }
        }

        this.playerActions = [];
        this.enemyActions = [];
        for (let hero of this.theGame.player) {
            if (hero.frozen) {
                hero.ready = true;
            }
        }
    }

    isBattleFinished(): number {
        let playerAlive = false;
        
        for (let hero of this.theGame.player) {
            if (hero.alive) {
                playerAlive = true;
            }
        }

        let enemyAlive = false;

        for (let hero of this.theGame.enemy) {            
            if (hero.alive) {                
                enemyAlive = true;
            }
        }

        if (playerAlive && enemyAlive) {
            return WinConditions.InProgress
        } else if (!playerAlive && enemyAlive) {
            return WinConditions.Lose
        } else if (playerAlive && !enemyAlive) {
            return WinConditions.Win
        } else {
            return WinConditions.Tie
        }
    }

    damageAbility(action: any) {
        action.target.currentHealth -= action.ability.power;
        this.checkDeath();
        this.theGame.playByPlay = action.hero.name + ' uses ' + action.ability.name + ' [' + action.ability.power + ']' +
            ' on ' + action.target.name + ' [' + action.target.currentHealth + '/' + action.target.maxHealth + ']' +
            '\n' +  this.theGame.playByPlay;
    }

    healAbility(action: any) {
        if ((action.target.currentHealth + action.ability.power) < action.target.maxHealth) {
            action.target.currentHealth += action.ability.power;
        } else {
            action.target.currentHealth = action.target.maxHealth;
        }
        this.checkDeath();
        this.theGame.playByPlay = action.hero.name + ' uses ' + action.ability.name + ' [' + action.ability.power + ']' +
            ' on ' + action.target.name + ' [' + action.target.currentHealth + '/' + action.target.maxHealth + ']' +
            '\n' +  this.theGame.playByPlay;
    }

    aoeDamageAbility(action: any) {
        if (this.theGame.player.includes(action.hero)) {
            for (let enemy of this.theGame.enemy) {
                enemy.currentHealth -= action.ability.power;
            }
        } else if (this.theGame.enemy.includes(action.hero)) {
            for (let player of this.theGame.player) {
                player.currentHealth -= action.ability.power;
            }
        }
        this.checkDeath();
        this.theGame.playByPlay = action.hero.name + ' uses ' + action.ability.name + ' [' + action.ability.power + ']' +
            ' to damage all enemies\n' +  this.theGame.playByPlay;
    }

    aoeHealAbility(action: any) {
        if (this.theGame.player.includes(action.hero)) {
            for (let player of this.theGame.player) {
                if ((player.currentHealth + action.ability.power) < player.maxHealth) {
                    player.currentHealth += action.ability.power;
                } else {
                    player.currentHealth = player.maxHealth;
                }                
            }
        } else if (this.theGame.enemy.includes(action.hero)) {
            for (let enemy of this.theGame.enemy) {
                if ((enemy.currentHealth + action.ability.power) < enemy.maxHealth) {
                    enemy.currentHealth += action.ability.power;
                } else {
                    enemy.currentHealth = enemy.maxHealth;
                }   
            }
        }
        this.checkDeath();
        this.theGame.playByPlay = action.hero.name + ' uses ' + action.ability.name + ' [' + action.ability.power + ']' +
            ' to heal all allies\n' +  this.theGame.playByPlay;
    }

    dotAbility(action: any) {
        action.target.debuffs.push({
            typeIndex: action.ability.typeIndex,
            power: action.ability.power,
            turns: action.ability.turns
        });
        this.checkDeath();
        this.theGame.playByPlay = action.hero.name + ' uses ' + action.ability.name + ' [' + action.ability.power + ']' +
            ' on ' + action.target.name + ' to deal damage over time\n' +  this.theGame.playByPlay;
    }

    hotAbility(action: any) {
        action.target.buffs.push({
            typeIndex: action.ability.typeIndex,
            power: action.ability.power,
            turns: action.ability.turns
        });
        this.theGame.playByPlay = action.hero.name + ' uses ' + action.ability.name + ' [' + action.ability.power + ']' +
            ' on ' + action.target.name + ' to heal over time\n' +  this.theGame.playByPlay;
    }

    cleanseAbility(action: any) {
        for (let debuff of action.target.debuffs) {
            if (debuff.triggerOnCleanse) {
                debuff.endEffect(action.target);
            }
        }
        action.target.debuffs = [];
        this.theGame.playByPlay = action.hero.name + ' uses ' + action.ability.name +
            ' on ' + action.target.name + ' to remove harmful effects\n' +  this.theGame.playByPlay;
    }

    curseAbility(action: any) {
        action.target.debuffs.push({
            name: action.ability.name,
            typeIndex: action.ability.typeIndex,
            triggerOnCleanse: action.ability.triggerOnCleanse,
            power: action.ability.power,
            turns: action.ability.turns,
            endEffect: action.ability.endEffect
        });
        action.ability.effect(action.target);
        this.theGame.playByPlay = action.hero.name + ' uses ' + action.ability.name +
            ' on ' + action.target.name + '\n' +  this.theGame.playByPlay;
    }

    buffAbility(action: any) {
        action.target.buffs.push({
            name: action.ability.name,
            typeIndex: action.ability.typeIndex,
            triggerOnCleanse: action.ability.triggerOnCleanse,
            power: action.ability.power,
            turns: action.ability.turns,
            endEffect: action.ability.endEffect
        });
        action.ability.effect(action.target);
        this.theGame.playByPlay = action.hero.name + ' uses ' + action.ability.name +
            ' on ' + action.target.name + '\n' +  this.theGame.playByPlay;
    }

    aoeBuffAbility(action: any) {
        if (this.theGame.player.includes(action.hero)) {
            for (let hero of this.theGame.player) {
                hero.buffs.push({
                    name: action.ability.name,
                    typeIndex: AbilityTypes.Buff,
                    triggerOnCleanse: action.ability.triggerOnCleanse,
                    power: action.ability.power,
                    turns: action.ability.turns,
                    endEffect: action.ability.endEffect
                });
            }
            action.ability.effect(this.theGame.player);
        } else if (this.theGame.enemy.includes(action.hero)) {
            for (let hero of this.theGame.enemy) {
                hero.buffs.push({
                    name: action.ability.name,
                    typeIndex: AbilityTypes.Buff,
                    triggerOnCleanse: action.ability.triggerOnCleanse,
                    power: action.ability.power,
                    turns: action.ability.turns,
                    endEffect: action.ability.endEffect
                });
            }
            action.ability.effect(this.theGame.enemy);
        }
        this.theGame.playByPlay = action.hero.name + ' uses ' + action.ability.name +
            ' to buff all allies\n' +  this.theGame.playByPlay;
    }

    aoeCurseAbility(action: any) {
        if (this.theGame.player.includes(action.hero)) {
            for (let hero of this.theGame.enemy) {
                hero.debuffs.push({
                    name: action.ability.name,
                    typeIndex: AbilityTypes.Curse,
                    triggerOnCleanse: action.ability.triggerOnCleanse,
                    power: action.ability.power,
                    turns: action.ability.turns,
                    endEffect: action.ability.endEffect
                });
            }
            action.ability.effect(this.theGame.enemy);
        } else if (this.theGame.enemy.includes(action.hero)) {
            for (let hero of this.theGame.player) {
                hero.debuffs.push({
                    name: action.ability.name,
                    typeIndex: AbilityTypes.Curse,
                    triggerOnCleanse: action.ability.triggerOnCleanse,
                    power: action.ability.power,
                    turns: action.ability.turns,
                    endEffect: action.ability.endEffect
                });
            }
            action.ability.effect(this.theGame.player);
        }
        this.theGame.playByPlay = action.hero.name + ' uses ' + action.ability.name +
            ' to harm all enemies\n' +  this.theGame.playByPlay;
    }

    aoeCleanseAbility(action: any) {
        if (this.theGame.player.includes(action.hero)) {
            for (let hero of this.theGame.player) {
                for (let debuff of hero) {
                    if (debuff.triggerOnCleanse) {
                        debuff.endEffect(hero);
                    }
                }
                hero.debuffs = [];
            }
        } else if (this.theGame.enemy.includes(action.hero)) {
            for (let hero of this.theGame.enemy) {
                for (let debuff of hero) {
                    if (debuff.triggerOnCleanse) {
                        debuff.endEffect(hero);
                    }
                }
                hero.debuffs = [];
            }
        }
        this.theGame.playByPlay = action.hero.name + ' uses ' + action.ability.name +
            ' to buff all allies\n' +  this.theGame.playByPlay;
    }

    aoeDoTAbility(action: any) {
        if (this.theGame.player.includes(action.hero)) {
            for (let hero of this.theGame.enemy) {
                hero.debuffs.push({
                    typeIndex: AbilityTypes.DoT,
                    power: action.ability.power,
                    turns: action.ability.turns
                });
            }
        } else if (this.theGame.enemy.includes(action.hero)) {
            for (let hero of this.theGame.player) {
                hero.debuffs.push({
                    typeIndex: AbilityTypes.DoT,
                    power: action.ability.power,
                    turns: action.ability.turns
                });
            }
        }        
        this.checkDeath();
        this.theGame.playByPlay = action.hero.name + ' uses ' + action.ability.name + ' [' + action.ability.power + ']' +
            ' on all enemies to deal damage over time\n' +  this.theGame.playByPlay;
    }

    aoeHoTAbility(action: any) {
        if (this.theGame.player.includes(action.hero)) {
            for (let hero of this.theGame.player) {
                hero.debuffs.push({
                    typeIndex: AbilityTypes.HoT,
                    power: action.ability.power,
                    turns: action.ability.turns
                });
            }
        } else if (this.theGame.enemy.includes(action.hero)) {
            for (let hero of this.theGame.enemy) {
                hero.debuffs.push({
                    typeIndex: AbilityTypes.HoT,
                    power: action.ability.power,
                    turns: action.ability.turns
                });
            }
        }        
        this.checkDeath();
        this.theGame.playByPlay = action.hero.name + ' uses ' + action.ability.name + ' [' + action.ability.power + ']' +
            ' on all allies to heal them over time\n' +  this.theGame.playByPlay;
    }

    checkDeath() {
        for (let hero of this.theGame.player) {
            if (hero.currentHealth <= 0) {
                hero.alive = false;
            }
        }

        for (let hero of this.theGame.enemy) {
            if (hero.currentHealth <= 0) {
                hero.alive = false;
            }
        }
    }

    getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }    

    openDialog(pages: string[]): Observable<boolean> {
        let dialogRef: MdDialogRef<PlayDialogComponent>;

        dialogRef = this.dialog.open(PlayDialogComponent);
        dialogRef.disableClose = true;
        dialogRef.updateSize('500px', '300px');
        dialogRef.componentInstance.dialogPages = pages;

        return dialogRef.afterClosed();
    }

    openHeroDialog(hero: any): Observable<boolean> {
        let dialogRef: MdDialogRef<HeroDialogComponent>;

        dialogRef = this.dialog.open(HeroDialogComponent);
        dialogRef.updateSize('500px', '300px');
        dialogRef.componentInstance.hero = hero;

        return dialogRef.afterClosed();
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
