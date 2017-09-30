import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from '../../shared/app.service';
import { PlayService } from '../playShared/play.service';

@Component({
    templateUrl: './score-screen.component.html',
    styleUrls: ['./score-screen.component.css']
})
export class ScoreScreenComponent implements OnInit, OnDestroy {
    sub: any;
    gameId: string;
    loading = true;
    theGame: any;
    heroes: any[];

    constructor(private router: Router, private route: ActivatedRoute, private appSVC: AppService, private playSVC: PlayService) {}

    async ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.gameId = params['id'];
        });
        this.appSVC.setGameInfo(this.gameId);
        await this.sleep(1500);
        this.loading = false;
        this.theGame = this.appSVC.getGameInfo();
        this.heroes = this.appSVC.getTeamInfo();
        for (const hero of this.heroes) {
            hero.nextLevel = this.appSVC.getNextLevel(hero.xp);
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    openHeroDialog(hero: any) {
        this.playSVC.openHeroDialog(hero);
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    continue() {
        this.router.navigate(['/play/game', this.gameId]);
    }

    editHero(hero: any) {
        this.playSVC.openLevelUpDialog(hero, this.gameId, false);
    }
}
