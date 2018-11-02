import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
});
