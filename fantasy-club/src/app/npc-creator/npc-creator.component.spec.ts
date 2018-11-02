import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcCreatorComponent } from './npc-creator.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

describe('NpcCreatorComponent', () => {
  let component: NpcCreatorComponent;
  let fixture: ComponentFixture<NpcCreatorComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
