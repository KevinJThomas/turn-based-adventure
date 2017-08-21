import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { Heroes } from './app.heroes';

import * as firebase from 'firebase';

@Injectable()
export class AppService implements CanActivate {
    userLoggedIn = false;
    authUser: any;

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // return this.verifyLogin();
        return true;
    }

    getUserId(): string {
        this.authUser = firebase.auth().currentUser;

        if (this.authUser) {
            return this.authUser.uid;
        } else {
            return Array['Unknown User']; // TODO: Handle this case
        }
    }

    getUserEmail() {
        if (this.authUser) {
            return this.authUser.email;
        }
    }

    verifyLogin(): boolean {
        if (this.userLoggedIn) { return true }

        this.router.navigate(['/login']);
        return false;
    }

    register(email: string, password: string, username: string) { // TODO: using an observable may fix login button issue
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
                alert(`${error.message} Please try again!`); // using alerts for testing, change to something else later
        });

        const dbRef = firebase.database().ref('users/');
        this.authUser = firebase.auth().currentUser;

        if (this.authUser) {
            const newUser = dbRef.push();
            newUser.set ({
                id: newUser.key,
                email: this.authUser.email,
                uid: this.authUser.uid,
                username: username,
                muteSound: false,
                showNameplates: true
            });
        }
    }

    verifyUser() {
        this.authUser = firebase.auth().currentUser;

        if (this.authUser) {
            this.userLoggedIn = true;
            this.router.navigate(['']);
        }
    }

    login(loginEmail: string, loginPassword: string) {
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
            .catch(function(error) {
                alert(`${error.message} Unable to login. Please try again!`) // using alerts for testing, change to something else later
        });
    }

    logout() {
        this.userLoggedIn = false;
        firebase.auth().signOut().then(function () {

        }, function(error) {
            alert(`${error.message} Unable to logout. Please try again!`) // using alerts for testing, change to something else later
        });
    }

    updateOptions(user: any) {
        firebase.database().ref('users/').child(user.id)
            .update({
                muteSound: user.muteSound,
                showNameplates: user.showNameplates
            });
    }

    newStory(heroName: string, stamina: number, strength: number, agility: number, magic: number) {
        let theUser: any;
        const heroType = this.findHeroType(heroName);
        let gameKey: string;

        const dbRef = firebase.database().ref('users/');        
        dbRef.once('value')
        .then((snapshot) => {
            const tmp: string[] = snapshot.val();
            console.log(Object.keys(tmp).map(key => tmp[key]));
            theUser = Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === this.getUserId())[0];
        }).then(() => {
            if (theUser) {
                const gameDbRef = firebase.database().ref('users/').child(theUser.id).child('games/');
                const newGame = gameDbRef.push();
                newGame.set ({
                    id: newGame.key,
                    storyLine: heroType,
                    name: 'placeholderName'
                });
                gameKey = newGame.key;
            }
        }).then(() => {
            const teamDbRef = firebase.database().ref('users/').child(theUser.id).child('games/').child(gameKey).child('team/');
            const newTeam = teamDbRef.push();
            newTeam.set ({
                id: newTeam.key,
                name: heroName,
                stamina: stamina,
                strength: strength,
                agility: agility,
                magic: magic
            });
        });
    }

    findHeroType(heroName: string) {
        switch(heroName) {
            case 'Burmi': {
                return Heroes.Burmi;
            }
            case 'Elvashj': {
                return Heroes.Elvashj;
            }
            case 'Ushuna': {
                return Heroes.Ushuna;
            }
        }
    }
}
