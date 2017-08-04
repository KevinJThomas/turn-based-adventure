import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdToolbarModule
  } from '@angular/material';

import { NavComponent } from '../shared/navbar/navbar.component';
import { PlayComponent } from './play.component';
import { ChooseModeComponent } from './chooseMode/choose-mode.component';

import { AppService } from '../shared/app.service';

const PlayRoutes: Routes = [
    {
        path: 'play',
        component: PlayComponent,
        children: [
            { path: '', component: ChooseModeComponent, canActivate: [AppService] }
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
        RouterModule.forChild(PlayRoutes)
    ],
    exports: [
        RouterModule,
        NavComponent
    ],
    declarations: [
        NavComponent,
        PlayComponent,
        ChooseModeComponent
    ],
    providers: [
    ],
    entryComponents: [
    ]
})

export class PlayModule {}
