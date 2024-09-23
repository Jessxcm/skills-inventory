import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicsViewsFormMedicComponent } from './form-medic.component';

describe('MedicsViewsFormMedicComponent', () => {
  let component: MedicsViewsFormMedicComponent;
  let fixture: ComponentFixture<MedicsViewsFormMedicComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MedicsViewsFormMedicComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicsViewsFormMedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
