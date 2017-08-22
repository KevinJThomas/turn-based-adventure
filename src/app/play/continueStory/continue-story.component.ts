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
        const testing = this.appSVC.loadGameList();
        await this.sleep(2000);
        this.loading = false;
        this.gameList = this.appSVC.getGameList();
    }
    
    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getHeroImg(storyLine: number) {
        switch (storyLine) {
            case 0:
                return 'https://firebasestorage.googleapis.com/v0/b/turn-based-game-438f3.appspot.com/o/Hero%20Images%2Fdwarf_warrior.jpg?alt=media&token=25b7f4ed-0450-410c-b1c3-3ed85e41441c';
            case 1:
                return 'https://firebasestorage.googleapis.com/v0/b/turn-based-game-438f3.appspot.com/o/Hero%20Images%2Fhuman_ranger2.jpg?alt=media&token=78a0b97d-d74c-4e84-951e-3ed3d54e5eba';
            case 2:
                return 'https://firebasestorage.googleapis.com/v0/b/turn-based-game-438f3.appspot.com/o/Hero%20Images%2Fhuman_warlock.jpg?alt=media&token=4a92c3b3-9982-4058-9eb9-01e1fbab2075';
        }
    }

    play(game: any) {
        this.router.navigate(['/play/game/', game.id]);
    }

    moreDetails(game: any) {
        // make a more details page
    }
}
