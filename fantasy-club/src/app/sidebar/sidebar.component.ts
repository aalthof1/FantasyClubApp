import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user_id: string = "";
  user_name: string = "";

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
    this.app = firebase.initializeApp(this.config);
        if (this.isUserSignedIn()) {
      this.user_id = this.app.auth().currentUser.uid;
      this.user_name = this.app.auth().currentUser.displayName;
    }
  }

  isUserSignedIn() {
    if (this.app.auth().currentUser != null) {
      return true;
    }
    return false;
  }

  createNewUser(snapshot: firebase.database.DataSnapshot) {
    console.log(this.user_id)
    console.log(snapshot);
    if (snapshot.hasChild(this.user_id)) {
      console.log("user exists with priv level = " + snapshot.child(this.user_id).child('priv').val());
    }
    else {
      //we'll create the user in the database with base priviledge
      snapshot.ref.child(this.user_id).set({
        name: this.app.auth().currentUser.displayName,
        priv: 1
      });
      console.log("user created with priv level = 1")
    }
  }

  onSuccessfulSignIn(result: firebase.auth.UserCredential) {
    this.user_name = result.user.displayName;
    this.user_id = result.user.uid;
    this.app.database().ref('/user_id/').once('value')
      .then(snapshot => this.createNewUser(snapshot));
  }

  onUnsuccessfulSignIn(error) {
    console.log(error)
  }

  signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    if (this.isUserSignedIn()) {
      this.user_id = this.app.auth().currentUser.uid;
      this.user_name = this.app.auth().currentUser.displayName;
      return;
    }
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => this.onSuccessfulSignIn(result), error => { this.onUnsuccessfulSignIn });
  }

  signOut() {
    // Sign out of Firebase.
    this.app.auth().signOut();
    this.user_id = "";
    this.user_name = "";
  }
}
