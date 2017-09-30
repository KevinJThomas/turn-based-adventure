import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../../shared/app.service';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeWhile';

@Component({
    templateUrl: './continue-story.component.html',
    styleUrls: ['./continue-story.component.css']
})
export class ContinueStoryComponent implements OnInit {
    gameList = [];
    heroImg = '';
    loading = true;

    constructor(private appSVC: AppService, private router: Router) {}

    async ngOnInit() {
        this.appSVC.loadGameList();
        await this.sleep(1500);
        this.loading = false;
        this.gameList = this.appSVC.getGameList();
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getHeroImg(storyLine: number) {
        return this.appSVC.getHeroImg(storyLine);
    }

    play(game: any) {
        this.router.navigate(['/play/game/', game.id]);
    }

    moreDetails(game: any) {
        this.router.navigate(['/play/details/', game.id]);
    }
}
