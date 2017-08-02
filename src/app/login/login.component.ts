import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../shared/app.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    email: string;
    password: string;

    constructor(private appSVC: AppService, private router: Router) {}
    
    login() {
        this.appSVC.login(this.email, this.password);
        this.appSVC.verifyUser();
    }

    register() {
        this.router.navigate(['/register']);
    }

    cancel() {
        this.router.navigate(['']);
    }    
}
