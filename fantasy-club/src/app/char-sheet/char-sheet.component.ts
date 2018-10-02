import { Component, OnInit } from '@angular/core';
import { CurrentCharService } from "../current-char.service";
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-char-sheet',
  templateUrl: './char-sheet.component.html',
  styleUrls: ['./char-sheet.component.css']
})
export class CharSheetComponent implements OnInit {
  selectedChar: firebase.database.DataSnapshot;
  subscription: Subscription;
  view: boolean = false;
  edit: boolean = false;
  statData: ArrayLike<[string, number]>
  statValues: Array<number>;
  statNames: Array<string> = ["agi", "cmod", "com", "cse", "dp", "du", "eu", "gmod", "hea", "int", "lmod", "mmod", "move", "per", "pu", "pwr", "str", "wil"];
  viewValues: Array<number>;

  constructor(private currentCharacter: CurrentCharService) {
    this.subscription = this.currentCharacter.get().subscribe(snapshot => (this.selectedChar = snapshot.data));
  }

  ngOnInit() { }

  print() {
    console.log(this.selectedChar.hasChildren());
  }
  editToggle() {
    if (this.view == true) {
      this.view = false;
    }
    this.edit = true;
  }

  viewToggle() {
    if (this.edit == true) {
      this.edit = false;
    }
    this.view = true;
    this.statValues = [];
    this.selectedChar.forEach((childSnapshot) => {
      this.statValues.push(childSnapshot.val())
    });
  }
}