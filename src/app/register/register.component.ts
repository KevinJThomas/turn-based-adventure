import { Component } from '@angular/core';
import { AppService } from '../shared/app.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    email: string;
    password: string;
    nickname: string;
    confirmPassword: string;
    passwordFail = false;

    constructor(private appSVC: AppService, private router: Router) { }

    register() {
        if (this.password !== this.confirmPassword) {
            this.passwordFail = true;
        } else {
            this.passwordFail = false;
            this.appSVC.register(this.email, this.password, this.nickname);
            this.appSVC.verifyUser();
        }
    }

    cancel() {
        this.router.navigate(['/login']);
    }
}
