import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './new-story.component.html',
    styleUrls: ['./new-story.component.css']
})
export class NewStoryComponent {
    warriorUrl = '../../assets/dwarf_warrior.jpg';
    rangerUrl = '../../assets/human_ranger2.jpg';
    warlockUrl = '../../assets/human_warlock.jpg';
}
