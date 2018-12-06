import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  @Input() userId;
  @Input() app;
  @Output() refresh = new EventEmitter<string>();
  name: string;
  desc: string;
  diceType: number;
  diceAmount: number;
  public: string;
  date: number;
  traps: Array<string> = [];
  snapshot: firebase.database.DataSnapshot;

  constructor(private sidebar: SidebarComponent) {
    this.userId = sidebar.user_id
    this.app = firebase.app;
  }

  ngOnInit() {
  }

  createEvent() {
    this.name = ((document.getElementById("eventName") as HTMLInputElement).value);
    this.desc = ((document.getElementById("eventDesc") as HTMLInputElement).value);
    this.date = new Date(((document.getElementById("eventDate") as HTMLInputElement).value)).getTime()/1000|0;
    firebase.database().ref('events/' + "/" + this.name + "/").set(
      {
        creatorName: firebase.auth().currentUser.displayName,
        creatorID: firebase.auth().currentUser.uid,
        eventName: this.name,
        desc: this.desc,
        date: this.date
      }
    )
  }

  editEvent() {
    this.name = ((document.getElementById("eventName") as HTMLInputElement).value);
    this.desc = ((document.getElementById("eventDesc") as HTMLInputElement).value);
    this.date = new Date(((document.getElementById("eventDate") as HTMLInputElement).value)).getTime()/1000|0;
    firebase.database().ref('events/' + this.name + "/").set(
      {
        creatorName: firebase.auth().currentUser.displayName,
        creatorID: firebase.auth().currentUser.uid,
        eventName: this.name,
        desc: this.desc,
        date: this.date
      }
    )
  }

  clearAll() {
    (document.getElementById("eventName") as HTMLInputElement).value = "";
    (document.getElementById("eventDesc") as HTMLInputElement).value = "";
    (document.getElementById("eventDate") as HTMLInputElement).value = "";
  }

  deleteEvent() {
    this.name = (document.getElementById("eventName") as HTMLInputElement).value;
    firebase.database().ref("events/" + "/" + this.name).remove();
    this.clearAll();
  }

  isUserGM() {
    if (this.sidebar.user_priv >= 2) {
      return true;
    }
    return false;
  }
}
