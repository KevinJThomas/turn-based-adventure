import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatListModule
} from '@angular/material';

import { AppComponent } from './start/app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './shared/navbar/navbar.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { OptionsComponent } from './options/options.component';
import { LearnArenaComponent } from './instructions/learnArena/learn-arena.component';
import { LearnStoryComponent } from './instructions/learnStory/learn-story.component';
import { AppRoutingModule } from './shared/app.routing';

import { AppService } from './shared/app.service';

import { PlayModule } from './play/play.module';

import * as firebase from 'firebase';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ErrorComponent,
    RegisterComponent,
    InstructionsComponent,
    LearnArenaComponent,
    LearnStoryComponent,
    OptionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatListModule,
    PlayModule,
    AppRoutingModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAaoRYuuX6t7jWX2TP9aG1EILyMllM_6HY',
      authDomain: 'turn-based-game-438f3.firebaseapp.com',
      databaseURL: 'https://turn-based-game-438f3.firebaseio.com',
      projectId: 'turn-based-game-438f3',
      storageBucket: '',
      messagingSenderId: '761647342612'
    });
  }
 }
