import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDashComponent } from './chart-dash.component';

describe('ChartDashComponent', () => {
  let component: ChartDashComponent;
  let fixture: ComponentFixture<ChartDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartDashComponent]
    });
    fixture = TestBed.createComponent(ChartDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
