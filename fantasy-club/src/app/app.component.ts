import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fantasy-club';
  user_id: string = "";
  user_name: string = ""
  headline: HTMLElement;
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
    this.headline = document.getElementById('headline')
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

  onSuccessfulSignIn(result: firebase.auth.UserCredential) {
    console.log(result)
    this.user_name = result.user.displayName;
    this.user_id = result.user.uid;

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
    this.user_id = null;
    this.user_name = null;
  }
}