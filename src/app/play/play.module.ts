import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdToolbarModule,
    MdSelectModule
  } from '@angular/material';

import { NavComponent } from '../shared/navbar/navbar.component';
import { PlayComponent } from './play.component';
import { ChooseModeComponent } from './chooseMode/choose-mode.component';
import { TutorialComponent } from './tutorial/tutorial.component';

import { AppService } from '../shared/app.service';
import { PlayService } from './playShared/play.service';
import { Scenarios } from './playShared/play.scenarios';

const PlayRoutes: Routes = [
    {
        path: 'play',
        component: PlayComponent,
        children: [
            { path: '', component: ChooseModeComponent, canActivate: [AppService] },
            { path: 'tutorial', component: TutorialComponent, canActivate: [AppService] }
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MdButtonModule,
        MdInputModule,
        MdCardModule,
        MdToolbarModule,
        MdSelectModule,
        RouterModule.forChild(PlayRoutes)
    ],
    exports: [
        RouterModule,
        NavComponent
    ],
    declarations: [
        NavComponent,
        PlayComponent,
        ChooseModeComponent,
        TutorialComponent
    ],
    providers: [
        PlayService,
        Scenarios
    ],
    entryComponents: [
    ]
})

export class PlayModule {}
