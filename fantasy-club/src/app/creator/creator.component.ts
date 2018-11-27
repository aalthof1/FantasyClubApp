import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {

  selectedCreator = "-- Please Select An Option --";

  constructor(private sc : SidebarComponent) { }

  ngOnInit() {
  }

  isUserGM() {
    return this.sc.isUserGM();
  }

  isUserSignedIn() {
    return this.sc.isUserSignedIn();
  }

  updateCreator(val) {
    this.selectedCreator = val;
  }

  getSelectedCreator() {
    return this.selectedCreator;
  }

  refreshCreatedItems(): void {
    this.sc.refreshCreatedItems();
  }

}
