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
  characterViewerToggle: boolean = false;
  selectedCharacter: firebase.database.DataSnapshot = undefined;
  statName: Array<string> = [];
  statValue: Array<number> = [];
  isAdmin: boolean = false;

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
    this.setFriendIndex(undefined);
    this.friendChars = [];
    this.sharedViewerLoading = true;
    firebase.database().ref("shared/").once("value").then(function (snapshot) {
      this.sharedMenuIDs = [];
      this.sharedMenuNames = [];
      this.isAdmin = false;
      firebase.database().ref("user_id/" + firebase.auth().currentUser.uid + "/priv").once("value").then(function (snip) {
        if (snip.val() == 3) {
          //is admin, list all users
          this.isAdmin = true;
          console.log("hey you're an admin")
          firebase.database().ref("user_id").once("value").then(function (slip) {
            slip.forEach(function (slimjim) {
              this.sharedMenuIDs.push(slimjim)
            }.bind(this))

            for (let z = 0; z < this.sharedMenuIDs.length; z++) {
              this.sharedMenuNames.push(this.sharedMenuIDs[z].child('name').val());
            }
          }.bind(this))
        }
        if (snapshot.hasChild(firebase.auth().currentUser.uid) && !this.isAdmin) {
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

      }.bind(this))
      this.sharedViewerLoading = false;
    }.bind(this))
  }
  setFriendIndex(i: number) {
    if (i == this.friendCharIndex) {
      return;
    }
    else if (i >= this.sharedMenuIDs.length || i == undefined) {
      this.friendCharIndex = -1;
    }
    else {
      this.friendChars = [];
      this.friendCharIndex = i;
      firebase.database().ref("characters/" + this.sharedMenuIDs[i].key).once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnap) {
          console.log(childSnap.key)
          if (this.isAdmin) {
            this.friendChars.push(childSnap);
          }
          else {
            firebase.database().ref("shared/" + firebase.auth().currentUser.uid + "/" + this.sharedMenuIDs[i].key).once("value").then(function (snap) {
              if (snap.hasChild(childSnap.key)) {
                this.friendChars.push(childSnap);
              }
            }.bind(this))
          }
        }.bind(this))
      }.bind(this))
    }
  }
  viewCharacter(x: firebase.database.DataSnapshot) {
    if (x == undefined) {
      this.characterViewerToggle = false;
      this.selectedCharacter = undefined;
      return;
    }
    this.selectedCharacter = x;
    this.characterViewerToggle = true;
    this.statName = [];
    this.statValue = [];

    this.selectedCharacter.forEach(function (snapshot) {
      this.statName.push(snapshot.key);
      this.statValue.push(snapshot.val());
    }.bind(this))
  }
  shareCharacter() {
    let x: string = (document.getElementById("inputCharacter") as HTMLInputElement).value;
    let y: string = (document.getElementById("inputPlayer") as HTMLInputElement).value;

    if (x == "" || y == "") {
      return;
    }
    firebase.database().ref("characters/" + firebase.auth().currentUser.uid).once("value").then(function (snapshot) {
      let flag1 = false;
      let flag2 = false;
      //ensure character exists
      snapshot.forEach(function (snap) {
        if (snap.key == x) {
          flag1 = true;
        }
      }.bind(this))

      if (flag1 == false) {
        return;
      }
      let otherUserID: string = "";
      firebase.database().ref("user_id").once("value").then(function (snapchild) {
        snapchild.forEach(function (snap) {
          if (snap.child("name").val() == y) {
            flag2 = true;
            otherUserID = snap.key;
          }
        }.bind(this))


        if (flag2 == false) {
          return;
        }
        //if we make it this far, the character and player to share with exist

        firebase.database().ref("shared/" + otherUserID + "/" + firebase.auth().currentUser.uid).child(x).set(0);
      }.bind(this))
    }.bind(this))
  }
}
