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

  currentGameGM: boolean = false;
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
  capacity: number = undefined;
  gamePlayerCountView: boolean = false;
  playerCount: number = 0;
  hasAnnouncement: boolean = false;
  currentAnnouncement: string;
  trapMenuToggle: boolean = false;
  noTrapMessage: boolean = false;
  traps: Array<firebase.database.DataSnapshot> = [];
  trapInfo: Array<firebase.database.DataSnapshot> = [];
  selectedTrap: number = -1


  constructor(private currentCharacter: CurrentCharService, private passService: PassGameService) {
    this.charSubscript = this.currentCharacter.get()
      .subscribe(snapshot => {
        this.view = false;
        this.edit = false;
        this.selectedChar = snapshot.data;
      });
    this.gameSubscript = this.passService.get()
      .subscribe(snapshot => {
        this.playerCount = 0;
        this.gamePlayerCountView = false;
        this.capacity = undefined;
        this.playerCharacters = [];
        this.GMDisplay = undefined;
        this.description = undefined;
        this.selectedGame = snapshot.data
        this.currentAnnouncement = this.selectedGame.child("announcement").val();
        this.selectedGame.child("announcement").ref.on("value", function (snap) {
          this.currentAnnouncement = snap.val();
          if (snap.val() == "") {
            this.hasAnnouncement = false;
          } else {
            this.hasAnnouncement = true;
          }
        }.bind(this));
        if (this.currentAnnouncement == "" || this.currentAnnouncement == null) {
          this.hasAnnouncement = false;
        } else {
          this.hasAnnouncement = true;
        }
        if (firebase.auth().currentUser.uid == this.selectedGame.child("user_id").val()) {
          this.currentGameGM = true;
        }
        else {
          this.currentGameGM = false;
        }
        this.getCapacity();
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
        this.playerCount--;
      }
      this.printCharacters();
      this.refresh.emit("refresh")
    }.bind(this));
  }

  showCharacter(i: number) {
    firebase.database().ref().child("characters/").once("value").then(function (snapshot) {
      snapshot.forEach(function (childsnap) {
        childsnap.forEach(function (grandChild) {
          if (grandChild.key == this.playerCharacters[i]) {
            this.view = false;
            this.edit = false;
            this.selectedChar = grandChild;
          }
        }.bind(this))
      }.bind(this))
    }.bind(this));
  }


  getCapacity(): void {
    if (this.selectedGame.hasChild("capacityLimit")) {
      this.capacity = this.selectedGame.child("capacityLimit").val();
    }
    if (this.selectedGame.child("characters").hasChildren()) {
      this.playerCount = this.selectedGame.child("characters").numChildren();
    }
    else {
      this.playerCount = 0;
    }
    this.gamePlayerCountView = true;
  }

  changeAnnouncement() {
    var newAnnouncement: string = (document.getElementById("new-announcement") as HTMLInputElement).value;
    this.selectedGame.child("announcement").ref.set(newAnnouncement);
  }

  showTraps() {
    this.trapMenuToggle = !this.trapMenuToggle;
    this.traps = []
    this.trapInfo = []
    this.selectedTrap = -1
    this.noTrapMessage = false

    if (this.trapMenuToggle == false) {
      return;
    }
    if (this.selectedGame.hasChild("traps")) {
      this.selectedGame.child("traps").forEach(function (snapshot) {
        this.traps.push(snapshot)
      }.bind(this))
    }
    else {
      this.noTrapMessage = true;
    }
  }
  selectTrap(i: number) {
    if (i < 0 || i >= this.traps.length) {
      this.selectedTrap = -1;
      return;
    }
    this.selectedTrap = i;
    firebase.database().ref("traps/" + firebase.auth().currentUser.uid + "/" + this.traps[i].key).once("value").then(function (snap) {
      snap.forEach(function (s) {
        this.trapInfo.push(s)
      }.bind(this))
    }.bind(this))
  }
  endGame() {
    let x: number = parseInt((document.getElementById("xp") as HTMLInputElement).value)
    if (x == undefined || x < 0) {
      return;
    }
    this.printCharacters()
    this.selectedGame.child("characters").forEach(function (snapshot) {
      firebase.database().ref("user_id").once("value").then(function (snap) { //user name
        snap.forEach(function (slip) { //snap is a user_id
          if (slip.child("name").val() == snapshot.val()) {
            firebase.database().ref("characters/" + slip.key + "/" + snapshot.key + "/").once("value").then(function (slap) {
              if (slap.hasChild("exp")) {
                let total: number = parseInt(slap.child("exp").val())
                total = +total + +x;
                slap.child("exp").ref.set(total)
              }
              else {
                slap.child("exp").ref.set(x);
              }
            })
          }
        }.bind(this))
      }.bind(this))
    }.bind(this))

    console.log(this.playerCharacters)
    this.playerCharacters.forEach(c => {
      firebase.database().ref("archive/" + this.selectedGame.key + "/characters/" + c).set(0);
    });
    firebase.database().ref("archive/" + this.selectedGame.key + "/exp").set(x);
    firebase.database().ref("archive/" + this.selectedGame.key + "/desc/").set(this.selectedGame.child("desc").val())


    this.selectedGame.ref.remove()
    this.selectedGame = undefined;
  }
}