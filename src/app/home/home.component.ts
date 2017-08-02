import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../shared/app.service';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    constructor(private appSVC: AppService, private router: Router) {}

    logout() {
        this.appSVC.logout();
        this.router.navigate(['/login']);
    }
}
