import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';

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
    turnActive = true;
    isBattleFinished = WinConditions.InProgress;
    firstTurn = true;
    subscription: Subscription = new Subscription();
    stage = 0;
    disableButtons = false;

    constructor(private playSVC: PlayService, private dialog: MdDialog, private dialogs: Dialogs, private router: Router) {
        this.playSVC.openDialog(this.dialogs.tutorialIntro());
    }

    ngOnInit() {
        this.subscription.add(this.playSVC.newTutorial()
            .subscribe(theGame => this.theGame = theGame));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    abilitySelected(player: any, ability: any) {
        this.playSVC.setAbility(player, ability);
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

    getHealthColor(thisEnemy: any) {
        if (thisEnemy.alive) {
            return '';
        } else {
            return 'red';
        }
    }

    getEnergyColor(thisEnemy: any) {
        if (thisEnemy.currentEnergy > 0) {
            return '';
        } else {
            return 'red';
        }
    }

    continue() {
        switch (this.stage) {
            case 0: {
                this.stage++;
                this.isBattleFinished = WinConditions.InProgress;
                this.playSVC.tutorialStageTwo();
                this.playSVC.openDialog(this.dialogs.tutorialStageTwo());
                break;
            }
            case 1: {
                this.stage++;
                this.playSVC.tutorialStageThree();
                // this.isBattleFinished = WinConditions.InProgress;
                break;
            }
            case 2: {
                this.router.navigate(['/play']);
                break;
            }
            default: {
                console.log('ERROR: Default in tutorial.component.ts.continue() hit');
            }
        }
    }

    clearLog() {
        this.playSVC.clearLog();
    }
}
