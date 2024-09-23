import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicsViewsListMedicsComponent } from './list-medics.component';

describe('MedicsViewsListMedicsComponent', () => {
  let component: MedicsViewsListMedicsComponent;
  let fixture: ComponentFixture<MedicsViewsListMedicsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MedicsViewsListMedicsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicsViewsListMedicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
