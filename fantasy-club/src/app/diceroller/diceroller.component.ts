import { Component, OnInit, Input } from '@angular/core';
import { empty, EMPTY } from 'rxjs';
import { SidebarComponent } from '../sidebar/sidebar.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-diceroller',
  templateUrl: './diceroller.component.html',
  styleUrls: ['./diceroller.component.css']
})
export class DicerollerComponent implements OnInit {

  amount : number;
  type : number;
  mod : number;
  rolls : Array<number>;
  total : number;

  @Input() app: firebase.app.App;
  @Input() userId: string;

  constructor(private sidebar: SidebarComponent) {
    this.app = sidebar.app
    this.userId = sidebar.user_id
   }

  ngOnInit() {
  }

  DiceRoller() {
    this.amount = parseInt((document.getElementById("amount") as HTMLInputElement).value);
    this.type = parseInt((document.getElementById("type") as HTMLInputElement).value);
    this.mod = parseInt((document.getElementById("modifier") as HTMLInputElement).value);
    if((document.getElementById("amount") as HTMLInputElement).value == "") {
      this.amount = 0;
    }
    if((document.getElementById("type") as HTMLInputElement).value == "") {
      this.type = 0;
    }
    if((document.getElementById("modifier") as HTMLInputElement).value == "") {
      this.mod = 0;
    }
    var i = 0;
    this.rolls = [this.amount];
    this.total = 0;
    for(i = 0; i < this.amount; i++) {
      var result = Math.floor(Math.random() * this.type) + 1;
      this.rolls[i] = result;
      this.total = this.total + result;
    }

    if(this.sidebar.user_id == "") return;

    firebase.database().ref("dice_rolls/" + this.sidebar.user_name).remove();
    for (var _i = 0; _i < this.rolls.length; _i++) {
      firebase.database().ref("dice_rolls/" + this.sidebar.user_name + "/" + _i).set(this.rolls[_i]);
    }

    this.total = this.total + this.mod;
    firebase.database().ref("dice_rolls/" + this.sidebar.user_name + "/mod").set(this.mod);
    firebase.database().ref("dice_rolls/" + this.sidebar.user_name + "/total").set(this.total);
    firebase.database().ref("dice_rolls/" + this.sidebar.user_name + "/type").set(this.type);
        
  }
}
