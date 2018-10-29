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

  isUserGM() {
    if (this.sidebar.user_priv >= 2) {
      return true;
    }
    return false;
  }
  
  createPrivateItem() {
    this.name = ((document.getElementById("itemName") as HTMLInputElement).value);
    this.desc = ((document.getElementById("itemDesc") as HTMLInputElement).value);
    if (this.name == "" || this.desc == "") {
      return;
    }
    firebase.database().ref('items/private/' + this.sidebar.user_id + "/" + this.name).set(
      {
        creatorID: firebase.auth().currentUser.uid,
        creatorName: firebase.auth().currentUser.displayName,
        desc: this.desc
      }
    )
  }

  createPublicItem() {
    this.name = ((document.getElementById("itemName") as HTMLInputElement).value);
    this.desc = ((document.getElementById("itemDesc") as HTMLInputElement).value);
    firebase.database().ref('items/public/' + this.name + "/").set(
      {
        creatorName: firebase.auth().currentUser.displayName,
        creatorID: firebase.auth().currentUser.uid,
        desc: this.desc
      }
    )
  }

}
