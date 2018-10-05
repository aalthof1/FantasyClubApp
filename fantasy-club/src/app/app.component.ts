import { Component, OnInit } from '@angular/core';
import { CurrentCharService } from "./current-char.service";
import { SidebarComponent } from './sidebar/sidebar.component';
import { CharSheetComponent } from './char-sheet/char-sheet.component';
import { PassGameService } from './pass-game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [CurrentCharService, PassGameService],
})
export class AppComponent implements OnInit {
  title = 'fantasy-club';
  user_id: string = "";
  user_name: string = ""
  headline: HTMLElement;
  app: firebase.app.App;

  ngOnInit() {}
}
