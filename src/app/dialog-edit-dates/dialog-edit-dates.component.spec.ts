import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditDatesComponent } from './dialog-edit-dates.component';

describe('DialogEditDatesComponent', () => {
  let component: DialogEditDatesComponent;
  let fixture: ComponentFixture<DialogEditDatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditDatesComponent]
    });
    fixture = TestBed.createComponent(DialogEditDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
