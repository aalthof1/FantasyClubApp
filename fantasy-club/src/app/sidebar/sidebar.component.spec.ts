import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { CharGeneratorComponent } from '../char-generator/char-generator.component';
import { CharSheetComponent } from '../char-sheet/char-sheet.component';
import { AppComponent } from '../app.component';
import { DicerollerComponent } from '../diceroller/diceroller.component';
import { AdminComponent } from '../admin/admin.component';
import { GameGeneratorComponent } from '../game-generator/game-generator.component';
import { GmComponent } from '../gm/gm.component';
import { SpellcardListComponent } from '../spellcard-list/spellcard-list.component';
import { ItemlistComponent } from '../itemlist/itemlist.component';
import { CharViewerComponent } from '../char-viewer/char-viewer.component';
import { ItemCreatorComponent } from '../item-creator/item-creator.component';
import { SpellcardCreatorComponent } from '../spellcard-creator/spellcard-creator.component';
import { TrapCreatorComponent } from '../trap-creator/trap-creator.component';
import * as firebase from 'firebase';
import { NpcCreatorComponent } from '../npc-creator/npc-creator.component';
import { NpclistComponent } from '../npclist/npclist.component';


describe('Login Utility', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let result: firebase.auth.UserCredential;
  let provider: firebase.auth.GoogleAuthProvider;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, SidebarComponent, CharSheetComponent, 
        AdminComponent, DicerollerComponent, GameGeneratorComponent, 
        GmComponent, CharGeneratorComponent, SpellcardListComponent,
        ItemlistComponent, CharViewerComponent, ItemCreatorComponent,
        SpellcardCreatorComponent, TrapCreatorComponent, NpcCreatorComponent,
        NpclistComponent
      ],
      providers: [ SidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    provider = new firebase.auth.GoogleAuthProvider();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(firebase.apps.length).toBeGreaterThan(0);
    expect(component.isUserSignedIn()).toBeFalsy();
  });

  it('should confirm user not signed in', () => {
    expect(firebase.auth().currentUser).toBeNull();
    expect(component.isUserSignedIn()).toBeFalsy();
  })

  it('should confirm user is not gm', () => {
    expect(component.isUserGM()).toBeFalsy();
  });

  it('should confirm user is not admin', () => {
    expect(component.isUserAdmin()).toBeFalsy();
  });

  it('should have user signed out', () => {
    component.signOut();
    expect(firebase.auth().currentUser).toBeNull();
    expect(component.user_name).toEqual("");
    expect(component.actualChar).toEqual("");
    expect(component.currGame).toEqual("");
    expect(component.user_id).toEqual("");
    expect(component.user_name).toEqual("");
    expect(component.games).toEqual([]);
    expect(component.createdItems).toEqual([]);
    expect((document.getElementById("admin-container").classList)).toContain("no-display");
    expect((document.getElementById("admin").classList)).toContain("no-display");
    expect((document.getElementById("gm-container").classList)).toContain("no-display");
    expect((document.getElementById("gm").classList)).toContain("no-display");
  });
});

describe('User Field Updates', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let result: firebase.auth.UserCredential;
  let provider: firebase.auth.GoogleAuthProvider;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, SidebarComponent, CharSheetComponent, 
        AdminComponent, DicerollerComponent, GameGeneratorComponent, 
        GmComponent, CharGeneratorComponent, SpellcardListComponent,
        ItemlistComponent, CharViewerComponent, ItemCreatorComponent,
        SpellcardCreatorComponent, TrapCreatorComponent, NpcCreatorComponent,
        NpclistComponent
      ],
      providers: [ SidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, "signIn").and.callFake( function() {
        component.user_id = "testUser4";
        component.user_priv = 3;
        component.currChar = "test_char";
    });
  });

  it("should be gm", () => {
    component.signIn();
    expect(component.signIn).toHaveBeenCalled();
    expect(component.isUserGM()).toBeTruthy();
  });

  it("should be admin", () => {
    component.signIn();
    expect(component.signIn).toHaveBeenCalled();
    expect(component.isUserAdmin()).toBeTruthy();
  });

  it("should set character", () => {
    component.signIn();
    expect(component.signIn).toHaveBeenCalled();
    component.setChar();
    expect(component.currChar).toEqual("test_char");
    expect(component.actualChar).toEqual("test_char");
    component.currChar = "test";
    component.setChar();
    expect(component.currChar).toEqual("test");
    expect(component.actualChar).toEqual("test");
  });

  it("should refresh created items", () => {
    component.signIn();
    expect(component.signIn).toHaveBeenCalled();
    expect(component.createdItems).toEqual([]);
    component.refreshCreatedItems();
    expect(component.createdItems.length).toBeGreaterThan(0);
  });

  it("should refresh games", () => {
    component.signIn();
    expect(component.signIn).toHaveBeenCalled();
    expect(component.games).toEqual([]);
    component.refreshGames();
    expect(component.games.length).toBeGreaterThan(0);
  });

  it("should refresh characters", () => {
    component.signIn();
    expect(component.signIn).toHaveBeenCalled();
    expect(component.characters).toEqual([]);
    component.refreshCharacters();
    expect(component.characters.length).toBeGreaterThan(0);
  });
});
