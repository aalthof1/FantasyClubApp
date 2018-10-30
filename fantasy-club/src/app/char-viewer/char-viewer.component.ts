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
  GMStatus: boolean = false;
  adminStatus : boolean = false;

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
}
