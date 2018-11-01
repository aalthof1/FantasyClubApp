import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-spellcard-list',
  templateUrl: './spellcard-list.component.html',
  styleUrls: ['./spellcard-list.component.css']
})
export class SpellcardListComponent implements OnInit {

  privateToggle: boolean = false;
  publicToggle: boolean = false;
  charToggle: boolean = false;
  publicSpells: Array<firebase.database.DataSnapshot> = [];
  privateSpells: Array<firebase.database.DataSnapshot> = [];
  charSpells: Array<firebase.database.DataSnapshot> = [];
  selectedSpell: firebase.database.DataSnapshot = null;
  selectedSpellType: string = undefined;
  GMStatus: boolean = false;
  editDisplay: boolean = false;
  shareMenuToggle: boolean = false;
  currChar: string;
  d: number
  c: number
  rolls: Array<number>;
  total: number;
  statComp: string = "";

  constructor() { }

  ngOnInit() {
  }

  privateButton() {
    this.privateToggle = !this.privateToggle;
    if (this.privateToggle) {
      this.fillPrivate()
    }
  }
  publicButton() {
    this.publicToggle = !this.publicToggle;
    if (this.publicToggle) {
      this.fillPublic()
    }
  }

  charButton() {
    this.charToggle = !this.charToggle;
    if (this.charToggle) {
      this.fillChar()
    }
  }

  fillPrivate() {
    this.statComp = ""
    firebase.database().ref("spellcards/private/" + firebase.auth().currentUser.uid).on("value",
      function (snapshot) {
        this.privateSpells = [];
        snapshot.forEach(function (childsnap) {
          this.privateSpells.push(childsnap);
        }.bind(this))
      }.bind(this))
  }

  fillPublic() {
    this.statComp = ""
    firebase.database().ref("spellcards/public").on("value",
      function (snapshot) {
        this.publicSpells = [];
        snapshot.forEach(function (childsnap) {
          this.publicSpells.push(childsnap);
        }.bind(this))
      }.bind(this))
  }

  fillChar() {
    this.statComp = ""
    firebase.database().ref("user_id/" + firebase.auth().currentUser.uid + "/current_character").on("value", function (snapshot) {
      this.currChar = snapshot.val()
      if (this.currChar != "") {
        firebase.database().ref("characters/" + firebase.auth().currentUser.uid + "/" + this.currChar + "/spellcards/").on("value",
          function (snapshot) {
            this.charSpells = [];
            snapshot.forEach(function (childsnap) {
              this.charSpells.push(childsnap);
            }.bind(this))
          }.bind(this))
      }
    }.bind(this))

  }

  isUserGM(): boolean {
    if (firebase.auth().currentUser == null) {
      this.GMStatus = false;
      return false;
    }
    firebase.database().ref("user_id/" + firebase.auth().currentUser.uid + "/priv").once("value")
      .then(function (snapshot) {
        if (snapshot.val() >= 2) {
          this.GMStatus = true;
          return true;
        }
        else {
          this.GMStatus = false;
          return false;
        }
      }.bind(this))
  }
  setSelectedSpell(x: firebase.database.DataSnapshot) {
    this.statComp = ""
    this.selectedSpell = x;
    if (this.selectedSpell != undefined) {
      if (this.selectedSpell.ref.parent.parent.key == "private") {
        this.selectedSpellType = "private";
      }
      else {
        this.selectedSpellType = "public";
      }
    }
    else {
      this.selectedSpellType = undefined;
    }

  }

  displayEditor() {
    if (firebase.auth().currentUser == null) {
      return;
    }
    this.editDisplay = true;
  }

