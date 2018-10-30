import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-char-viewer',
  templateUrl: './char-viewer.component.html',
  styleUrls: ['./char-viewer.component.css']
})
export class CharViewerComponent implements OnInit {
  displayToggle: boolean = false;
  sharedToggle: boolean = false;
  shareMenuToggle: boolean = false;
  GMStatus: boolean = false;
  adminStatus: boolean = false;
  sharedViewerLoading: boolean = false;
  sharedMenuIDs: Array<firebase.database.DataSnapshot> = [];
  sharedMenuNames: Array<string> = [];
  friendCharIndex: number = -1;
  friendChars: Array<firebase.database.DataSnapshot> = [];

  constructor() { }

  ngOnInit() {
  }

  charViewerToggle() {
    if (firebase.auth().currentUser == null) {
      this.GMStatus = false;
      this.adminStatus = false;
      return;
    }
    this.displayToggle = !this.displayToggle;
    this.isUserGM();
  }
  isUserGM(): boolean {
    if (firebase.auth().currentUser == null) {
      this.GMStatus = false;
      return false;
    }
    firebase.database().ref("user_id/" + firebase.auth().currentUser.uid + "/priv").once("value")
      .then(function (snapshot) {
        if (snapshot.val() >= 2) {
          this.GMStatus = true;
          if (snapshot.val() == 3) {
            this.adminStatus = true;
          }
          return true;
        }
        else {
          this.GMStatus = false;
          this.adminStatus = false;
          return false;
        }
      }.bind(this))
  }
  sharedMenuFill() {
    this.sharedViewerLoading = true;
    firebase.database().ref("shared/").once("value").then(function (snapshot) {
      this.sharedMenuIDs = [];
      this.sharedMenuNames = [];
      if (snapshot.hasChild(firebase.auth().currentUser.uid)) {
        snapshot.child(firebase.auth().currentUser.uid).forEach(function (childSnap) {
          this.sharedMenuIDs.push(childSnap)
        }.bind(this))
      }
      if (this.sharedMenuIDs.length > 0) {
        for (let index = 0; index < this.sharedMenuIDs.length; index++) {
          const element = this.sharedMenuIDs[index];
          firebase.database().ref("user_id/" + element.key).once("value").then(function (snap) {
            this.sharedMenuNames.push(snap.child("name").val())
          }.bind(this))
        }
      }
      this.sharedViewerLoading = false;
    }.bind(this))
  }
  setFriendIndex(i: number) {
    if (i == this.friendCharIndex) {
      return;
    }
    if (i > this.sharedMenuIDs.length) {
      this.friendCharIndex = -1;
    }
    else {
      this.friendCharIndex = i;
      firebase.database().ref("characters/" + this.sharedMenuIDs[i].key).once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnap) {
          firebase.database().ref("shared/" + firebase.auth().currentUser.uid + "/" + this.sharedMenuIDs[i].key).once("value").then(function (snap) {
            if (snap.hasChild(childSnap.key)) {
              this.friendChars.push(childSnap);
            }
          }.bind(this))
        }.bind(this))
      }.bind(this))
    }
  }
}
