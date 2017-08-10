import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Heroes } from '../../shared/app.heroes';
import { WinConditions } from './play.win-conditions';
import { Scenarios } from './play.scenarios';
import { PlayDialogComponent } from '../playShared/playDialog/play-dialog.component';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayService {
    theGame: any;
    playerActions = [];
    enemyActions = [];

    constructor(private scenarios: Scenarios, private dialog: MdDialog) {}

    newTutorial(): Observable<any[]> {
        this.theGame = this.scenarios.tutorial();
        
        return Observable.of(this.theGame);
    }

    newBattle(playerHeroes: any[], enemyHeroes: any[]): Observable<any[]> {
        this.theGame = {
            player: playerHeroes,
            enemy: enemyHeroes
        }
        
        return Observable.of(this.theGame);
    }

    setAbility(player: any, ability: any) {
        let index = -1;
        for (let hero of this.theGame.player) {
            if (hero.id === player.id) {
                index++;
                if (this.playerActions.length > 0) {
                    for (let action of this.playerActions) {
                        if (action.hero.id === hero.id) {
                            action.ability = ability;
                        } else {
                            this.playerActions.push({
                                hero: player,
                                ability: ability
                            })
                        }
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

    setTarget(player: any, target: any) {
        let index = -1;
        for (let hero of this.theGame.player) {
            if (hero.id === player.id) {
                index++;
                for (let action of this.playerActions) {
                    if (action.hero.id === hero.id) {
                        action.target = target;
                    } else {
                        this.playerActions.push({
                            hero: player,
                            target: target
                        })
                    }
                }
            }
        }
    }

    battle() {
        for (let action of this.playerActions) {
            switch (action.ability.typeIndex) {
                case 0: {
                    this.damageAbility(action);
                    break;
                }
                default: {
                    console.log('ERROR: Default in player.service.ts.battle() hit');
                }
            }
        }
    }

    enemyTurn(): number {
        for (let enemy of this.theGame.enemy) {
            this.enemyActions.push({
                hero: enemy,
                ability: enemy.abilities[this.getRandomNumber(0, enemy.abilities.length - 1)],
                target: this.theGame.player[this.getRandomNumber(0, this.theGame.player.length - 1)]
            });
        }

        for (let action of this.enemyActions) {
            switch (action.ability.typeIndex) {
                case 0: {
                    this.damageAbility(action);
                    break;
                }
                default: {
                    console.log('ERROR: Default in player.service.ts.battle() hit');
                }
            }
        }
        this.enemyActions = [];

        return this.isBattleFinished();
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
        action.hero.currentEnergy -= action.ability.cost;
        action.target.currentHealth -= action.ability.power;
        this.checkDeath();
        console.log(action.hero.name + ' casts ' + action.ability.name + ' on ' + action.target.name);
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
}