  updateSpell() {
    let x: HTMLInputElement = document.getElementById("SpellNameInput") as HTMLInputElement;
    let y: HTMLTextAreaElement = document.getElementById("SpellDescription") as HTMLTextAreaElement;

    if (x.value == "" || y.value == "") {
      return;
    }
    //committed to updating the Spell
    let cID = this.selectedSpell.child("creatorID").val();
    let cName = this.selectedSpell.child("creatorName").val();
    this.selectedSpell.ref.remove();

    this.d = parseInt((document.getElementById("diceAmount3") as HTMLInputElement).value);
    this.c = parseInt((document.getElementById("diceType3") as HTMLInputElement).value);

    if ((document.getElementById("diceAmount3") as HTMLInputElement).value == "" || parseInt((document.getElementById("diceAmount3") as HTMLInputElement).value) < 1) {
      this.d = 1;
    }
    if (this.d > 100) {
      this.d = 100;
    }
    if ((document.getElementById("diceType3") as HTMLInputElement).value == "" || parseInt((document.getElementById("diceType3") as HTMLInputElement).value) < 2) {
      this.c = 2;
    }

    firebase.database().ref("spellcards/private/" + firebase.auth().currentUser.uid + "/" + x.value).set(
      {
        creatorName: cName,
        desc: y.value,
        diceAmount: this.d,
        diceType: this.c
      }
    )


    this.setSelectedSpell(undefined);
    this.editDisplay = false;
  }
  removeSpell(x: firebase.database.DataSnapshot) {
    x.ref.remove()
  }

  setCharSpell() {
    if (this.currChar != "") {
      let cName = this.selectedSpell.child("creatorName").val();
      let descr = this.selectedSpell.child("desc").val();
      let dA = this.selectedSpell.child("diceAmount").val();
      let dT = this.selectedSpell.child("diceType").val();

      firebase.database().ref("characters/" + firebase.auth().currentUser.uid + "/" + this.currChar + "/spellcards/" + this.selectedSpell.key).set(
        {
          creatorName: cName,
          desc: descr,
          diceAmount: dA,
          diceType: dT
        }
      )
    }
  }

  rollSpell() {
    this.statComp = ""
    var amount = this.selectedSpell.child('diceAmount').val()
    var type = this.selectedSpell.child('diceType').val()
    if (amount == -1) {
      amount = parseInt((document.getElementById("varDiceAmount") as HTMLInputElement).value);
      if ((document.getElementById("varDiceAmount") as HTMLInputElement).value == "" || parseInt((document.getElementById("varDiceAmount") as HTMLInputElement).value) < 1) {
        amount = 1;
      }
    }

    var i = 0;
    this.rolls = [amount];
    this.total = 0;
    for (i = 0; i < amount; i++) {
      var result = Math.floor(Math.random() * type) + 1;
      this.rolls[i] = result;
      this.total = this.total + result;
    }
  }

  statCompare() {
    var amount = this.selectedSpell.child('diceAmount').val()
    var type = this.selectedSpell.child('diceType').val()
    if (amount == -1) {
      amount = parseInt((document.getElementById("varDiceAmount") as HTMLInputElement).value);
      if ((document.getElementById("varDiceAmount") as HTMLInputElement).value == "" || parseInt((document.getElementById("varDiceAmount") as HTMLInputElement).value) < 1) {
        amount = 1;
      }
    }
    var stat = document.getElementById("stat") as HTMLInputElement
    if(stat.value == "") {
      this.statComp = "Please enter a stat"
      return;
    }
    var i = 0;
    this.rolls = [amount];
    this.total = 0;
    for (i = 0; i < amount; i++) {
      var result = Math.floor(Math.random() * type) + 1;
      this.rolls[i] = result;
      this.total = this.total + result;
    }
    var statAmount;
    firebase.database().ref("user_id/" + firebase.auth().currentUser.uid + "/current_character").on("value", function (snapshot) {
      this.currChar = snapshot.val()
      if (this.currChar != "") {
        firebase.database().ref("characters/" + firebase.auth().currentUser.uid + "/" + this.currChar + "/" + stat.value).once("value")
          .then(function (snapshot) {
            statAmount = snapshot.val()
            if (!snapshot.exists()) {
              this.statComp = "Please input an actual stat"
              return;
            }
            if (statAmount < this.total) {
              this.statComp = "FAIL"
            }
            else {
              this.statComp = "SUCCESS"
            }
          }.bind(this))
      }
    }.bind(this))

  }

}
