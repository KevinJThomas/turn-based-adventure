import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../shared/app.service';

import * as firebase from 'firebase';

@Component({
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
    theUser: any;
    isDataAvailable = false;

    constructor(private appSVC: AppService, private router: Router) {}

    ngOnInit() {
        this.getUser();
    }

    getUser() {
        const dbRef = firebase.database().ref('users/');
        dbRef.once('value')
        .then((snapshot) => {
            const tmp: string[] = snapshot.val();
            this.theUser = Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === this.appSVC.getUserId())[0];
        }).then(() =>
        this.isDataAvailable = true);
    }

    cancel() {
        this.router.navigate(['']);
    }

    apply() {
        this.appSVC.updateOptions(this.theUser);
        this.router.navigate(['']);
    }
}
