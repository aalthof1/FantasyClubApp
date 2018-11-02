import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as firebase from 'firebase';
import { CharViewerComponent } from './char-viewer.component';

describe('CharViewerComponent', () => {
  let component: CharViewerComponent;
  let fixture: ComponentFixture<CharViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial booleans', () => {
    expect(component.displayToggle).toBeFalsy();
    expect(component.sharedToggle).toBeFalsy();
    expect(component.shareMenuToggle).toBeFalsy();
    expect(component.GMStatus).toBeFalsy();
    expect(component.adminStatus).toBeFalsy();
    expect(component.sharedViewerLoading).toBeFalsy();
    expect(component.characterViewerToggle).toBeFalsy();
    expect(component.isAdmin).toBeFalsy();
    expect(component.archiveToggle).toBeFalsy();
  });

  it('should initialize arrays', () => {
    expect(component.sharedMenuIDs).toEqual([]);
    expect(component.sharedMenuNames).toEqual([]);
    expect(component.friendChars).toEqual([]);
    expect(component.statName).toEqual([]);
    expect(component.statValue).toEqual([]);
    expect(component.players).toEqual([]);
    expect(component.archive).toEqual([]);
    expect(component.archiveList).toEqual([]);
  });

  it('should set flags', () => {
    expect(component.friendCharIndex).toEqual(-1);
  });

  it('should leave these undefined', () => {
    expect(component.selectedCharacter).toBeUndefined();
  });

  it('should not toggle character viewer', () => {
    expect(firebase.auth().currentUser).toBeNull();
    component.charViewerToggle();
    expect(component.GMStatus).toBeFalsy();
    expect(component.adminStatus).toBeFalsy();
  });

  it('should toggle character viewer', () => {
    var temp : boolean = component.displayToggle;
    spyOn(component, "charViewerToggle").and.callFake( function() {
      this.displayToggle = !this.displayToggle;
      this.isUserGM();
    });
    spyOn(component, "isUserGM");
    component.charViewerToggle();
    expect(component.charViewerToggle).toHaveBeenCalled();
    expect(component.displayToggle).toEqual(!temp);
  });

  it("should see if user is not GM", () => {
    var returned : boolean = component.isUserGM();
    expect(firebase.auth().currentUser).toBeNull();
    expect(component.GMStatus).toBeFalsy();
    expect(returned).toBeFalsy();
  });

  it("should set friend index", () => {
    component.friendCharIndex = 10;
    component.setFriendIndex(10);
    expect(component.friendCharIndex).toEqual(10);
    component.setFriendIndex(undefined);
    expect(component.friendCharIndex).toEqual(-1);
    component.setFriendIndex(1);
    expect(component.friendChars).toEqual([]);
    expect(component.friendCharIndex).toEqual(-1);
  });

  it("should fill shared menu", () => {
    spyOn(component, "setFriendIndex");
    component.sharedMenuFill();
    expect(component.friendCharIndex).toEqual(-1);
    expect(component.friendChars).toEqual([]);
    expect(component.sharedViewerLoading).toBeTruthy();
  });

  it("should not view character", () => {
    component.viewCharacter(undefined);
    expect(component.characterViewerToggle).toBeFalsy();
    expect(component.selectedCharacter).toBeUndefined();
  });

  it("should toggle archive", () => {
    var tog : boolean = component.archiveToggle;
    spyOn(component, "isUserGM").and.callFake( function() {
      component.GMStatus = true;
    });
    component.toggleArchive();
    expect(component.isUserGM).toHaveBeenCalled();
    expect(component.GMStatus).toBeTruthy();
    expect(component.archiveToggle).toEqual(!tog);
    expect(component.archive).toEqual([]);
  });

});
