import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditTasksComponent } from './dialog-edit-tasks.component';

describe('DialogEditTasksComponent', () => {
  let component: DialogEditTasksComponent;
  let fixture: ComponentFixture<DialogEditTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditTasksComponent]
    });
    fixture = TestBed.createComponent(DialogEditTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
