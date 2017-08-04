import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../shared/app.service';

import * as firebase from 'firebase';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    theUser: any;
    isDataAvailable = false;

    constructor(private appSVC: AppService, private router: Router) {}

    ngOnInit() {
        const userDbRef = firebase.database().ref('users/');
        userDbRef.once('value')
        .then((snapshot) => {
            const tmp: string[] = snapshot.val();
            this.theUser = Object.keys(tmp)
                .map(key => tmp[key])
                .filter(item => item.uid === this.appSVC.getUserId())[0];
        }).then(() =>
        this.isDataAvailable = true);
    }

    logout() {
        this.appSVC.logout();
        this.router.navigate(['/login']);
    }
}
