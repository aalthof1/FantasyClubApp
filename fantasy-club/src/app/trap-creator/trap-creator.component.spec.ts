import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrapCreatorComponent } from './trap-creator.component';

describe('TrapCreatorComponent', () => {
  let component: TrapCreatorComponent;
  let fixture: ComponentFixture<TrapCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrapCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrapCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
