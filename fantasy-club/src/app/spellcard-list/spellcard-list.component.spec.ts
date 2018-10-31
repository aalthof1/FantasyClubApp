import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
});
