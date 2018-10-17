import { Component, OnInit, } from '@angular/core';
import * as firebase from 'firebase';
import { CurrentCharService } from "../current-char.service";
import { PassGameService } from "../pass-game.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor
  (private currentChar: CurrentCharService, private passGameService : PassGameService) {}

  user_id: string = "";
  user_name: string = "";
  currChar: string = "";
  currGame: string = "";
  actualChar: string = "";
  user_priv: number;
  characters: Array<firebase.database.DataSnapshot> = [];
  games: Array<firebase.database.DataSnapshot> = [];


  config = {
    apiKey: "AIzaSyA7rfAhOVMuPaTkzGQXSwNnNx5iZDG8-EQ",
    authDomain: "purdue-fantasy-club.firebaseapp.com",
    databaseURL: "https://purdue-fantasy-club.firebaseio.com",
    projectId: "purdue-fantasy-club",
    storageBucket: "purdue-fantasy-club.appspot.com",
    messagingSenderId: "625002728234"
  }
  app: firebase.app.App;



  ngOnInit() {
    if(!firebase.apps.length) {
     this.app = firebase.initializeApp(this.config);
    }
    this.signOut();
    if (this.isUserSignedIn()) {
      this.user_id = this.app.auth().currentUser.uid;
      this.user_name = this.app.auth().currentUser.displayName;
    }
  }


  isUserSignedIn() {
    if (firebase.auth().currentUser != null) {
      return true;
    }
    return false;
  }

  isUserGM() {
    if (this.user_priv >=2) {
      return true;
    }
    return false;
  }

  isUserAdmin() {
    if (this.user_priv >=3) {
      return true;
    }
    return false;
  }

  userSetup(snapshot: firebase.database.DataSnapshot) {
    if (snapshot.hasChild(this.user_id)) {
      console.log("user exists with priv level = " + snapshot.child(this.user_id).child('priv').val());
    }
    else {
      //we'll create the user in the database with base priviledge
      snapshot.ref.child(this.user_id).set({
        name: this.app.auth().currentUser.displayName,
        priv: 1,
      });
      this.app.database().ref('/characters/' + this.user_id + "/");
      console.log("user created with priv level = 1");
    }
    //grabs heroes belonging to user
    this.app.database().ref('characters/' + this.user_id + "/").on('value', snapshot => this.grabHeroes(snapshot))
  }

  onSuccessfulSignIn(result: firebase.auth.UserCredential) {
    this.user_name = result.user.displayName;
    this.user_id = result.user.uid;
    this.app.database().ref('/user_id/').once('value')
      .then(function (snapshot) {
        if (snapshot.hasChild(this.user_id)) {
          console.log("user exists with priv level = " + snapshot.child(this.user_id).child('priv').val());
          this.user_priv = snapshot.child(this.user_id).child('priv').val();
          //alert("user exists with priv level = " + snapshot.child(this.user_id).child('priv').val());
          if(snapshot.child(this.user_id).child('priv').val() >= 2)  {
            document.getElementById("gm-container").classList.remove("no-display");
            document.getElementById("gm").classList.remove("no-display");
          }
          if(snapshot.child(this.user_id).child('priv').val() >= 3)  {
            document.getElementById("admin-container").classList.remove("no-display");
            document.getElementById("admin").classList.remove("no-display");
          }
        }
        else {
          //we'll create the user in the database with base priviledge
          snapshot.ref.child(this.user_id).set({
            name: this.app.auth().currentUser.displayName,
            priv: 1
          });
          this.app.database().ref('/characters/' + this.user_id + "/");
          console.log("user created with priv level = 1");
        }
        //grabs heroes belonging to user
        this.app.database().ref('characters/' + this.user_id + "/").once('value')
          .then(snapshot => this.grabHeroes(snapshot));
        //Grab games
        this.app.database().ref('games/').once('value')
          .then(snapshot => this.grabGames(snapshot));
      }.bind(this));
  }

  onUnsuccessfulSignIn(error) {
    console.log(error)
  }

  signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    this.signOut();
    if (this.isUserSignedIn()) {
      this.user_id = this.app.auth().currentUser.uid;
      this.user_name = this.app.auth().currentUser.displayName;
      this.app.database().ref("user_id").once("value")
        .then(function(snapshot){
          if(snapshot.child(this.user_id).child('priv').val() >= 2)  {
            document.getElementById("gm-container").classList.remove("no-display");
            document.getElementById("gm").classList.remove("no-display");
          }
          if(snapshot.child(this.user_id).child('priv').val() >= 3)  {
            document.getElementById("admin-container").classList.remove("no-display");
            document.getElementById("admin").classList.remove("no-display");
          }
        }.bind(this));
      return;
    }
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => this.onSuccessfulSignIn(result), error => { this.onUnsuccessfulSignIn });
  }

  signOut() {
    // Sign out of Firebase.
    if(this.user_name != "") {
      this.app.database().ref('user_id/' + this.user_id + '/').child('current_character').set("");
    }
  
    this.actualChar = "";
    this.currGame = "";
    this.app.auth().signOut();
    this.user_id = "";
    this.user_name = "";
    this.games = [];
    document.getElementById("admin-container").classList.add("no-display");
    document.getElementById("admin").classList.add("no-display");
    document.getElementById("gm-container").classList.add("no-display");
    document.getElementById("gm").classList.add("no-display");
  }

  grabHeroes(snapshot: firebase.database.DataSnapshot) {
    this.characters = [];
    snapshot.forEach(function (childSnapshot) {
      this.characters.push(childSnapshot);
    }.bind(this))
  }

  grabGames(snapshot: firebase.database.DataSnapshot) {
    this.games = [];
    snapshot.forEach(function (childSnapshot) {
      this.games.push(childSnapshot);
    }.bind(this))
  }

  //used in service, don't delete
  passCharacter(i: firebase.database.DataSnapshot) {
    this.currentChar.send(i);
    this.currChar = i.key;
  }

  passGame(i : firebase.database.DataSnapshot) {
    this.passGameService.send(i);
    this.currGame = i.key;
  }

  refreshCharacters(): void {
    this.app.database().ref('characters/' + this.user_id + "/").on('value', snapshot => this.grabHeroes(snapshot));
  }

  refreshGames(): void {
    this.app.database().ref('games/').on('value', snapshot => this.grabGames(snapshot));
  }
  
  setChar(): void {
    this.app.database().ref('user_id/' + this.user_id + '/').child('current_character').set(this.currChar);
    this.actualChar = this.currChar;
  }

}
