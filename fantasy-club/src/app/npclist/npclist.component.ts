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
  editDisplay: boolean = false;
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
        this.NPCs = [];
        snapshot.forEach(function (childsnap) {
          this.NPCs.push(childsnap);
        }.bind(this))
      }.bind(this))
  }

  setSelectedNPC(x: firebase.database.DataSnapshot) {
    this.selectedNPC = x;
    }

    displayEditor() {
      if (firebase.auth().currentUser == null) {
        return;
      }
      this.editDisplay = true;
    }
}
