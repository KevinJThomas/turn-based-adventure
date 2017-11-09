import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Dialogs } from './play.dialogs';
import { Heroes } from '../../shared/app.heroes';
import { Abilities } from './play.abilities';
import { AbilityTypes } from './play.ability-types';
import { WinConditions } from './play.win-conditions';
import { Scenarios } from './play.scenarios';
import { PlayDialogComponent } from './playDialog/play-dialog.component';
import { HeroDialogComponent } from './heroDialog/hero-dialog.component';
import { LevelUpDialogComponent } from '../game/levelUpDialog/level-up-dialog.component';
import { AppService } from '../../shared/app.service';

import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayService {
    theGame: any;
    gameObject: any;
    playerActions = [];
    enemyActions = [];
    stage: number;
    storyLine: number;
    userId: string;

    constructor(private scenarios: Scenarios, private dialog: MdDialog, private appSVC: AppService, private abilities: Abilities, private dialogs: Dialogs) {
        this.getId();
    }

    getId() {
        const dbRef = firebase.database().ref('users/');
        dbRef.once('value')
        .then((snapshot) => {
            const tmp: string[] = snapshot.val();
            this.userId = Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === this.appSVC.getUserId())[0].id;
        });
    }

    clearLog() {
        this.theGame.playByPlay = '';
    }

    newTutorial(): Observable<any[]> {
        this.theGame = this.scenarios.tutorial();
        this.theGame.playByPlay = '';
        this.theGame.xpGained = 0;

        return Observable.of(this.theGame);
    }

    newBattle(playerHeroes: any[], enemyHeroes: any[]): Observable<any[]> {
        this.theGame = {
            player: playerHeroes,
            enemy: enemyHeroes,
            playerAlive: playerHeroes,
            enemyAlive: enemyHeroes,
            xpGained: 0
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
        this.theGame.xpGained = 0;
    }

    tutorialStageThree() {
        this.theGame.player.splice(0, this.theGame.player.length);
        this.theGame.enemy.splice(0, this.theGame.enemy.length);
        this.theGame.player = this.scenarios.tutorialPlayerArmy();
        this.theGame.enemy = this.scenarios.tutorialEnemyArmy();
        this.theGame.playByPlay = '';
        this.theGame.xpGained = 0;
    }

    setupGame(gameId: string) {
        this.theGame = {
            player: [],
            enemy: [],
            playByPlay: '',
            xpGained: 0
        };
        let theUser: any;
        const dbRef = firebase.database().ref('users/');
        dbRef.once('value')
        .then((snapshot) => {
            const tmp: string[] = snapshot.val();
            theUser = Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === this.appSVC.getUserId())[0];
        }).then((snapshot) => {
            if (theUser) {
                const gameDbRef = firebase.database().ref('users/').child(theUser.id).child('games/');
                gameDbRef.once('value')
                .then((snapshot) => {
                    const tmp: string[] = snapshot.val();
                    const gameInfo = Object.keys(tmp).map(key => tmp[key]).filter(game => game.id === gameId)[0];
                    this.stage = gameInfo.stage;
                    this.storyLine = gameInfo.storyLine;
                });
                const teamDbRef = firebase.database().ref('users/').child(theUser.id).child('games/').child(gameId).child('team/');
                teamDbRef.once('value')
                .then((snapshot) => {
                    const tmp: string[] = snapshot.val();
                    this.theGame.player = Object.keys(tmp).map(key => tmp[key]);
                    for (let hero of this.theGame.player) {
                        const heroDbRef = firebase.database().ref('users/').child(theUser.id).child('games/').child(gameId).child('team/')
                            .child(hero.id).child('abilities/');
                        heroDbRef.once('value')
                        .then((snapshot) => {
                            const tmp: string[] = snapshot.val();
                            hero.abilityList = Object.keys(tmp).map(key => tmp[key]);
                            hero.abilityList.push(this.abilities.pass());
                        })
                        hero.currentHealth = this.calculateHealth(hero);
                        hero.maxHealth = this.calculateHealth(hero);
                        hero.currentEnergy = this.calculateEnergy(hero);
                        hero.maxEnergy = this.calculateEnergy(hero);
                        hero.alive = true;
                        hero.targetableAbilitySet = false;
                        hero.friendlyTargetableAbilitySet = false;
                        hero.ready = false;
                        hero.buffs = [];
                        hero.debuffs = [];
                        hero.frozen = false;
                    }
                });
            }
        });
    }

    calculateHealth(hero: any) {
        return (hero.level * 3) + (hero.stamina * 4);
    }

    calculateEnergy(hero: any) {
        return 20 + (hero.level * 4) + (hero.energy * 5);
    }

    playGame(): Observable<any[]> {
        this.theGame.enemy = this.findScenario();
        if (!this.theGame.enemy) {
            this.theGame.player[0].name += '!';
        }
        return Observable.of(this.theGame);
    }

    findScenario() {
        switch (this.storyLine) {
            case Heroes.Burmi: {
                if (this.scenarios.burmi()[this.stage]) {
                    return this.scenarios.burmi()[this.stage];
                } else {
                    console.log('ERROR: Default in play.service.ts.findScenario() (Burmi.stage) hit');
                }
                break;
            }
            case Heroes.Elvashj: {
                // Coming soon
                if (this.scenarios.elvashj()[this.stage]) {
                    return this.scenarios.elvashj()[this.stage];
                } else {
                    console.log('ERROR: Default in play.service.ts.findScenario() (Elvashj.stage) hit');
                }
                break;
            }
            case Heroes.Ushuna: {
                // Coming soon
                if (this.scenarios.ushuna()[this.stage]) {
                    return this.scenarios.ushuna()[this.stage];
                } else {
                    console.log('ERROR: Default in play.service.ts.findScenario() (Ushuna.stage) hit');
                }
                break;
            }
            default: {
                console.log('ERROR: Default in play.service.ts.findScenario() (storyLine) hit');
            }
        }
    }

    openStoryDialog() {
        switch (this.storyLine) {
            case Heroes.Burmi: {
                if (this.dialogs.burmi()[this.stage]) {
                    this.openDialog(this.dialogs.burmi()[this.stage])
                } else {
                    console.log('ERROR: Default in play.service.ts.openStoryDialog() (Burmi.stage) hit');
                }
                break;
            }
            case Heroes.Elvashj: {
                // Coming soon
                if (this.dialogs.elvashj()[this.stage]) {
                    this.openDialog(this.dialogs.elvashj()[this.stage])
                } else {
                    console.log('ERROR: Default in play.service.ts.openStoryDialog() (Elvashj.stage) hit');
                }
                break;
            }
            case Heroes.Ushuna: {
                // Coming soon
                if (this.dialogs.ushuna()[this.stage]) {
                    this.openDialog(this.dialogs.ushuna()[this.stage])
                } else {
                    console.log('ERROR: Default in play.service.ts.openStoryDialog() (Ushuna.stage) hit');
                }
                break;
            }
            default: {
                console.log('ERROR: Default in play.service.ts.openStoryDialog() (storyLine) hit');
            }
        }
    }

    setAbility(player: any, ability: any) {
        for (const hero of this.theGame.player) {
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
                    for (const action of this.playerActions) {
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
        for (const hero of this.theGame.player) {
            if (hero.id === player.id) {
                let duplicate = false;
                for (const action of this.playerActions) {
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
        for (const hero of this.theGame.player) {
            if (hero.alive === true && hero.ready === false) {
                return false;
            }
        }
        return true;
    }

    findEnemyAbility(enemy: any) {
        const availableAbilities = enemy.abilityList.filter(ability => ability.cost <= enemy.currentEnergy);
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
        for (const hero of this.theGame.player) {
            hero.frozen = false;
        }
        for (const hero of this.theGame.enemy) {
            hero.frozen = false;
        }
    }

    async battle() {
        for (const enemy of this.theGame.enemy) {
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

        const allActions = this.playerActions.concat(this.enemyActions);
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

        for (const action of allActions) {
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

        for (const hero of this.theGame.player) {
            if (hero.buffs.length > 0) {
                for (const buff of hero.buffs) {
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
                for (const debuff of hero.debuffs) {
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

        for (const hero of this.theGame.enemy) {
            if (hero.buffs.length > 0) {
                for (const buff of hero.buffs) {
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
                for (const debuff of hero.debuffs) {
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
        for (const hero of this.theGame.player) {
            if (hero.frozen) {
                hero.ready = true;
            }
        }
    }

    isBattleFinished(gameId: string, isTutorial = false): number {
        let playerAlive = false;

        for (const hero of this.theGame.player) {
            if (hero.alive) {
                playerAlive = true;
            }
        }

        let enemyAlive = false;

        for (const hero of this.theGame.enemy) {
            if (hero.alive) {
                enemyAlive = true;
            }
        }

        if (playerAlive && enemyAlive) {
            return WinConditions.InProgress
        } else if (!playerAlive && enemyAlive) {
            return WinConditions.Lose
        } else if (playerAlive && !enemyAlive) {
            if (!isTutorial) {
                for (const enemy of this.theGame.enemy) {
                    this.theGame.xpGained += (enemy.level * 3);
                }
                for (const hero of this.theGame.player) {
                    hero.xp += this.theGame.xpGained / this.theGame.player.length;
                    firebase.database().ref('users/').child(this.userId).child('games/').child(gameId)
                        .update({
                            stage: this.stage + 1
                        });
                    firebase.database().ref('users/').child(this.userId).child('games/').child(gameId).child('team/').child(hero.id)
                        .update({
                            xp: this.theGame.xpGained
                        });
                    if (this.didLevelUp(hero)) {
                        hero.level++;
                        if (hero.statPoints) {
                            hero.statPoints += 4;
                        } else {
                            hero.statPoints = 4;
                        }
                        firebase.database().ref('users/').child(this.userId).child('games/').child(gameId).child('team/').child(hero.id)
                            .update({
                                level: hero.level,
                                statPoints: hero.statPoints
                            });
                        this.openLevelUpDialog(hero, gameId);
                    }
                }
            }
            return WinConditions.Win
        } else {
            return WinConditions.Tie
        }
    }

    didLevelUp(hero: any) {
        switch (hero.level) {
            case 1: {
                if (hero.xp >= 10) {
                    return true;
                }
                break;
            }
            case 2: {
                if (hero.xp >= 50) {
                    return true;
                }
                break;
            }
            case 3: {
                if (hero.xp >= 200) {
                    return true;
                }
                break;
            }
            case 4: {
                if (hero.xp >= 1000) {
                    return true;
                }
                break;
            }
            case 5: {
                if (hero.xp >= 3000) {
                    return true;
                }
                break;
            }
            case 6: {
                if (hero.xp >= 8000) {
                    return true;
                }
                break;
            }
            case 7: {
                if (hero.xp >= 20000) {
                    return true;
                }
                break;
            }
            case 8: {
                if (hero.xp >= 50000) {
                    return true;
                }
                break;
            }
            case 9: {
                if (hero.xp >= 100000) {
                    return true;
                }
                break;
            }
            case 10: {
                if (hero.xp >= 200000) {
                    return true;
                }
                break;
            }
            default: {
                return false;
            }
        }
        return false;
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
            for (const enemy of this.theGame.enemy) {
                enemy.currentHealth -= action.ability.power;
            }
        } else if (this.theGame.enemy.includes(action.hero)) {
            for (const player of this.theGame.player) {
                player.currentHealth -= action.ability.power;
            }
        }
        this.checkDeath();
        this.theGame.playByPlay = action.hero.name + ' uses ' + action.ability.name + ' [' + action.ability.power + ']' +
            ' to damage all enemies\n' +  this.theGame.playByPlay;
    }

    aoeHealAbility(action: any) {
        if (this.theGame.player.includes(action.hero)) {
            for (const player of this.theGame.player) {
                if ((player.currentHealth + action.ability.power) < player.maxHealth) {
                    player.currentHealth += action.ability.power;
                } else {
                    player.currentHealth = player.maxHealth;
                }
            }
        } else if (this.theGame.enemy.includes(action.hero)) {
            for (const enemy of this.theGame.enemy) {
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
        for (const debuff of action.target.debuffs) {
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
            for (const hero of this.theGame.player) {
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
            for (const hero of this.theGame.enemy) {
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
            for (const hero of this.theGame.enemy) {
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
            for (const hero of this.theGame.player) {
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
            for (const hero of this.theGame.player) {
                for (const debuff of hero) {
                    if (debuff.triggerOnCleanse) {
                        debuff.endEffect(hero);
                    }
                }
                hero.debuffs = [];
            }
        } else if (this.theGame.enemy.includes(action.hero)) {
            for (const hero of this.theGame.enemy) {
                for (const debuff of hero) {
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
            for (const hero of this.theGame.enemy) {
                hero.debuffs.push({
                    typeIndex: AbilityTypes.DoT,
                    power: action.ability.power,
                    turns: action.ability.turns
                });
            }
        } else if (this.theGame.enemy.includes(action.hero)) {
            for (const hero of this.theGame.player) {
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
            for (const hero of this.theGame.player) {
                hero.debuffs.push({
                    typeIndex: AbilityTypes.HoT,
                    power: action.ability.power,
                    turns: action.ability.turns
                });
            }
        } else if (this.theGame.enemy.includes(action.hero)) {
            for (const hero of this.theGame.enemy) {
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
        for (const hero of this.theGame.player) {
            if (hero.currentHealth <= 0) {
                hero.alive = false;
            }
        }

        for (const hero of this.theGame.enemy) {
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

    openLevelUpDialog(hero: any, gameId: string, leveledUp = true): Observable<boolean> {
        let dialogRef: MdDialogRef<LevelUpDialogComponent>;

        dialogRef = this.dialog.open(LevelUpDialogComponent);
        dialogRef.disableClose = true;
        dialogRef.updateSize('500px', '650px');
        dialogRef.componentInstance.hero = hero;
        dialogRef.componentInstance.gameId = gameId;
        dialogRef.componentInstance.leveledUp = leveledUp;

        return dialogRef.afterClosed();
    }

    openMapDialog(gameId: string) {
        let dialogRef: MdDialogRef<LevelUpDialogComponent>;
        
        dialogRef = this.dialog.open(LevelUpDialogComponent);
        dialogRef.updateSize('1000px', '1300px');
        dialogRef.componentInstance.gameId = gameId;

        return dialogRef.afterClosed();
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
