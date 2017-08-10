import { Injectable } from '@angular/core';

@Injectable()
export class Dialogs {
    tutorialIntro(): string[] {
        return [
            `Welcome to Prestige! This tutorial will teach you all of the basics you will need to know to start your own story.
            First, we will go over some useful info. You can keep clicking next to continue through some hints.`,
            `In a battle, each team can have 1-7 heroes (depending on the location). Before each round of battle, you
            will select which ability you want each hero to use, as well as selecting a target for that ability (if applicable).`,
            `The order in which each hero gets to use their ability depends on their agility level. Each hero has a
            Health, Agility, Strength, and Magic level. You are able to control where stat points go when you level up.`,
            `Each hero also starts with a couple basic abilities. As that hero levels up, they will be able to learn more abilties
            (depending on their total level and stat levels). There are many types of abilities, including offensive (damage),
            defensive (healing), and utility (buffing).`,
            `Each ability has an energy cost. It will be displayed on the left of the ability list in parentheses. Each heroes
            current/max energy (E) and current/max health (H) will be displayed underneath their name on the battlefield.`,
            `For this tutorial, you will face a few different opponents. They will get progressively harder so that you can learn while you go.`,
            `You first battle will be a 1v1. You are controlling Zed, a deadly ninja. Your opponent is Bruiser, good luck!`
        ]
    }
}