import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-npc-creator',
  templateUrl: './npc-creator.component.html',
  styleUrls: ['./npc-creator.component.css']
})
export class NpcCreatorComponent implements OnInit {

  @Input() userId;
  @Input() app;
  name: string;
  desc: string;

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

  isUserLogged() {
    if (this.sidebar.user_id != "") {
      return true;
    }
    return false;
  }

  createNPC() {
    this.name = ((document.getElementById("NPCname") as HTMLInputElement).value);
    this.desc = ((document.getElementById("NPCdesc") as HTMLInputElement).value);
    firebase.database().ref('NPCs/' + firebase.auth().currentUser.uid + "/" + this.name).set(
      {
        creatorID: firebase.auth().currentUser.uid,
        creatorName: firebase.auth().currentUser.displayName,
        str: 0,
        int: 0,
        per: 0,
        cse: 0,
        hea: 0,
        agi: 0,
        pwr: 0,
        com: 0,
        wil: 0,
        dp: 0,
        desc: this.desc
        
      }
    )
  }

}
