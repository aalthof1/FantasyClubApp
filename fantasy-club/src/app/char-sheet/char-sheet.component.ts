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
  combat: boolean = false;
  result: number = 0;
  rawRoll: number = 0;
  modifier: number = 0;
  amount: number = 0;
  statData: ArrayLike<[string, number]>
  statValues: Array<number>;
  statNames: Array<string> = ["agi", "cmod", "com", "cse", "dp", "du", "eu", "gmod", "hea", "int", "lmod", "mmod", "move", "per", "pu", "pwr", "str", "wil"];
  combatStatNames: Array<string> = ["DP", "EU", "DU", "PU", "Combat Mod", "Missile Mod", "Grapple Mod", "Linear Mod", "STR", "INT", "PER", "CSE", "HEA", "AGI", "PWR", "COM", "WIL", "Movement"];
  combatStatValues: Array<number>;
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
  selectedTrap : number = -1
  abilityMenuToggle: boolean = false;
  noAbilityMessage: boolean = false;
  abilities: Array<firebase.database.DataSnapshot> = [];
  abilityInfo: Array<firebase.database.DataSnapshot> = [];
  selectedAbility : number = -1
  canSeeAnnouncement: boolean;


  constructor(private currentCharacter: CurrentCharService, private passService: PassGameService) {
    this.charSubscript = this.currentCharacter.get()
      .subscribe(snapshot => {
        this.view = false;
        this.edit = false;
        this.combat = false;
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
    if (this.combat == true) {
      this.combat = false;
    }
    this.edit = true;
    this.refreshStatsFromOnline();
  }

  viewActivate() {
    if (this.edit == true) {
      this.edit = false;
    }
    if (this.combat == true) {
      this.combat = false;
    }
    this.view = true;
    this.refreshStatsFromOnline();
  }

  combatActivate() {
    if (this.edit == true) {
      this.edit = false;
    }
    if (this.view == true) {
      this.view = false;
    }
    this.combat = true;
    this.refreshStatsFromOnline();
    //statNames: Array<string> = ["agi", "cmod", "com", "cse", "dp", "du", "eu", "gmod", "hea", "int", "lmod", "mmod", "move", "per", "pu", "pwr", "str", "wil"];
    //combatStatNames: Array<string> = ["dp", "eu", "du", "pu", "cmod", "mmod", "gmod", "lmod", "str", "int", "per", "cse", "hea", "agi", "pwr", "com", "wil", "move"];
    this.combatStatValues = this.statValues;
    var dp = this.statValues[4];
    var eu = this.statValues[6];
    var du = this.statValues[5];
    var pu = this.statValues[14];
    var cmod = this.statValues[1];
    var mmod = this.statValues[11];
    var gmod = this.statValues[7];
    var lmod = this.statValues[10];
    var str = this.statValues[16];
    var int = this.statValues[9];
    var per = this.statValues[13];
    var cse = this.statValues[3];
    var hea = this.statValues[8];
    var agi = this.statValues[0];
    var pwr = this.statValues[15];
    var com = this.statValues[2];
    var wil = this.statValues[17];
    var move = this.statValues[12];
    
    this.combatStatValues[0] = dp
    this.combatStatValues[1] = eu
    this.combatStatValues[2] = du
    this.combatStatValues[3] = pu
    this.combatStatValues[4] = cmod
    this.combatStatValues[5] = mmod
    this.combatStatValues[6] = gmod
    this.combatStatValues[7] = lmod
    this.combatStatValues[8] = str
    this.combatStatValues[9] = int
    this.combatStatValues[10] = per
    this.combatStatValues[11] = cse
    this.combatStatValues[12] = hea
    this.combatStatValues[13] = agi
    this.combatStatValues[14] = pwr
    this.combatStatValues[15] = com
    this.combatStatValues[16] = wil
    this.combatStatValues[17] = move
  }

  toHitRoller(input, textbox) {
    this.amount = parseInt((document.getElementById(textbox) as HTMLInputElement).value);
    this.modifier = input;
    this.rawRoll = (Math.floor(Math.random() * 20) + 1);
    this.result = this.rawRoll + input + this.amount;
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

  isUserInGame(){
    if(this.selectedGame.child("user_name").val() == firebase.auth().currentUser.displayName) {
      this.canSeeAnnouncement = true;
      return this.canSeeAnnouncement;
    }
    this.selectedGame.child("characters").ref.once("value").then(function(snapshot){
      this.canSeeAnnouncement = false;
      snapshot.forEach(function(child: firebase.database.DataSnapshot){
        if(child.val() == firebase.auth().currentUser.displayName) {
          this.canSeeAnnouncement = true;
        }
      }.bind(this));
    }.bind(this));
    return this.canSeeAnnouncement;
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

  showAbilities() {
    this.abilityMenuToggle = !this.abilityMenuToggle;
    this.abilities = []
    this.abilityInfo = []
    this.selectedAbility = -1
    this.noAbilityMessage = false

    if (this.abilityMenuToggle == false) {
      return;
    }
    if (this.selectedGame.hasChild("abilities")) {
      this.selectedGame.child("abilities").forEach(function (snapshot) {
        this.abilities.push(snapshot)
      }.bind(this))
    }
    else {
      this.noAbilityMessage = true;
    }
  }

  selectAbility(i: number) {
    if (i < 0 || i >= this.abilities.length) {
      this.selectedAbility = -1;
      return;
    }
    this.selectedAbility = i;
    firebase.database().ref("abilities/private/" + firebase.auth().currentUser.uid + "/" + this.abilities[i].key).once("value").then(function (snap) {
      snap.forEach(function (s) {
        this.abilityInfo.push(s)
        // console.log(s) 
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

    this.playerCharacters.forEach(c => {
      firebase.database().ref("archive/" + this.selectedGame.key + "/characters/" + c).set(0);
    });
    firebase.database().ref("archive/" + this.selectedGame.key + "/exp").set(x);
    firebase.database().ref("archive/" + this.selectedGame.key + "/desc/").set(this.selectedGame.child("desc").val())


    this.selectedGame.ref.remove()
    this.selectedGame = undefined;
  }
}