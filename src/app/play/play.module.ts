import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdToolbarModule,
    MdSelectModule,
    MdDialogModule
  } from '@angular/material';

import { NavComponent } from '../shared/navbar/navbar.component';
import { PlayComponent } from './play.component';
import { ChooseModeComponent } from './chooseMode/choose-mode.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { PlayDialogComponent } from './playShared/playDialog/play-dialog.component';

import { AppService } from '../shared/app.service';
import { PlayService } from './playShared/play.service';
import { Scenarios } from './playShared/play.scenarios';
import { Dialogs } from './playShared/play.dialogs';

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
        MdDialogModule,
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
        TutorialComponent,
        PlayDialogComponent
    ],
    providers: [
        PlayService,
        Scenarios,
        Dialogs
    ],
    entryComponents: [
        PlayDialogComponent
    ]
})

export class PlayModule {}
