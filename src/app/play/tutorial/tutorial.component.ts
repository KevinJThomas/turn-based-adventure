import { Component, OnInit } from '@angular/core';

import { Heroes } from '../../shared/app.heroes';
import { WinConditions } from '../playShared/play.win-conditions';
import { PlayService } from '../playShared/play.service';

@Component({
    templateUrl: './tutorial.component.html',
    styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
    theGame: any;    
    ready = false;
    targetableAbility = false;
    showError = false;
    turnActive = true;
    isBattleFinished = WinConditions.InProgress;

    constructor(private playSVC: PlayService) {}

    ngOnInit() {
        this.playSVC.newTutorial()
            .subscribe(theGame => this.theGame = theGame);
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
        this.playSVC.battle();
        
        if (this.playSVC.isBattleFinished() != WinConditions.InProgress) {
            this.isBattleFinished = this.playSVC.isBattleFinished();
        } else {
            this.isBattleFinished = this.playSVC.enemyTurn();
            this.targetableAbility = false;
            this.ready = false;
            this.turnActive = false;
            await this.playSVC.sleep(0);
            this.turnActive = true;
        }     
    }
}
