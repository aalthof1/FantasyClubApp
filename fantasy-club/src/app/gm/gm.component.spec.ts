import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmComponent } from './gm.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

describe('GmComponent', () => {
  let component: GmComponent;
  let fixture: ComponentFixture<GmComponent>;
  let sidebar: SidebarComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmComponent ],
      providers: [ SidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sidebar = TestBed.get(SidebarComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should construct', () => {
    expect(component.app).toEqual(sidebar.app);
    expect(component.userId).toEqual(sidebar.user_id);
  });

  it('should get dice rolls', () => {
    let oldName: string = (document.getElementById("dice-username") as HTMLInputElement).value;
    (document.getElementById("dice-username") as HTMLInputElement).value = "";
    component.getDiceRolls();
    
  });

});
