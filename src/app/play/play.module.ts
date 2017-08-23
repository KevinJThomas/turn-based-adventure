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
    MdDialogModule,
    MdListModule,
    MdTooltipModule,
    MdProgressSpinnerModule,
    MdGridListModule
  } from '@angular/material';

import { NavComponent } from '../shared/navbar/navbar.component';
import { PlayComponent } from './play.component';
import { ChooseModeComponent } from './chooseMode/choose-mode.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { NewStoryComponent } from './newStory/new-story.component';
import { ContinueStoryComponent } from './continueStory/continue-story.component';
import { TheArenaComponent } from './theArena/the-arena.component';
import { PlayDialogComponent } from './playShared/playDialog/play-dialog.component';
import { HeroDialogComponent } from './playShared/heroDialog/hero-dialog.component';
import { CustomizeCharacterComponent } from './customizeCharacter/customize-character.component';
import { GameComponent } from './game/game.component';
import { StoryDetailsComponent } from './continueStory/storyDetails/story-details.component';
import { ScoreScreenComponent } from './scoreScreen/score-screen.component';

import { AppService } from '../shared/app.service';
import { PlayService } from './playShared/play.service';
import { Scenarios } from './playShared/play.scenarios';
import { Dialogs } from './playShared/play.dialogs';
import { Abilities } from './playShared/play.abilities';
import { TwoDigitPipe } from './playShared/two-digit.pipe';

const PlayRoutes: Routes = [
    {
        path: 'play',
        component: PlayComponent,
        children: [
            { path: '', component: ChooseModeComponent, canActivate: [AppService] },
            { path: 'new-story', component: NewStoryComponent, canActivate: [AppService] },
            { path: 'continue-story', component: ContinueStoryComponent, canActivate: [AppService] },
            { path: 'the-arena', component: TheArenaComponent, canActivate: [AppService] },
            { path: 'tutorial', component: TutorialComponent, canActivate: [AppService] },
            { path: 'customize/:hero', component: CustomizeCharacterComponent, canActivate: [AppService] },
            { path: 'game/:id', component: GameComponent, canActivate: [AppService] },
            { path: 'details/:id', component: StoryDetailsComponent, canActivate: [AppService] },
            { path: 'score-screen/:id', component: ScoreScreenComponent, canActivate: [AppService] }
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
        MdListModule,
        MdTooltipModule,
        MdProgressSpinnerModule,
        MdGridListModule,
        RouterModule.forChild(PlayRoutes)
    ],
    exports: [
        TwoDigitPipe,
        RouterModule,
        NavComponent
    ],
    declarations: [
        NavComponent,
        PlayComponent,
        ChooseModeComponent,
        TutorialComponent,
        NewStoryComponent,
        ContinueStoryComponent,
        TheArenaComponent,
        PlayDialogComponent,
        HeroDialogComponent,
        CustomizeCharacterComponent,
        GameComponent,
        StoryDetailsComponent,
        ScoreScreenComponent,
        TwoDigitPipe
    ],
    providers: [
        PlayService,
        Scenarios,
        Dialogs,
        Abilities
    ],
    entryComponents: [
        PlayDialogComponent,
        HeroDialogComponent
    ]
})

export class PlayModule {}
