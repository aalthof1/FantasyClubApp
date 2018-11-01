import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-npclist',
  templateUrl: './npclist.component.html',
  styleUrls: ['./npclist.component.css']
})
export class NpclistComponent implements OnInit {

  npcToggle: boolean = false;
  NPCs: Array<firebase.database.DataSnapshot> = [];
  selectedNPC: firebase.database.DataSnapshot = null;
  shareMenuToggle: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  NPCButton() {
    this.npcToggle = !this.npcToggle;
    if (this.npcToggle) {
      this.fillnpc()
    }
  }

  fillnpc() {
    firebase.database().ref("/NPC/" + firebase.auth().currentUser.uid).on("value",
      function (snapshot) {
        this.npcSpells = [];
        snapshot.forEach(function (childsnap) {
          this.npcSpells.push(childsnap);
        }.bind(this))
      }.bind(this))
  }

}
