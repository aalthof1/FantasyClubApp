import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CurrentCharService } from "../current-char.service";
import { PassGameService } from "../pass-game.service";
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';
import { _iterableDiffersFactory } from '@angular/core/src/application_module';

@Component({
  selector: 'app-char-sheet',
  templateUrl: './char-sheet.component.html',
  styleUrls: ['./char-sheet.component.css']
})

export class CharSheetComponent implements OnInit {
  @Output() refresh = new EventEmitter<string>();

  currentGameGM : boolean = false;
  selectedChar: firebase.database.DataSnapshot;
  selectedGame: firebase.database.DataSnapshot;
  charSubscript: Subscription;
  gameSubscript: Subscription;
  view: boolean = false;
  edit: boolean = false;
  statData: ArrayLike<[string, number]>
  statValues: Array<number>;
  statNames: Array<string> = ["agi", "cmod", "com", "cse", "dp", "du", "eu", "gmod", "hea", "int", "lmod", "mmod", "move", "per", "pu", "pwr", "str", "wil"];
  viewValues: Array<number>;
  submitValues: Array<number>;
  problem: boolean = false;
  GMDisplay: string = undefined;
  description: string = undefined;
  playerCharacters: Array<string> = [];

  constructor(private currentCharacter: CurrentCharService, private passService: PassGameService) {
    this.charSubscript = this.currentCharacter.get()
      .subscribe( snapshot => {
        this.view = false;
        this.edit = false;
        this.selectedChar = snapshot.data;
      });
    this.gameSubscript = this.passService.get()
      .subscribe(snapshot => {
        this.playerCharacters = [];
        this.GMDisplay = undefined;
        this.description = undefined;
        this.selectedGame = snapshot.data
      });
  }

  ngOnInit() { }

  refreshStatsFromOnline() {
    this.statValues = [];
    this.statNames.forEach(name => {
      this.statValues.push(this.selectedChar.child(name).val())
    });
  }

  editActivate() {
    if (this.view == true) {
      this.view = false;
    }
    this.edit = true;
    this.refreshStatsFromOnline();
  }

  viewActivate() {
    if (this.edit == true) {
      this.edit = false;
    }
    this.view = true;
    this.refreshStatsFromOnline();
  }

  submitChanges(): void {
    this.problem = false;
    console.log("testing submit button for now");
    this.submitValues = [];
    try {
      this.statNames.forEach(name => {
        let x: HTMLInputElement = document.getElementById(name + '-value') as HTMLInputElement;
        this.submitValues.push(
          parseInt(x.value)
        )
      })
      for (let z = 0; z < this.statNames.length; z++) {
        this.selectedChar.child(this.statNames[z]).ref.set(this.submitValues[z]);
      }
      this.implementChanges();
    } catch (e) {
      this.problem = true;
      console.log(e);
    }
  }

  implementChanges() {
    this.selectedChar = null;
    this.statValues = [];
    this.view = false;
    this.edit = false;
    this.refresh.emit("refresh");
  }

  printCharacters() {    
    if (firebase.auth().currentUser.uid == this.selectedGame.child("user_id").val() ) {
      this.currentGameGM = true;
    }
    else {
      this.currentGameGM = false;
    }
    this.playerCharacters = [];
    this.selectedGame.ref.once("value").then(function (snapshot) {
      this.selectedGame = snapshot;
    }.bind(this))
    this.selectedGame.child("characters/").forEach(child => {
      this.playerCharacters.push(child.key);
    })
  }
  printGM() {
    this.GMDisplay = this.selectedGame.child("user_name").val();
  }

  printDesc() {
    this.description = this.selectedGame.child("desc").val();
  }

  removeCharacterFromGame(i: number) {
    const x = this.playerCharacters[i]
    this.selectedGame.child("characters/").ref.once("value").then(function (snapshot) {
      if (snapshot.hasChild(x)) {
        this.selectedGame.child("characters/").child(x + "/").ref.remove();
        this.playerCharacters.splice(i, 1);
      }
    }.bind(this));
    this.printCharacters();
  }

  showCharacter(i : number) {
    firebase.database().ref().child("characters/").once("value").then(function (snapshot) {
      snapshot.forEach(function(childsnap) {
        childsnap.forEach(function(grandChild) {
          if (grandChild.key == this.playerCharacters[i]) {
            this.view = false;
            this.edit = false;    
            this.selectedChar = grandChild;
          }
        }.bind(this))
      }.bind(this))
    }.bind(this));    
  }
}