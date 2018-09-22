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
  app: firebase.app.App;
  ngOnInit() {}
}
