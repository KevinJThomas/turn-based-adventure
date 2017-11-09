import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { PlayService } from '../play.service';

@Component({
    templateUrl: './hero-dialog.component.html',
    styleUrls: ['./hero-dialog.component.css']
})
export class HeroDialogComponent {
    hero: any;

    constructor(private dialogRef: MatDialogRef<HeroDialogComponent>) {}
}
