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

  constructor(private currentCharacter: CurrentCharService) {
    this.subscription = this.currentCharacter.get().subscribe(snapshot => (this.selectedChar = snapshot.data))
  }

  ngOnInit() {}

  print() {
    console.log(this.selectedChar.hasChildren());
  }
}
