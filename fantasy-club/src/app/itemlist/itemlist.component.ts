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
  privateItems: Array<firebase.database.DataSnapshot> = [];
  selectedItem: firebase.database.DataSnapshot = null;
  selectedItemType: string = undefined;
  GMStatus:boolean = false;
  editDisplay:boolean = false;
  shareMenuToggle: boolean = false;


  constructor() { }

  ngOnInit() {
  }

  privateButton() {
    this.isUserGM();
    this.privateToggle = !this.privateToggle;
    if (this.privateToggle) {
      this.fillPrivate()
    }
  }
  publicButton() {
    this.isUserGM();
    this.publicToggle = !this.publicToggle;
    if (this.publicToggle) {
      this.fillPublic()
    }
  }

  fillPrivate() {
    this.isUserGM();
    firebase.database().ref("items/private/" + firebase.auth().currentUser.uid).on("value",
      function (snapshot) {
        this.privateItems = [];
        snapshot.forEach(function (childsnap) {
          this.privateItems.push(childsnap);
        }.bind(this))
      }.bind(this))
  }

  fillPublic() {
    this.isUserGM();
    firebase.database().ref("items/public").on("value",
      function (snapshot) {
        this.publicItems = [];
        snapshot.forEach(function (childsnap) {
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
  setSelectedItem(x: firebase.database.DataSnapshot) {
    this.selectedItem = x;
    if (this.selectedItem != undefined) {
      if (this.selectedItem.ref.parent.parent.key == "private") {
        this.selectedItemType = "private";
      }
      else {
        this.selectedItemType = "public";
      }
    }
    else {
      this.selectedItemType = undefined;
    }

  }
  displayEditor() {
    if (firebase.auth().currentUser == null || this.isUserGM() == false) {
      return;
    }
    this.editDisplay = true;
    this.shareMenuToggle = false;
  }
  updateItem() {
    let x: HTMLInputElement = document.getElementById("itemNameInput") as HTMLInputElement;
    let y: HTMLTextAreaElement = document.getElementById("itemDescription") as HTMLTextAreaElement;
    if (x.value == "" || y.value == "") {
      return;
    }
    //committed to updating the item
    let cID = this.selectedItem.child("creatorID").val();
    let cName = this.selectedItem.child("creatorName").val();
    this.selectedItem.ref.remove();
    if (this.selectedItem.ref.parent.parent.key == "private") {
      firebase.database().ref("items/private/" + firebase.auth().currentUser.uid + "/" + x.value).set(
        {
          creatorID: cID,
          creatorName: cName,
          desc: y.value
        }
      )
    }
    else {
      firebase.database().ref("items/public/" + x.value).set(
        {
          creatorID: cID,
          creatorName: cName,
          desc: y.value
        }
      )
    }
    this.setSelectedItem(undefined);
    this.editDisplay = false;
  }
  removeItem(x: firebase.database.DataSnapshot) {
    x.ref.remove()
  }
  shareMenu() {
    this.shareMenuToggle = !this.shareMenuToggle;
    this.editDisplay = false;
  }
  shareWithGM() {
    let x: HTMLInputElement = document.getElementById("inputGM") as HTMLInputElement;
    if (x.value == "") {
      return;
    }
    let gmID : string = undefined;
    firebase.database().ref("user_id/").once("value").then(function (snapshot) {
      snapshot.forEach(function(childsnap) {
        if (childsnap.child("name").val() == x.value) {
          gmID = childsnap.key;
          firebase.database().ref("items/private/" + gmID).child(this.selectedItem.key).set({
            creatorID : this.selectedItem.child("creatorID").val(),
            creatorName : this.selectedItem.child("creatorName").val(),
            desc : this.selectedItem.child("desc").val()
          })
        }
      }.bind(this))
    }.bind(this))
  }
}
