import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-item-creator',
  templateUrl: './item-creator.component.html',
  styleUrls: ['./item-creator.component.css']
})
export class ItemCreatorComponent implements OnInit {

  @Input() userId;
  @Input() app;
  @Output() refresh = new EventEmitter<string>();
  name: string;
  desc: string;
  public: string;
  items: Array<string> = [];
  snapshot: firebase.database.DataSnapshot;

  constructor(private sidebar: SidebarComponent) {
    this.userId = sidebar.user_id
    this.app = firebase.app;
  }

  ngOnInit() {
  }

  inputItem(snapshot: firebase.database.DataSnapshot) {
    snapshot.forEach(function (childSnapshot) {
      this.items.push(childSnapshot.key);
    }.bind(this))
    if (this.items.includes(this.name) || this.name == "") {
      return;
    }
    else {
      var ref = snapshot.ref;
      ref.set({
        desc: this.desc,
      });
    }
    this.refresh.emit("refresh");
  }

  createItem() {
    this.name = ((document.getElementById("itemName") as HTMLInputElement).value);
    this.desc = ((document.getElementById("itemDesc") as HTMLInputElement).value);
    firebase.database().ref('items/' + this.sidebar.user_id + "/" + this.name).once('value')
      .then(snapshot => this.inputItem(snapshot));

  }

  createPublicItem() {
    this.name = ((document.getElementById("itemName") as HTMLInputElement).value);
    this.desc = ((document.getElementById("itemDesc") as HTMLInputElement).value);
    firebase.database().ref('items/public/' + this.sidebar.user_id + "/" + this.name + "/").once('value')
      .then(snapshot => this.inputItem(snapshot));


  }

}
