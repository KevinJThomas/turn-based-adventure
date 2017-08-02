import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { ErrorComponent } from '../error/error.component';
import { RegisterComponent } from '../register/register.component';

import { AppService } from '../shared/app.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '' , component: HomeComponent, canActivate: [AppService] },
            { path: 'login' , component: LoginComponent },
            { path: 'register' , component: RegisterComponent },
            { path: '**' , component: ErrorComponent }            
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
