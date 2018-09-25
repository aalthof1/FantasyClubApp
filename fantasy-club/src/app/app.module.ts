import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CurrentCharComponent } from './current-char/current-char.component';
import { CharSheetComponent } from './char-sheet/char-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CurrentCharComponent,
    CharSheetComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
