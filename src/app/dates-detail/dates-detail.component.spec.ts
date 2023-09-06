import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatesDetailComponent } from './dates-detail.component';

describe('DatesDetailComponent', () => {
  let component: DatesDetailComponent;
  let fixture: ComponentFixture<DatesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatesDetailComponent]
    });
    fixture = TestBed.createComponent(DatesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
