import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-char-viewer',
  templateUrl: './char-viewer.component.html',
  styleUrls: ['./char-viewer.component.css']
})
export class CharViewerComponent implements OnInit {
  displayToggle : boolean = false;
  constructor() { }

  ngOnInit() {
  }

  charViewerToggle() {
    this.displayToggle = !this.displayToggle;
  }
}
