import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from '../../shared/app.service';

@Component({
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
    sub: any;
    gameId: string;

    constructor(private router: Router, private route: ActivatedRoute, private appSVC: AppService) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.gameId = params['id'];
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
