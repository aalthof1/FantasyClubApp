import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-trap-creator',
  templateUrl: './trap-creator.component.html',
  styleUrls: ['./trap-creator.component.css']
})
export class TrapCreatorComponent implements OnInit {

  @Input() userId;
  @Input() app;
  @Output() refresh = new EventEmitter<string>();
  name: string;
  desc: string;
  diceType: number;
  diceAmount: number;
  public: string;
  traps: Array<string> = [];
  snapshot: firebase.database.DataSnapshot;
  
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

  createTrap() {
    this.name = ((document.getElementById("trapName") as HTMLInputElement).value);
    this.desc = ((document.getElementById("trapDesc") as HTMLInputElement).value);
    this.diceAmount = parseInt((document.getElementById("diceAmount") as HTMLInputElement).value);
    this.diceType = parseInt((document.getElementById("diceType") as HTMLInputElement).value);
    firebase.database().ref('traps/' + this.sidebar.user_id + "/" + this.name + "/").set(
      {
        creatorName: firebase.auth().currentUser.displayName,
        creatorID: firebase.auth().currentUser.uid,
        desc: this.desc,
        diceAmount: this.diceAmount,
        diceType: this.diceType

      }
    )
  }

}
