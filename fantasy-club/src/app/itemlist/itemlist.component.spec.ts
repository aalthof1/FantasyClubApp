import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
});
