import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavComponent {
    userEmail: string;
    iconUrl = '../../assets/knight_shield1600.png';

    constructor(private appSVC: AppService, private router: Router) {
        if (appSVC.userLoggedIn) {
            this.userEmail = appSVC.getUserEmail();
        } else {
            this.userEmail = '404'; // Handle this
        }
    }

    logout() {
        this.appSVC.logout();
        location.reload();
    }
}
