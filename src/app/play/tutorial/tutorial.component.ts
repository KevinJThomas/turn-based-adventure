import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialog } from '@angular/material';

import { Heroes } from '../../shared/app.heroes';
import { WinConditions } from '../playShared/play.win-conditions';
import { PlayService } from '../playShared/play.service';
import { Dialogs } from '../playShared/play.dialogs';

import { Subscription } from 'rxjs/Subscription';
import "rxjs/add/operator/takeWhile";

@Component({
    templateUrl: './tutorial.component.html',
    styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit, OnDestroy {
    theGame: any;    
    ready = false;
    targetableAbility = false;
    showError = false;
    turnActive = true;
    isBattleFinished = WinConditions.InProgress;
    playByPlay = '';
    firstTurn = true;
    subscriptions: Array<Subscription> = [];

    constructor(private playSVC: PlayService, private dialog: MdDialog, private dialogs: Dialogs) {
        this.playSVC.openDialog(this.dialogs.tutorialIntro());
    }

    ngOnInit() {
        this.subscriptions.push(this.playSVC.newTutorial()
            .subscribe(theGame => this.theGame = theGame));
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

    targetableAbilitySelected(player: any, ability: any) {
        this.playSVC.setAbility(player, ability);
        this.targetableAbility = true;
        if (ability.cost > this.theGame.player[0].currentEnergy) {
            this.showError = true;
        }
    }

    setReady(player: any, target: any) {
        this.playSVC.setTarget(player, target);
        this.ready = true;
    }

    async executeTurn() {
        await this.playSVC.battle();
        
        if (this.playSVC.isBattleFinished() != WinConditions.InProgress) {
            this.isBattleFinished = this.playSVC.isBattleFinished();
        } else {
            await this.playSVC.enemyTurn();
            this.isBattleFinished = this.playSVC.isBattleFinished();
            this.targetableAbility = false;
            this.ready = false;
            this.turnActive = false;
            await this.sleep(0);
            this.turnActive = true;
        }

        if (this.firstTurn) {
            this.playSVC.openDialog(this.dialogs.tutorialFirstTurn());
            this.firstTurn = false;
        }    
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    openHeroDialog(hero: any) {
        this.playSVC.openHeroDialog(hero);
    }
}
