import { Injectable } from '@angular/core';

@Injectable()
export class Dialogs {
    // Tutorial
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
            `Each ability has an energy cost. It will be displayed on the right of the ability list in parentheses. Each heroes'
            current/max energy (E) and current/max health (H) will be displayed underneath their name on the battlefield.
            If you ever want more details on any of your heroes' abilities, you can click on their name to get a better description.`,
            `For this tutorial, you will face a few different opponents.
            They will get progressively harder so that you can learn while you go.`,
            `You first battle will be a 1v2. You are controlling Zed, a deadly ninja. Your opponents are Bruiser and Crusher,
            a few street thugs that have been getting a little too cocky. Teach them a lesson!`
        ]
    }

    tutorialFirstTurn(): string[] {
        return [
            `You've completed your first turn, good job! You'll notice you can see the energy and health that was lost from the heroes
            displayed under their nameplates.`,
            `Now keep up the fight against these thugs! I can see them getting weaker!`
        ]
    }

    tutorialStageTwo(): string[] {
        return [
            `Congratulations, you've defeated Bruiser and Crusher! That's your first win under your belt.`,
            `That was a good warmup, but now you will face a few more worthy opponents.
            You will now be matched with 3 evil witch triplets.`,
            `Don't worry! You're also getting a new member for your team: Mercy. Mercy isn't very aggresive, but she can use
            powerful spells to keep the rest of her team alive.`,
            `Beware of the witches curse ability. If it isn't cleansed, it can be deadly. Good luck!`
        ]
    }

    tutorialStageThree(): string[] {
        return [
            `You've made it to the third and final stage of the tutorial!
            Now that you have a few of the basics under your belt, you're going
            to be given a real fight!`,
            `Unfortunately for you, your team is against the infamous gods of the elements. These are the most difficult opponents you
            can possibly face, and this fight is totally unfair.`,
            `Thankfully for you, your team is comprised of the most successful heroes and legends in the world. Now all they need
            is a brilliant strategist to pilot them. Show these elemental gods what you can do!`
        ]
    }

    tutorialFinish(): string[] {
        return [
            `Wow! You made it through the whole tutorial! It looks like you are ready for a real battle!`,
            `Try recruting a team in story mode and see how strong you can become, or try a fight to the death in the arena! Good luck!`
        ]
    }

    // Burmi
    burmiIntro(): string[] {
        return [
            `Your name is Burmi. You're a young and aggresive dwarf who is looking to prove himself to the world. Your home, Ironforge, is far too boring
            to keep you here any longer.`,
            `It's time for a trip, no, an adventure. You're ready, and you head outside through the magnificent gates of Ironforge, unsure if you'll even return.`,
            `. . .`,
            `grrrrrrr`,
            `Be careful! There are wolves on the sides of the path, but they don't seem to be able to come on the path. You're a little scared of them,
            but you're Burmi of Ironforge; nothing can get to you.`,
            `Eventually you stumble across an old, abandoned log cabin. Since it's getting late, you decide maybe you'll head inside and rest`,
            `You slowly open the door, and you don't see anyone inside. Perfect! You could use a rest. Wait a minute, what is that noise from the corners. . .`,
            `You look around to see cat-sized rats coming out of the shadows. You're surrounded!`
        ];
    }
}
