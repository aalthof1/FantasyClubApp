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
  m : number;

  @Input() app: firebase.app.App;
  @Input() userId: string;
  @Input() savedRolls: Array<string>;

  constructor(private sidebar: SidebarComponent) {
    this.app = sidebar.app
    this.userId = sidebar.user_id
    this.savedRolls = sidebar.savedRolls
   }

  ngOnInit() {
    this.typeDisplay = "Roll";
    this.tagName = "Total";
  }

  DiceRoller() {
    this.typeDisplay = "Roll";
    this.tagName = "Total";
    this.lastButton = 0;
    this.m = 0;
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
    this.m = 0;
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
    this.savedRolls.push(name);
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

    var percentages = [(type-1)*(amount-1) + type];
    var index = 0;
    for(; index < (type-1)*(amount-1) + type; index++) {
      percentages[index] = 0;
    }
    var numTotal = 0;
    if(amount < 4) {
      var i = 1;
      for(; i <= type; i++) {
        var j = 1;
        if(amount > 1) {
          for(; j <= type; j++) {
            var k = 1;
            if(amount > 2) {
              for(; k <= type; k++) {
                percentages[i+j+k-3]++;
                numTotal++;
              }
            }
            else {
              percentages[i+j-2]++;
              numTotal++;
            }
          }
        }
        else {
          percentages[i-1]++;
          numTotal++;
        }
      }
      var l = 0;
      for(l = 0; l < percentages.length; l++) {
        percentages[l] = percentages[l] / numTotal * 100;
      }
    }    
    else {
      var numRuns = 0;
      for(; numRuns < 100000; numRuns++) {
        var sum : number;
        sum = 0;
        var i = 0;
        for(; i < amount; i++) {
          sum += Math.floor(Math.random() * type) + 1;
        }
        percentages[sum-amount]++;
      }
      for(i = 0; i < percentages.length; i++) {
        percentages[i] /= 1000;
      }
    }
    this.rolls = percentages;
    this.total = average;
    this.m = amount;
  }

  compareAgainst() {
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
    var name : string;

    do {
       name = prompt("Please enter the value you would like to roll greater than or equal to.\n Amount to roll = " + amount + ", Number of sides = " + type + ", modifier = " + mod);
    } while(name == "");

    var toBeat = parseInt(name);
    var percentages = [(type-1)*(amount-1) + type];
    var index = 0;
    for(; index < (type-1)*(amount-1) + type; index++) {
      percentages[index] = 0;
    }
    var numTotal = 0;
    if(amount < 4) {
      var i = 1;
      for(; i <= type; i++) {
        var j = 1;
        if(amount > 1) {
          for(; j <= type; j++) {
            var k = 1;
            if(amount > 2) {
              for(; k <= type; k++) {
                percentages[i+j+k-3]++;
                numTotal++;
              }
            }
            else {
              percentages[i+j-2]++;
              numTotal++;
            }
          }
        }
        else {
          percentages[i-1]++;
          numTotal++;
        }
      }
      var l = 0;
      for(l = 0; l < percentages.length; l++) {
        percentages[l] = percentages[l] / numTotal * 100;
      }
    }    
    else {
      var numRuns = 0;
      for(; numRuns < 100000; numRuns++) {
        var sum : number;
        sum = 0;
        var i = 0;
        for(; i < amount; i++) {
          sum += Math.floor(Math.random() * type) + 1;
        }
        percentages[sum-amount]++;
      }
      for(i = 0; i < percentages.length; i++) {
        percentages[i] /= 1000;
      }
    }
    var toPrint : number = 0;
    var index2 = toBeat - mod - amount;
    for(; index2 < percentages.length; index2++) {
      toPrint += percentages[index2];
    }

    var printString : String;
    printString = "The chance of rolling at least " + toBeat + " with " + amount + ", " + type + "-sided dice with a modifier of " + mod + " is " + toPrint +".";
    alert(printString);
  }
  
  fillFromSaved(item: string) {
    if(item == "-- Please Select An Option --") {
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

  deleteCombination() {
    var name = (document.getElementById("savedRollSelect") as HTMLInputElement).value;
    if(name == "-- Please Select An Option --") {
      return;
    }
    this.savedRolls.splice(this.savedRolls.indexOf(name),1);
    firebase.database().ref("savedRolls/" + this.sidebar.user_name + "/" + name).remove();
    this.clearAll();
  }

}
