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
  selectedItem : firebase.database.DataSnapshot = null;
  editDisplay : boolean = false;

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
    this.isUserGM();
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
  setSelectedItem(x : firebase.database.DataSnapshot) {
    this.selectedItem = x;
  }
  displayEditor() {
    if (firebase.auth().currentUser == null || this.isUserGM() == false) {
      return;
    }
    this.editDisplay = true;
  }
  updateItem() {
    let x : HTMLInputElement = document.getElementById("itemNameInput") as HTMLInputElement;
    let y : HTMLTextAreaElement= document.getElementById("itemDescription") as HTMLTextAreaElement;
    if (x.value == "" || y.value == "") {
      return;
    }
    //committed to updating the item
    let cID= this.selectedItem.child("creatorID").val();
    let cName = this.selectedItem.child("creatorName").val();
    this.selectedItem.ref.remove();
    
    firebase.database().ref("items/public/" + x.value).set(
      {
        creatorID : cID,
        creatorName : cName,
        desc : y.value
      }
    )
    this.selectedItem = undefined;
    this.editDisplay = false;
    
  }
  removeItem(x : firebase.database.DataSnapshot) {
    x.ref.remove()
  }
}
