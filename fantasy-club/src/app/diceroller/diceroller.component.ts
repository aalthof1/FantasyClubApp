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

  @Input() app: firebase.app.App;
  @Input() userId: string;
  @Input() savedRolls: Array<string>;

  constructor(private sidebar: SidebarComponent) {
    this.app = sidebar.app
    this.userId = sidebar.user_id
    this.savedRolls = sidebar.savedRolls
   }

  ngOnInit() {
  }

  DiceRoller() {
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
    var amountText = (document.getElementById("amount") as HTMLInputElement).value;
    var typeText = (document.getElementById("type") as HTMLInputElement).value;
    var modText = (document.getElementById("modifier") as HTMLInputElement).value;
    if(amountText == "" || typeText == "" || modText == "") {
      alert("Please fill all options.");
      return;
    } else if (firebase.auth().currentUser == null) {
      alert("Please log in to save a dice combination.");
      return;
    }
    var amount = parseInt(amountText);
    var type = parseInt(typeText);
    var mod = parseInt(modText);
    var name = "";
    do {
      name = prompt("Please enter a non-empty name/description for this dice combination.\nNumber of dice = " + amount + ", Number of sides = " + type + ", modifier = " + mod);
    } while(name == "");
    firebase.database().ref("savedRolls/" + this.sidebar.user_name + "/" + name + "/amount").set(amount);
    firebase.database().ref("savedRolls/" + this.sidebar.user_name + "/" + name + "/type").set(type);
    firebase.database().ref("savedRolls/" + this.sidebar.user_name + "/" + name + "/mod").set(mod);
  }

  fillFromSaved(item: string) {
    if(item == "-- Please Select An Option --") {
      alert("here");
      this.clearAll();
      return;
    }
    firebase.database().ref("savedRolls/" + this.sidebar.user_name + "/" + item).once("value")
      .then(function(snapshot : firebase.database.DataSnapshot){
        (document.getElementById("amount") as HTMLInputElement).value = snapshot.child("amount").val();
        (document.getElementById("type") as HTMLInputElement).value = snapshot.child("type").val();
        (document.getElementById("modifier") as HTMLInputElement).value = snapshot.child("mod").val();
      }.bind(this));
  }

  clearAll() {
    (document.getElementById("amount") as HTMLInputElement).value = "";
    (document.getElementById("type") as HTMLInputElement).value = "";
    (document.getElementById("modifier") as HTMLInputElement).value = "";
  }

}
