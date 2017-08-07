import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { ErrorComponent } from '../error/error.component';
import { RegisterComponent } from '../register/register.component';
import { InstructionsComponent } from '../instructions/instructions.component';
import { OptionsComponent } from '../options/options.component';
import { LearnArenaComponent } from '../instructions/learnArena/learn-arena.component';
import { LearnStoryComponent } from '../instructions/learnStory/learn-story.component';

import { AppService } from '../shared/app.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '' , component: HomeComponent, canActivate: [AppService] },
            { path: 'login' , component: LoginComponent },
            { path: 'register' , component: RegisterComponent },
            { path: 'instructions' , component: InstructionsComponent, canActivate: [AppService] },
            { path: 'options' , component: OptionsComponent, canActivate: [AppService] },
            { path: 'learn-arena' , component: LearnArenaComponent, canActivate: [AppService] },
            { path: 'learn-story' , component: LearnStoryComponent, canActivate: [AppService] },
            { path: '**' , component: ErrorComponent }            
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
