import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {
  signedIn : boolean = false;
  displayName : string = "";
  characters : Array<firebase.database.DataSnapshot>;
  selectedCharacter : firebase.database.DataSnapshot = null;
  statNames : Array<string> = [];
  statVal : Array<number> = [];

  constructor() { }

  ngOnInit() {
  }

  getStats() {
    this.selectedCharacter.forEach((childsnap) => {
      if (childsnap.key != "items") {
        this.statNames.push(childsnap.key);
        this.statVal.push(childsnap.val());
      }
    })
  }
  
  selectChar(i : number) {
    if (i == -1) {
      this.selectedCharacter = null;
      this.statNames = [];
      this.statVal = [];
      return;
    }
    this.selectedCharacter = this.characters[i]
    this.getStats();
    
  }

  grabHeroes(snapshot: firebase.database.DataSnapshot) {
    this.characters = [];
    snapshot.forEach(function (childSnapshot) {
      this.characters.push(childSnapshot);
    }.bind(this))
  }


  login() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
      this.signedIn = true;
      this.displayName = firebase.auth().currentUser.displayName;
      firebase.database().ref('/user_id/').once('value')
        .then(function (snapshot) {
          if (snapshot.hasChild(firebase.auth().currentUser.uid)) {
            console.log("user exists with priv level = " + snapshot.child(firebase.auth().currentUser.uid).child('priv').val());
            snapshot.child(firebase.auth().currentUser.uid).child('priv').val();
          }
          else {
            //we'll create the user in the database with base priviledge
            snapshot.ref.child(firebase.auth().currentUser.uid).set({
              name: firebase.auth().currentUser.displayName,
              priv: 1
            });
            firebase.database().ref('/characters/' + firebase.auth().currentUser.uid + "/");
            console.log("user created with priv level = 1");
          }
          //grabs heroes belonging to user
          firebase.database().ref('characters/' + firebase.auth().currentUser.uid + "/").once('value')
            .then(snapshot => this.grabHeroes(snapshot));
        }.bind(this))
    })
  }
}