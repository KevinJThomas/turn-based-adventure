import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';

import { AppService } from '../../shared/app.service';
import { PlayService } from '../playShared/play.service';
import { Heroes } from '../../shared/app.heroes';
import { WinConditions } from '../playShared/play.win-conditions';
import { Dialogs } from '../playShared/play.dialogs';
import { AbilityTypes } from '../playShared/play.ability-types';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeWhile';

@Component({
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
    sub: any;
    gameId: string;
    theGame: any;
    ready = false;
    turnActive = true;
    isBattleFinished = WinConditions.InProgress;
    subscription: Subscription = new Subscription();
    disableButtons = false;
    burmiStoryLine = true;
    loading = true;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private appSVC: AppService,
        private playSVC: PlayService,
        private dialog: MdDialog,
        private dialogs: Dialogs) {}

    async ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.gameId = params['id'];
        });
        this.playSVC.setupGame(this.gameId);
        await this.sleep(750);
        this.subscription.add(this.playSVC.playGame()
            .subscribe(theGame => this.theGame = theGame));
        await this.sleep(1500);
        this.loading = false;
        this.playSVC.openStoryDialog();
        this.burmiStoryLine = this.theGame.player[0].name === 'Burmi';
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.subscription.unsubscribe();
    }

    abilitySelected(player: any, ability: any) {
        this.playSVC.setAbility(player, ability);
        this.ready = this.playSVC.playerReady();
    }

    setReady(player: any, target: any) {
        this.ready = this.playSVC.setTarget(player, target);
    }

    async executeTurn() {
        this.ready = false;
        this.disableButtons = true;
        await this.playSVC.battle();
        this.isBattleFinished = this.playSVC.isBattleFinished();

        if (this.playSVC.isBattleFinished() === WinConditions.InProgress) {
            this.turnActive = false;
            await this.sleep(0);
            this.turnActive = true;
        }

        this.disableButtons = false;
    }

    continue() {
        if (this.isBattleFinished === WinConditions.Win) {
            this.router.navigate(['/play/score-screen', this.gameId]);
        } else {
            this.router.navigate(['/continue-story']);
        }
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    openHeroDialog(hero: any) {
        this.playSVC.openHeroDialog(hero);
    }

    getHealthColor(thisEnemy: any) {
        if (thisEnemy.alive) {
            if (thisEnemy.frozen) {
                return 'blue';
            } else {
                return '';
            }
        } else {
            return 'red';
        }
    }

    getNameColor(thisEnemy: any) {
        if (thisEnemy.alive) {
            if (thisEnemy.frozen) {
                return 'blue';
            } else {
                return '';
            }
        } else {
            return 'grey';
        }
    }

    getEnergyColor(thisEnemy: any) {
        if (thisEnemy.currentEnergy > 0) {
            if (thisEnemy.frozen) {
                return 'blue';
            } else {
                return '';
            }
        } else {
            return 'red';
        }
    }

    getHeroImg(heroId: number) {
        return this.appSVC.getHeroImg(heroId);
    }

    clearLog() {
        this.playSVC.clearLog();
    }
}
