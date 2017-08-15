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
        // stage 3
        this.theGame.player.splice(0, this.theGame.player.length);
        this.theGame.enemy.splice(0, this.theGame.enemy.length);
        this.theGame.playByPlay = '';
    }

    setAbility(player: any, ability: any) {
        for (let hero of this.theGame.player) {
            if (hero.id === player.id) {
                switch (ability.typeIndex) {
                    case AbilityTypes.None:
                    case AbilityTypes.AOEDamage:
                    case AbilityTypes.AOEHeal:
                        hero.targetableAbilitySet = false;
                        hero.friendlyTargetableAbilitySet = false;
                        break;
                    case AbilityTypes.SingleTargetDamage:
                    case AbilityTypes.Curse:
                    case AbilityTypes.DoT:
                        hero.targetableAbilitySet = true;
                        hero.friendlyTargetableAbilitySet = false;
                        break;
                    case AbilityTypes.SingleTargetHeal:
                    case AbilityTypes.Cleanse:
                    case AbilityTypes.HoT:
                        hero.targetableAbilitySet = false;
                        hero.friendlyTargetableAbilitySet = true;
                        break;
                    default:
                        console.log('ERROR: Default in play.service.ts.setAbility() hit');
                        break;
                }
                hero.targetableAbilitySet = ability.typeIndex === 1;
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
            if (hero.ready === false) {
                return false;
            }
        }
        return true;
    }

    async battle() {
        for (let enemy of this.theGame.enemy) {
            if (enemy.alive) {
                this.enemyActions.push({ //enemies can cast with negative mana
                    hero: enemy,
                    ability: enemy.abilities[this.getRandomNumber(0, enemy.abilities.length - 1)],
                    target: this.theGame.player[this.getRandomNumber(0, this.theGame.player.length - 1)]
                });
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
                    }
                }
            }
            
            if (hero.debuffs.length > 0) {
                for (let debuff of hero.debuffs) {
                    console.log(debuff);
                    if (debuff.typeIndex === AbilityTypes.DoT) {
                        hero.currentHealth -= debuff.power;
                        debuff.turns--;
                        if (debuff.turns <= 0) {
                            const index = hero.debuffs.indexOf(debuff, 0);
                            hero.debuffs.splice(index, 1);
                        }
                    } else if (debuff.typeIndex === AbilityTypes.Curse) {
                        if (debuff.turns === 0) {
                            console.log('cursed');
                            // execute curse
                        } else {
                            debuff.turns--;
                        }
                    }
                }
            }
            hero.targetableAbilitySet = 0;
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
                        if (debuff.turns === 0) {
                            console.log('cursed');
                            // execute curse
                        } else {
                            debuff.turns--;
                        }
                    }
                }
            }
        }

        this.playerActions = [];
        this.enemyActions = [];
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
                    player.currentHealth += player.maxHealth;
                }                
            }
        } else if (this.theGame.enemy.includes(action.hero)) {
            for (let enemy of this.theGame.enemy) {
                if ((enemy.currentHealth + action.ability.power) < enemy.maxHealth) {
                    enemy.currentHealth += action.ability.power;
                } else {
                    enemy.currentHealth += enemy.maxHealth;
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
            turns: action.ability. turns
        });
        console.log(action.target.debuffs);
        this.checkDeath();
        this.theGame.playByPlay = action.hero.name + ' uses ' + action.ability.name + ' [' + action.ability.power + ']' +
            ' on ' + action.target.name + ' to deal damage over time\n' +  this.theGame.playByPlay;
    }

    hotAbility(action: any) {
        action.target.buffs.push({
            typeIndex: action.ability.typeIndex,
            power: action.ability.power,
            turns: action.ability. turns
        });
        this.theGame.playByPlay = action.hero.name + ' uses ' + action.ability.name + ' [' + action.ability.power + ']' +
            ' on ' + action.target.name + ' to heal over time\n' +  this.theGame.playByPlay;
    }

    cleanseAbility(action: any) {
        action.target.debuffs = [];
        this.theGame.playByPlay = action.hero.name + ' uses ' + action.ability.name +
            ' on ' + action.target.name + ' to remove harmful effects\n' +  this.theGame.playByPlay;
    }

    curseAbility(action: any) {
        action.target.debuffs.push({
            typeIndex: action.ability.typeIndex,
            power: action.ability.power,
            turns: action.ability. turns
        });
        this.theGame.playByPlay = action.hero.name + ' uses ' + action.ability.name +
            ' on ' + action.target.name + '\n' +  this.theGame.playByPlay;
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
