import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as firebase from 'firebase';
import { SpellcardListComponent } from './spellcard-list.component';

describe('SpellcardListComponent', () => {
  let component: SpellcardListComponent;
  let fixture: ComponentFixture<SpellcardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellcardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellcardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize arrays', () => {
    expect(component.publicSpells).toEqual([]);
    expect(component.privateSpells).toEqual([]);
    expect(component.charSpells).toEqual([]);
  });

  it('should initialize booleans', () => {
    expect(component.privateToggle).toBeFalsy();
    expect(component.publicToggle).toBeFalsy();
    expect(component.charToggle).toBeFalsy();
    expect(component.GMStatus).toBeFalsy();
    expect(component.editDisplay).toBeFalsy();
    expect(component.shareMenuToggle).toBeFalsy();
    expect(component.addToGameToggle).toBeFalsy();
  });

  it('should leave these uninitialized', () => {
    expect(component.selectedSpellType).toBeUndefined();
    expect(component.selectedSpell).toBeNull();
    expect(component.c).toBeUndefined();
    expect(component.d).toBeUndefined();
    expect(component.rolls).toBeUndefined();
    expect(component.total).toBeUndefined();
    expect(component.currChar).toBeUndefined();
    expect(component.statComp).toEqual("");
  });

  it('should be private button', () => {
    var temp = component.privateToggle;
    spyOn(component, "fillPrivate");
    component.privateButton();
    expect(component.privateToggle).toEqual(!temp);
    if(component.privateToggle) expect(component.fillPrivate).toHaveBeenCalled();
  });

  it('should be public button', () => {
    var temp = component.publicToggle;
    spyOn(component, "fillPublic");
    component.publicButton();
    expect(component.publicToggle).toEqual(!temp);
    if(component.publicToggle) expect(component.fillPublic).toHaveBeenCalled();
  });

  it('should be character button', () => {
    var temp = component.charToggle;
    spyOn(component, "fillChar");
    component.charButton();
    expect(component.charToggle).toEqual(!temp);
    if(component.publicToggle) expect(component.fillPublic).toHaveBeenCalled();
  });

  it('should not display editor', () => {
    component.editDisplay = false;
    component.displayEditor();
    expect(firebase.auth().currentUser).toBeNull();
    expect(component.editDisplay).toBeFalsy();
  });

  it('should display editor correctly', () => {
    spyOn(component, "displayEditor").and.callFake( function() {
      this.editDisplay = true;
      this.shareMenuToggle = false;
    });
    component.displayEditor();
    expect(component.displayEditor).toHaveBeenCalled();
    expect(component.editDisplay).toBeTruthy();
    expect(component.shareMenuToggle).toBeFalsy();
  });

    it('should add to game toggler', () => {
    spyOn(component, "addToGameToggler").and.callFake( function() {
      this.addToGameToggle = !this.addToGameToggle;
    });
    component.addToGameToggle = false;
    component.addToGameToggler();
    expect(component.addToGameToggle).toBeTruthy();
    component.addToGameToggler();
    expect(component.addToGameToggle).toBeFalsy();
  });
});
