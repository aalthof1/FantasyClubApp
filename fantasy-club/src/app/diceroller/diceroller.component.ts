import { Component, OnInit } from '@angular/core';
import { empty, EMPTY } from 'rxjs';

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
  constructor() { }

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
    this.total = this.total + this.mod;
        
  }
}
