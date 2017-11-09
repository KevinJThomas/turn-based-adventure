import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { AppService } from '../../../shared/app.service';

@Component({
    templateUrl: './map-dialog.component.html',
    styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent {
    gameId: string;

    constructor(private dialogRef: MdDialogRef<MapDialogComponent>, private appSVC: AppService) {}
}
