import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

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
import { SettingsComponent } from './settings/settings.component';
import { NavigationComponent } from './navigation/navigation.component';
import { OptionPaneComponent } from './option-pane/option-pane.component';
import { CreatorComponent } from './creator/creator.component';

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
    SettingsComponent,
    NavigationComponent,
    OptionPaneComponent,
    CreatorComponent,
  ],
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
