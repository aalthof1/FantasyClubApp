import { Component, OnInit, Input } from '@angular/core'
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
  lastButton : number;
  tagName : String;
  typeDisplay : String;

  @Input() app: firebase.app.App;
  @Input() userId: string;

  constructor(private sidebar: SidebarComponent) {
    this.app = sidebar.app
    this.userId = sidebar.user_id
   }

  ngOnInit() {
    this.typeDisplay = "Roll";
    this.tagName = "Total";
  }

  DiceRoller() {
    this.typeDisplay = "Roll";
    this.tagName = "Total";
    this.lastButton = 0;
    this.amount = parseInt((document.getElementById("amount") as HTMLInputElement).value);
    this.type = parseInt((document.getElementById("type") as HTMLInputElement).value);
    this.mod = parseInt((document.getElementById("modifier") as HTMLInputElement).value);
    if((document.getElementById("amount") as HTMLInputElement).value == "" || parseInt((document.getElementById("amount") as HTMLInputElement).value) < 1) {
      this.amount = 1;
      (document.getElementById("amount") as HTMLInputElement).value = '1';
    }
    if(this.amount > 100) {
      this.amount = 100;
      (document.getElementById("amount") as HTMLInputElement).value = '100';
    }
    if((document.getElementById("type") as HTMLInputElement).value == "" || parseInt((document.getElementById("type") as HTMLInputElement).value) < 2) {
      this.type = 2;
      (document.getElementById("type") as HTMLInputElement).value = '2';
    }
    if((document.getElementById("modifier") as HTMLInputElement).value == "") {
      this.mod = 0;
      (document.getElementById("modifier") as HTMLInputElement).value = '0';
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
      var temp = _i+1;
      firebase.database().ref("dice_rolls/" + this.sidebar.user_name + "/" + temp).set(this.rolls[_i]);
    }

    this.total = this.total + this.mod;
    firebase.database().ref("dice_rolls/" + this.sidebar.user_name + "/mod").set(this.mod);
    firebase.database().ref("dice_rolls/" + this.sidebar.user_name + "/total").set(this.total);
    firebase.database().ref("dice_rolls/" + this.sidebar.user_name + "/type").set(this.type);
        
  }

  saveDiceRoll() {
    this.lastButton = 1;
    var amountText = (document.getElementById("amount") as HTMLInputElement).value;
    var typeText = (document.getElementById("type") as HTMLInputElement).value;
    var modText = (document.getElementById("modifier") as HTMLInputElement).value;
    if(amountText == "" || typeText == "" || modText == "") {
      alert("Please fill all options.");
      return;
    }else if (firebase.auth().currentUser == null) {
      alert("Please log in to save a dice combination.");
      return;
    }
    this.typeDisplay = "Roll";
    this.tagName = "Total";
    var amount = parseInt(amountText);
    var type = parseInt(typeText);
    var mod = parseInt(modText);
    var name = "";
    if(amount < 1 || amount > 100) {
      alert("Please enter valid amount in the range [1,100].");
      return;
    }
    else if (type < 2) {
      alert("Please enter valid type greater than 2.");
      return;
    }
    do {
      name = prompt("Please enter a non-empty name/description for this dice combination.\nNumber of dice = " + amount + ", Number of sides = " + type + ", modifier = " + mod);
    } while(name == "");
    firebase.database().ref("savedRolls/" + this.sidebar.user_name + "/" + name + "/amount").set(amount);
    firebase.database().ref("savedRolls/" + this.sidebar.user_name + "/" + name + "/type").set(type);
    firebase.database().ref("savedRolls/" + this.sidebar.user_name + "/" + name + "/mod").set(mod);
  }

  averageDiceRoll() {
    this.lastButton = 2;
    var amountText = (document.getElementById("amount") as HTMLInputElement).value;
    var typeText = (document.getElementById("type") as HTMLInputElement).value;
    var modText = (document.getElementById("modifier") as HTMLInputElement).value;
    if(amountText == "" || typeText == "") {
      alert("Please fill all options.");
      return;
    } else if (firebase.auth().currentUser == null) {
      alert("Please log in to use the features of the site.");
      return;
    } else if(modText == "") {
      modText = "0";
    }
    this.typeDisplay = "Percent to Roll";
    this.tagName = "Average";
    var amount = parseInt(amountText);
    var type = parseInt(typeText);
    var mod = parseInt(modText);
    if(amount < 1 || amount > 100) {
      alert("Please enter a valid amount in the range [1,100].");
      return;
    }
    else if (type < 2) {
      alert("Please enter a valid type greater than 2.");
      return;
    }
    var average : number;
    var modAverage : number;
    average = amount * (type + 1) / 2;
    var printString : String;
    printString = "The unmodified average of " + amount + ", " + type + "-sided dice is " + average +".";
    if(mod > 0) {
      modAverage = average + mod;
      printString +=  "With the modifier, it is " + modAverage + ".";
    }
    alert(printString);
  }
}
