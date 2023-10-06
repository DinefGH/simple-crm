import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalBeforeLoginComponent } from './legal-before-login.component';

describe('LegalBeforeLoginComponent', () => {
  let component: LegalBeforeLoginComponent;
  let fixture: ComponentFixture<LegalBeforeLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LegalBeforeLoginComponent]
    });
    fixture = TestBed.createComponent(LegalBeforeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
