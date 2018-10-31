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
  publicSpells: Array<firebase.database.DataSnapshot> = [];
  privateSpells: Array<firebase.database.DataSnapshot> = [];
  selectedSpell: firebase.database.DataSnapshot = null;
  selectedSpellType: string = undefined;
  GMStatus:boolean = false;
  editDisplay:boolean = false;
  shareMenuToggle: boolean = false;
  d: number
  c: number
  rolls : Array<number>;
  total : number;

  constructor() { }

  ngOnInit() {
  }

  privateButton() {
    this.isUserGM();
    this.privateToggle = !this.privateToggle;
    if (this.privateToggle) {
      this.fillPrivate()
    }
  }
  publicButton() {
    this.isUserGM();
    this.publicToggle = !this.publicToggle;
    if (this.publicToggle) {
      this.fillPublic()
    }
  }

  fillPrivate() {
    firebase.database().ref("spellcards/private/" + firebase.auth().currentUser.uid).on("value",
      function (snapshot) {
        this.privateSpells = [];
        snapshot.forEach(function (childsnap) {
          this.privateSpells.push(childsnap);
        }.bind(this))
      }.bind(this))
  }

  fillPublic() {
    firebase.database().ref("spellcards/public").on("value",
      function (snapshot) {
        this.publicSpells = [];
        snapshot.forEach(function (childsnap) {
          this.publicSpells.push(childsnap);
        }.bind(this))
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
  setSelectedItem(x: firebase.database.DataSnapshot) {
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
}
