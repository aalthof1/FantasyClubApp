import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCreatorComponent } from './item-creator.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

describe('ItemCreatorComponent', () => {
  let component: ItemCreatorComponent;
  let fixture: ComponentFixture<ItemCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCreatorComponent ],
      providers: [ SidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
