import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionPaneComponent } from './option-pane.component';

describe('OptionPaneComponent', () => {
  let component: OptionPaneComponent;
  let fixture: ComponentFixture<OptionPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
