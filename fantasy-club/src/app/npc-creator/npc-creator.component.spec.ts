import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcCreatorComponent } from './npc-creator.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

describe('NpcCreatorComponent', () => {
  let component: NpcCreatorComponent;
  let fixture: ComponentFixture<NpcCreatorComponent>;
  let sidebar : SidebarComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpcCreatorComponent ],
      providers: [SidebarComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpcCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sidebar = TestBed.get(SidebarComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should construct', () => {
    expect(component.userId).toEqual(sidebar.user_id);
  });

  it('should initialize fields', () => {
    expect(component.name).toBeUndefined();
    expect(component.desc).toBeUndefined();
  });

  it('should say user is GM', () => {
    sidebar.user_priv = 2;
    expect(component.isUserGM()).toBeTruthy();
    sidebar.user_priv = 3;
    expect(component.isUserGM()).toBeTruthy();
    sidebar.user_priv = 1;
    expect(component.isUserGM()).toBeFalsy();
  });

  it('should say user is logged in', () => {
    sidebar.user_id = "";
    expect(component.isUserLogged()).toBeFalsy();
    sidebar.user_id = "test";
    expect(component.isUserLogged()).toBeTruthy();
  });
});
