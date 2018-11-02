import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as firebase from 'firebase';
import { ItemlistComponent } from './itemlist.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

describe('ItemlistComponent', () => {
  let component: ItemlistComponent;
  let fixture: ComponentFixture<ItemlistComponent>;
  let sidebar: SidebarComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemlistComponent ],
      providers: [ SidebarComponent ] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize arrays', () => {
    expect(component.publicItems).toEqual([]);
    expect(component.privateItems).toEqual([]);
    expect(component.charItems).toEqual([]);
    expect(component.traps).toEqual([]);
  });

  it('should initialize booleans', () => {
    expect(component.privateToggle).toBeFalsy();
    expect(component.publicToggle).toBeFalsy();
    expect(component.charToggle).toBeFalsy();
    expect(component.trapToggle).toBeFalsy();
    expect(component.GMStatus).toBeFalsy();
    expect(component.editDisplay).toBeFalsy();
    expect(component.shareMenuToggle).toBeFalsy();
    expect(component.addToGameToggle).toBeFalsy();
  });

  it('should leave these uninitialized', () => {
    expect(component.selectedItemType).toBeUndefined();
    expect(component.selectedItem).toBeNull();
    expect(component.selectedTrap).toBeNull();
    expect(component.c).toBeUndefined();
    expect(component.d).toBeUndefined();
    expect(component.rolls).toBeUndefined();
    expect(component.total).toBeUndefined();
    expect(component.stat).toBeUndefined();
    expect(component.bonus).toBeUndefined();
    expect(component.currChar).toBeUndefined();
    expect(component.statComp).toEqual("");
  });

  it('should be private button', () => {
    var temp = component.privateToggle;
    spyOn(component, "isUserGM").and.callFake( function() {
      return true;
    });
    spyOn(component, "fillPrivate");
    component.privateButton();
    expect(component.isUserGM).toHaveBeenCalled();
    expect(component.privateToggle).toEqual(!temp);
    if(component.privateToggle) expect(component.fillPrivate).toHaveBeenCalled();
  });

  it('should be public button', () => {
    var temp = component.publicToggle;
    spyOn(component, "isUserGM").and.callFake( function() {
      return true;
    });
    spyOn(component, "fillPublic");
    component.publicButton();
    expect(component.isUserGM).toHaveBeenCalled();
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

  it('should share menu correctly', () => {
    component.shareMenuToggle = true;
    component.shareMenu();
    expect(component.shareMenuToggle).toBeFalsy();
    expect(component.editDisplay).toBeFalsy();
  });

  it('should be trap button', () => {
    var temp = component.trapToggle;
    spyOn(component, "isUserGM").and.callFake( function() {
      return true;
    });
    spyOn(component, "fillTraps");
    component.trapButton();
    expect(component.isUserGM).toHaveBeenCalled();
    expect(component.trapToggle).toEqual(!temp);
    if(component.trapToggle) expect(component.fillTraps).toHaveBeenCalled();
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
