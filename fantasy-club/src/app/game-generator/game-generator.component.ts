import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-game-generator',
  templateUrl: './game-generator.component.html',
  styleUrls: ['./game-generator.component.css']
})
export class GameGeneratorComponent implements OnInit {

@Input() userId;
@Input() app;
@Output() refresh = new EventEmitter<string>();
name: string;
desc: string;
games: Array<string> = [];
snapshot: firebase.database.DataSnapshot;

constructor(private sidebar: SidebarComponent) {
  this.userId = sidebar.user_id
  this.app = sidebar.app
}

  ngOnInit() {
  }

  grabHeroes(snapshot: firebase.database.DataSnapshot) {
    snapshot.forEach(function (childSnapshot) {
      this.games.push(childSnapshot.key);
    }.bind(this))
    if (this.games.includes(this.name) || this.userId == "") {
      return;
    }
    else {
      var ref = snapshot.ref;
      ref.set({
        user_id: this.userId,
        desc: this.desc
      });
    }
    this.refresh.emit("refresh");
    this.sidebar.characters = [];
    this.sidebar.grabHeroes(snapshot);

  }

  createGame() {
    this.name = ((document.getElementById("name2") as HTMLInputElement).value);
    this.desc = ((document.getElementById("desc") as HTMLInputElement).value);
     this.app.database().ref('games/' + this.name + "/").once('value')
     .then(snapshot => this.grabHeroes(snapshot));

  }
    
}
