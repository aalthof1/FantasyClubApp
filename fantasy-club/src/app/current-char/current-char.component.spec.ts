import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCharComponent } from './current-char.component';

describe('CurrentCharComponent', () => {
  let component: CurrentCharComponent;
  let fixture: ComponentFixture<CurrentCharComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentCharComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentCharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
