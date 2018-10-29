import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit {
  privateToggle: boolean = false;
  publicToggle: boolean = false;
  publicItems: Array<firebase.database.DataSnapshot> = [];
  GMStatus: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  privateButton() {
    if (this.isUserGM()) {
      this.privateToggle = !this.privateToggle;
    }
  }
  publicButton() {
    this.isUserGM();
    this.publicToggle = !this.publicToggle;
    if (this.publicToggle) {
      this.fillPublic()
    }
  }

  fillPublic() {
    this.publicItems = [];
    firebase.database().ref("items/public").on("value",
      function (snapshot) {
        this.publicItems = [];
        snapshot.forEach(function(childsnap) {
          this.publicItems.push(childsnap);
        }.bind(this))
      }.bind(this))
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
          return true;
        }
        else {
          this.GMStatus = false;
          return false;
        }
      }.bind(this))
  }
  setCurrentItem(x : firebase.database.DataSnapshot) {
    console.log(x)
  }
}
