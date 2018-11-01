import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-item-creator',
  templateUrl: './item-creator.component.html',
  styleUrls: ['./item-creator.component.css']
})
export class ItemCreatorComponent implements OnInit {

  @Input() userId;
  @Input() app;
  @Output() refresh = new EventEmitter<string>();
  name: string;
  desc: string;
  public: string;
  items: Array<string> = [];
  snapshot: firebase.database.DataSnapshot;
  diceAmount: number;
  diceType: number;
  stat: string;
  bonus: string;

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
  
  createPrivateItem() {
    this.name = ((document.getElementById("itemName") as HTMLInputElement).value);
    this.desc = ((document.getElementById("itemDesc") as HTMLInputElement).value);

    if((document.getElementById("itemStatBonus") as HTMLInputElement).value != "" && (document.getElementById("itemStat") as HTMLInputElement).value != "") {
      this.stat = ((document.getElementById("itemStat") as HTMLInputElement).value);
      this.bonus = ((document.getElementById("itemStatBonus") as HTMLInputElement).value);
    } else {
      this.stat = "";
      this.bonus = "";
    }
    if (this.name == "" || this.desc == "") {
      return;
    }
    this.diceAmount = parseInt((document.getElementById("itemDiceAmount") as HTMLInputElement).value);
    this.diceType = parseInt((document.getElementById("itemDiceType") as HTMLInputElement).value);
    if((document.getElementById("itemDiceAmount") as HTMLInputElement).value == "" || parseInt((document.getElementById("itemDiceAmount") as HTMLInputElement).value) < 1) {
      this.diceAmount = -1;
    }
    if(this.diceAmount > 100) {
      this.diceAmount = 100;
    }
    if((document.getElementById("itemDiceType") as HTMLInputElement).value == "" || parseInt((document.getElementById("itemDiceType") as HTMLInputElement).value) < 2) {
      this.diceType = 2;
    }
    firebase.database().ref('items/private/' + this.sidebar.user_id + "/" + this.name).set(
      {
        creatorID: firebase.auth().currentUser.uid,
        creatorName: firebase.auth().currentUser.displayName,
        desc: this.desc,
        diceAmount : this.diceAmount,
        diceType: this.diceType,
        stat: this.stat,
        bonus: this.bonus
      }
    )
  }

  createPublicItem() {
    this.name = ((document.getElementById("itemName") as HTMLInputElement).value);
    this.desc = ((document.getElementById("itemDesc") as HTMLInputElement).value);
    if((document.getElementById("itemStatBonus") as HTMLInputElement).value != "" && (document.getElementById("itemStat") as HTMLInputElement).value != "") {
      this.stat = ((document.getElementById("itemStat") as HTMLInputElement).value);
      this.bonus = ((document.getElementById("itemStatBonus") as HTMLInputElement).value);
    } else {
      this.stat = "";
      this.bonus = "";
    }
    this.diceAmount = parseInt((document.getElementById("itemDiceAmount") as HTMLInputElement).value);
    this.diceType = parseInt((document.getElementById("itemDiceType") as HTMLInputElement).value);
    if((document.getElementById("itemDiceAmount") as HTMLInputElement).value == "" || parseInt((document.getElementById("itemDiceAmount") as HTMLInputElement).value) < 1) {
      this.diceAmount = -1;
    }
    if(this.diceAmount > 100) {
      this.diceAmount = 100;
    }
    if((document.getElementById("itemDiceType") as HTMLInputElement).value == "" || parseInt((document.getElementById("itemDiceType") as HTMLInputElement).value) < 2) {
      this.diceType = 2;
    }
    firebase.database().ref('items/public/' + this.name + "/").set(
      {
        creatorName: firebase.auth().currentUser.displayName,
        creatorID: firebase.auth().currentUser.uid,
        desc: this.desc,
        diceAmount : this.diceAmount,
        diceType: this.diceType,
        stat: this.stat,
        bonus: this.bonus
      }
    )
  }

}
