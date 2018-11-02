import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CharSheetComponent } from './char-sheet/char-sheet.component';
import { DicerollerComponent } from './diceroller/diceroller.component';
import { CharGeneratorComponent } from './char-generator/char-generator.component';
import { AdminComponent } from './admin/admin.component';
import { GameGeneratorComponent } from './game-generator/game-generator.component';
import { GmComponent } from './gm/gm.component';
import { ItemCreatorComponent } from './item-creator/item-creator.component';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { CharViewerComponent } from './char-viewer/char-viewer.component';
import { TrapCreatorComponent } from './trap-creator/trap-creator.component';
import { SpellcardCreatorComponent } from './spellcard-creator/spellcard-creator.component';
import { SpellcardListComponent } from './spellcard-list/spellcard-list.component';
import { NpcCreatorComponent } from './npc-creator/npc-creator.component';
import { NpclistComponent } from './npclist/npclist.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CharSheetComponent,
    DicerollerComponent,
    CharGeneratorComponent,
    AdminComponent,
    GameGeneratorComponent,
    GmComponent,
    ItemCreatorComponent,
    ItemlistComponent,
    CharViewerComponent,
    TrapCreatorComponent,
    SpellcardCreatorComponent,
    SpellcardListComponent,
    NpcCreatorComponent,
    NpclistComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
