import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { PlayService } from '../play.service';

@Component({
    templateUrl: './play-dialog.component.html',
    styleUrls: ['./play-dialog.component.css']
})
export class PlayDialogComponent implements OnInit {
    dialogPages: string[];
    displayText: string;
    pageIndex = 0;
    lastPage = false;
    firstPage = true;
    buttonsDisabled = false;

    constructor(private dialogRef: MatDialogRef<PlayDialogComponent>) {}

    ngOnInit() {
        this.writeText(this.dialogPages[0]);
    }

    async writeText(text: string) {
        this.buttonsDisabled = true;
        this.displayText = '';
        for (const char of text) {
            this.displayText += char;
            await this.sleep(0);
        }
        this.buttonsDisabled = false;
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    nextPage() {
        this.pageIndex++;
        this.firstPage = false;
        this.writeText(this.dialogPages[this.pageIndex]);
        if (this.pageIndex >= this.dialogPages.length - 1) {
            this.lastPage = true;
        }
    }

    previousPage() {
        this.pageIndex--;
        this.lastPage = false;
        this.writeText(this.dialogPages[this.pageIndex]);
        if (this.pageIndex === 0) {
            this.firstPage = true;
        }
    }
}
