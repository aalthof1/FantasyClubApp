import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharSheetComponent } from './char-sheet.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import * as firebase from 'firebase';
import { CurrentCharService } from '../current-char.service';
import { PassGameService } from '../pass-game.service';

describe('CharSheetComponent', () => {
  let component: CharSheetComponent;
  let fixture: ComponentFixture<CharSheetComponent>;
  let sidebar : SidebarComponent;
  let currChar: CurrentCharService;
  let passGame: PassGameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharSheetComponent ],
      providers: [ SidebarComponent, CurrentCharService, PassGameService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    currChar = TestBed.get(CurrentCharService);
    passGame = TestBed.get(PassGameService);
    fixture = TestBed.createComponent(CharSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sidebar = TestBed.get(SidebarComponent);
    if(!firebase.apps.length) {
      var config = {
        apiKey: "AIzaSyA7rfAhOVMuPaTkzGQXSwNnNx5iZDG8-EQ",
        authDomain: "purdue-fantasy-club.firebaseapp.com",
        databaseURL: "https://purdue-fantasy-club.firebaseio.com",
        projectId: "purdue-fantasy-club",
        storageBucket: "purdue-fantasy-club.appspot.com",
        messagingSenderId: "625002728234"
      }
      firebase.initializeApp(config);
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should construct', () => {
    expect(component.charSubscript).toBeDefined();
    expect(component.gameSubscript).toBeDefined();
  });

  it('should set initial booleans', () => {
    expect(component.currentGameGM).toBeFalsy();
    expect(component.view).toBeFalsy();
    expect(component.edit).toBeFalsy();
    expect(component.problem).toBeFalsy();
    expect(component.gamePlayerCountView).toBeFalsy();
    expect(component.hasAnnouncement).toBeFalsy();
    expect(component.trapMenuToggle).toBeFalsy();
    expect(component.noTrapMessage).toBeFalsy();
    expect(component.abilityMenuToggle).toBeFalsy();
    expect(component.noAbilityMessage).toBeFalsy();
    expect(component.canSeeAnnouncement).toBeFalsy();
  });

  it('should leave these undefined', () => {
    expect(component.selectedChar).toBeUndefined();
    expect(component.selectedGame).toBeUndefined();
    expect(component.GMDisplay).toBeUndefined();
    expect(component.description).toBeUndefined();
    expect(component.capacity).toBeUndefined();
    expect(component.currentAnnouncement).toBeUndefined();
    expect(component.statData).toBeUndefined();
    expect(component.statValues).toBeUndefined();
    expect(component.viewValues).toBeUndefined();
    expect(component.submitValues).toBeUndefined(); 
  });

  it('should initialize arrays', () => {
    expect(component.playerCharacters).toEqual([]);
    expect(component.traps).toEqual([]);
    expect(component.trapInfo).toEqual([]);
    expect(component.abilities).toEqual([]);
    expect(component.abilityInfo).toEqual([]);
  });

  it('should set flags', () => {
    expect(component.statNames.length).toEqual(18);
    expect(component.playerCount).toEqual(0);
    expect(component.selectedTrap).toEqual(-1);
    expect(component.selectedAbility).toEqual(-1);
  });

  it('should implement changes', () => {
    spyOn(component.refresh, "emit");
    component.implementChanges();
    expect(component.selectedChar).toBeNull();
    expect(component.statValues.length).toEqual(0);
    expect(component.view).toEqual(false);
    expect(component.edit).toEqual(false);
    expect(component.refresh.emit).toHaveBeenCalled();
  });

  it('should activate edit', () => {
    spyOn(component, "refreshStatsFromOnline").and.callFake( function() {
      component.statValues = [];
    });
    component.editActivate();
    expect(component.refreshStatsFromOnline).toHaveBeenCalled();
    expect(component.view).toEqual(false);
    expect(component.edit).toEqual(true);
    expect(component.statValues).toEqual([]);
  });

  it('should activate view', () => {
    spyOn(component, "refreshStatsFromOnline").and.callFake( function() {
      component.statValues = [];
    });
    component.viewActivate();
    expect(component.refreshStatsFromOnline).toHaveBeenCalled();
    expect(component.edit).toEqual(false);
    expect(component.view).toEqual(true);
    expect(component.statValues).toEqual([]);
  });

  it("should swap edit and view", () => {
    spyOn(component, "refreshStatsFromOnline").and.callFake( function() {
      component.statValues = [];
    });
    component.viewActivate();
    expect(component.refreshStatsFromOnline).toHaveBeenCalled();
    expect(component.edit).toEqual(false);
    expect(component.view).toEqual(true);
    component.editActivate();
    expect(component.refreshStatsFromOnline).toHaveBeenCalled();
    expect(component.edit).toEqual(true);
    expect(component.view).toEqual(false);
    expect(component.statValues).toEqual([]);
  });

  it('should not submit changes', () => {
    spyOn(console, "log");
    component.submitChanges();
    expect(component.problem).toBeTruthy();
    expect(component.submitValues).toEqual([]);
    expect(console.log).toHaveBeenCalled();
  });

});
