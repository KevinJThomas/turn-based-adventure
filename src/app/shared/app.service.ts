import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { Heroes } from './app.heroes';
import { AbilityTypes } from '../play/playShared/play.ability-types';

import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService implements CanActivate {
    userLoggedIn = false;
    authUser: any;
    currentGame: string;    
    gameList: any[];
    theGame: any;
    team: any[];

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

    getGameList() {
        return this.gameList;
    }

    loadGameList() {
        let theUser: any;

        const dbRef = firebase.database().ref('users/');        
        dbRef.once('value')
        .then((snapshot) => {
            const tmp: string[] = snapshot.val();
            theUser = Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === this.getUserId())[0];
        }).then((snapshot) => {            
            if (theUser) {
                const gameDbRef = firebase.database().ref('users/').child(theUser.id).child('games/');
                gameDbRef.once('value')
                .then((snapshot) => {
                    const tmp: string[] = snapshot.val();
                    this.gameList = Object.keys(tmp).map(key => tmp[key]);
                });                
            }
        });
    }

    async newStory(storyName: string, heroName: string, stamina: number, strength: number, agility: number, magic: number, energy: number) {
        let theUser: any;
        const heroType = this.findHeroType(heroName);

        const dbRef = firebase.database().ref('users/');        
        dbRef.once('value')
        .then((snapshot) => {
            const tmp: string[] = snapshot.val();
            theUser = Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === this.getUserId())[0];
        }).then(() => {
            if (theUser) {
                const gameDbRef = firebase.database().ref('users/').child(theUser.id).child('games/');
                const newGame = gameDbRef.push();
                switch (heroType) {
                    case (Heroes.Burmi): {
                        newGame.set ({
                            id: newGame.key,
                            storyLine: heroType,
                            name: storyName,
                            stage: 0,
                            location: 'Ironforge Forest'
                        });
                    }
                    case (Heroes.Elvashj): {
                        newGame.set ({
                            id: newGame.key,
                            storyLine: heroType,
                            name: storyName,
                            stage: 0,
                            location: 'Elemental Cave'
                        });
                    }
                    case (Heroes.Ushuna): {
                        newGame.set ({
                            id: newGame.key,
                            storyLine: heroType,
                            name: storyName,
                            stage: 0,
                            location: 'Dread Swamp'
                        });
                    }
                    default: {
                        console.log('ERROR: Default in app.service.ts.newStory() hit');
                    }
                }
                
                this.currentGame = newGame.key;
            }
        }).then(() => {
            const teamDbRef = firebase.database().ref('users/').child(theUser.id).child('games/').child(this.currentGame).child('team/');
            const newTeam = teamDbRef.push();
            newTeam.set ({
                id: newTeam.key,
                name: heroName,
                level: 1,
                xp: 0,
                stamina: stamina,
                strength: strength,
                agility: agility,
                magic: magic,
                energy: energy,
                heroId: heroType
            });
            const heroDbRef = firebase.database().ref('users/').child(theUser.id).child('games/').child(this.currentGame).child('team/')
                .child(newTeam.key).child('abilities/');
            const newAbilities = heroDbRef.push();
            switch (heroType) {
                case (Heroes.Burmi): {
                    newAbilities.set ({
                        name: 'Slice',
                        typeIndex: AbilityTypes.SingleTargetDamage,
                        power: 4,
                        cost: 5,
                        description: 'Slice an enemy'
                    });
                }
                case (Heroes.Elvashj): {
                    // TODO: Add starting ability
                    newAbilities.set ({
                        name: 'Slice',
                        typeIndex: AbilityTypes.SingleTargetDamage,
                        power: 4,
                        cost: 5,
                        description: 'Slice an enemy'
                    });
                }
                case (Heroes.Ushuna): {
                    // TODO: Add starting ability
                    newAbilities.set ({
                        name: 'Slice',
                        typeIndex: AbilityTypes.SingleTargetDamage,
                        power: 4,
                        cost: 5,
                        description: 'Slice an enemy'
                    });
                }
                default: {
                    console.log('ERROR: Default in app.service.ts.newStory() hit');
                }
            }
        });
    }

    setGameInfo(gameId: string) {
        let theUser: any;

        const dbRef = firebase.database().ref('users/');        
        dbRef.once('value')
        .then((snapshot) => {
            const tmp: string[] = snapshot.val();
            theUser = Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === this.getUserId())[0];
        }).then(() => {
            if (theUser) {
                const gameDbRef = firebase.database().ref('users/').child(theUser.id).child('games/');
                gameDbRef.once('value')
                .then((snapshot) => {
                    const tmp: string[] = snapshot.val();
                    this.theGame = Object.keys(tmp).map(key => tmp[key]).filter(game => game.id === gameId)[0];
                }).then(() => {
                    const teamDbRef = firebase.database().ref('users/').child(theUser.id).child('games/').child(gameId).child('team/');
                    teamDbRef.once('value')
                    .then((snapshot) => {
                        const tmp: string[] = snapshot.val();
                        this.team = Object.keys(tmp).map(key => tmp[key]);
                        for (let hero of this.team) {
                            const abilitiesDbRef = firebase.database().ref('users/').child(theUser.id).child('games/').child(gameId).child('team/')
                                .child(hero.id).child('abilities/');
                            abilitiesDbRef.once('value')
                            .then((snapshot) => {
                                const tmp: string[] = snapshot.val();
                                hero.abilityList = Object.keys(tmp).map(key => tmp[key]);
                            });
                        }
                    });
                });
            }
        });
    }

    getGameInfo() {
        return this.theGame;
    }

    getTeamInfo() {
        return this.team;
    }

    getCurrentGame(): string {
        return this.currentGame;
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

    getHeroImg(hero: number) {
        switch (hero) {
            case 0:
                return 'https://firebasestorage.googleapis.com/v0/b/turn-based-game-438f3.appspot.com/o/Hero%20Images%2Fdwarf_warrior.jpg?alt=media&token=25b7f4ed-0450-410c-b1c3-3ed85e41441c';
            case 1:
                return 'https://firebasestorage.googleapis.com/v0/b/turn-based-game-438f3.appspot.com/o/Hero%20Images%2Fhuman_ranger2.jpg?alt=media&token=78a0b97d-d74c-4e84-951e-3ed3d54e5eba';
            case 2:
                return 'https://firebasestorage.googleapis.com/v0/b/turn-based-game-438f3.appspot.com/o/Hero%20Images%2Fhuman_warlock.jpg?alt=media&token=4a92c3b3-9982-4058-9eb9-01e1fbab2075';
            default:
                return 'https://firebasestorage.googleapis.com/v0/b/turn-based-game-438f3.appspot.com/o/Hero%20Images%2Fdefault.jpg?alt=media&token=a05dc774-e053-4f72-966a-fe1ebbef2785';
        }
    }
}
