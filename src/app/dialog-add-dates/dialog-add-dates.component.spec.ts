import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddDatesComponent } from './dialog-add-dates.component';

describe('DialogAddDatesComponent', () => {
  let component: DialogAddDatesComponent;
  let fixture: ComponentFixture<DialogAddDatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddDatesComponent]
    });
    fixture = TestBed.createComponent(DialogAddDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
