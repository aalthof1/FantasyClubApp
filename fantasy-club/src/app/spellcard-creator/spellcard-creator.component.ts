import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-spellcard-creator',
  templateUrl: './spellcard-creator.component.html',
  styleUrls: ['./spellcard-creator.component.css']
})
export class SpellcardCreatorComponent implements OnInit {

  @Input() userId;
  @Input() app;
  @Output() refresh = new EventEmitter<string>();
  name: string;
  desc: string;
  public: string;
  snapshot: firebase.database.DataSnapshot;
  diceAmount: number;
  diceType: number;

  constructor(private sidebar: SidebarComponent) {
    this.userId = sidebar.user_id
    this.app = firebase.app;
  }

  ngOnInit() {
  }

  isUserGM() {
    if (this.sidebar.user_priv >= 2) {
      return true;
    }
    return false;
  }

  isUserLogged() {
    if (this.sidebar.user_id != "") {
      return true;
    }
    return false;
  }

  createPrivateSpell() {
    this.name = ((document.getElementById("spellName") as HTMLInputElement).value);
    this.desc = ((document.getElementById("spellDesc") as HTMLInputElement).value);
    if (this.name == "" || this.desc == "") {
      return;
    }
    this.diceAmount = parseInt((document.getElementById("spellDiceAmount") as HTMLInputElement).value);
    this.diceType = parseInt((document.getElementById("spellDiceType") as HTMLInputElement).value);
    if((document.getElementById("spellDiceAmount") as HTMLInputElement).value == "" || parseInt((document.getElementById("spellDiceAmount") as HTMLInputElement).value) < 1) {
      this.diceAmount = -1;
    }
    if(this.diceAmount > 100) {
      this.diceAmount = 100;
    }
    if((document.getElementById("spellDiceType") as HTMLInputElement).value == "" || parseInt((document.getElementById("spellDiceType") as HTMLInputElement).value) < 2) {
      this.diceType = 2;
    }
    firebase.database().ref('spellcards/private/' + firebase.auth().currentUser.displayName + "/" + this.name).set(
      {
        creatorID: firebase.auth().currentUser.uid,
        creatorName: firebase.auth().currentUser.displayName,
        desc: this.desc,
        diceAmount : this.diceAmount,
        diceType: this.diceType
      }
    )
  }

  createPublicSpell() {
    this.name = ((document.getElementById("spellName") as HTMLInputElement).value);
    this.desc = ((document.getElementById("spellDesc") as HTMLInputElement).value);
    this.diceAmount = parseInt((document.getElementById("spellDiceAmount") as HTMLInputElement).value);
    this.diceType = parseInt((document.getElementById("spellDiceType") as HTMLInputElement).value);
    if((document.getElementById("spellDiceAmount") as HTMLInputElement).value == "" || parseInt((document.getElementById("spellDiceAmount") as HTMLInputElement).value) < 1) {
      this.diceAmount = -1;
    }
    if(this.diceAmount > 100) {
      this.diceAmount = 100;
    }
    if((document.getElementById("spellDiceType") as HTMLInputElement).value == "" || parseInt((document.getElementById("spellDiceType") as HTMLInputElement).value) < 2) {
      this.diceType = 2;
    }
    firebase.database().ref('spellcards/public/' + this.name + "/").set(
      {
        creatorName: firebase.auth().currentUser.displayName,
        creatorID: firebase.auth().currentUser.uid,
        desc: this.desc,
        diceAmount : this.diceAmount,
        diceType: this.diceType
      }
    )
  }

}
