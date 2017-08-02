import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule,
  MdInputModule,
  MdCardModule,
  MdToolbarModule
} from '@angular/material';

import { AppComponent } from './start/app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './shared/app.routing';

import { AppService } from './shared/app.service';

import * as firebase from 'firebase';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ErrorComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdToolbarModule,
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
