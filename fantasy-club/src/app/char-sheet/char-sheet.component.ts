import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CurrentCharService } from "../current-char.service";
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';
import { _iterableDiffersFactory } from '@angular/core/src/application_module';

@Component({
  selector: 'app-char-sheet',
  templateUrl: './char-sheet.component.html',
  styleUrls: ['./char-sheet.component.css']
})

export class CharSheetComponent implements OnInit {
  @Output() refresh = new EventEmitter<string>();

  selectedChar: firebase.database.DataSnapshot;
  subscription: Subscription;
  view: boolean = false;
  edit: boolean = false;
  statData: ArrayLike<[string, number]>
  statValues: Array<number>;
  statNames: Array<string> = ["agi", "cmod", "com", "cse", "dp", "du", "eu", "gmod", "hea", "int", "lmod", "mmod", "move", "per", "pu", "pwr", "str", "wil"];
  viewValues: Array<number>;
  submitValues: Array<number>;
  problem: boolean = false;

  constructor(private currentCharacter: CurrentCharService) {
    this.subscription = this.currentCharacter.get()
    .subscribe(snapshot => (this.selectedChar = snapshot.data));
  }

  ngOnInit() { }

  refreshStatsFromOnline() {
    this.statValues = [];
    this.statNames.forEach(name => {
      this.statValues.push(this.selectedChar.child(name).val())
    });
  }

  editActivate() {
    if (this.view == true) {
      this.view = false;
    }
    this.edit = true;
    this.refreshStatsFromOnline();
  }

  viewActivate() {
    if (this.edit == true) {
      this.edit = false;
    }
    this.view = true;
    this.refreshStatsFromOnline();
  }

  submitChanges(): void {
    this.problem = false;
    console.log("testing submit button for now");
    this.submitValues = [];
    try {
      this.statNames.forEach(name => {
        let x: HTMLInputElement = document.getElementById(name + '-value') as HTMLInputElement;
        this.submitValues.push(
          parseInt(x.value)
        )
      })
      for (let z = 0; z < this.statNames.length; z++) {
        this.selectedChar.child(this.statNames[z]).ref.set(this.submitValues[z]);
      }
      this.implementChanges();
    } catch (e) {
      this.problem = true;
      console.log(e);
    }
  }

  implementChanges() {

    this.selectedChar = null;
    this.statValues = [];
    this.view = false;
    this.edit = false;
    this.refresh.emit("refresh");
    
  }
  hide() {
    console.log("hide!")
    this.view = false;
    this.edit = false;
  }

  setCurrent() {
    console.log("set current button pushed")
  }
}