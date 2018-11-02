import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as firebase from 'firebase';
import { NpclistComponent } from './npclist.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

describe('NpclistComponent', () => {
  let component: NpclistComponent;
  let fixture: ComponentFixture<NpclistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpclistComponent ],
      providers : [ SidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize fields', () => {
    expect(component.npcToggle).toBeFalsy();
    expect(component.NPCs).toEqual([]);
    expect(component.selectedNPC).toBeNull();
    expect(component.editDisplay).toBeFalsy();
    expect(component.shareMenuToggle).toBeFalsy();
  });

  it('should npc button correct', () => {
    spyOn(component, "fillnpc");
    component.npcToggle = true;
    component.NPCButton();
    expect(component.npcToggle).toBeFalsy();
    component.NPCButton();
    expect(component.npcToggle).toBeTruthy();
    expect(component.fillnpc).toHaveBeenCalled();
  });

  it('should display editor', () => {
    component.editDisplay = false;
    component.displayEditor();
    expect(firebase.auth().currentUser).toBeNull();
    expect(component.editDisplay).toBeFalsy();
    spyOn(component, "displayEditor").and.callFake( function() {
      component.editDisplay = true;
    });
    component.displayEditor();
    expect(component.displayEditor).toHaveBeenCalled();
    expect(component.editDisplay).toBeTruthy();
  });
});
