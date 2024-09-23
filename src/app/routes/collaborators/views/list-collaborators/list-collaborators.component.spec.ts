import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsViewsListCollaboratorsComponent } from './list-collaborators.component';

describe('CollaboratorsViewsListCollaboratorsComponent', () => {
  let component: CollaboratorsViewsListCollaboratorsComponent;
  let fixture: ComponentFixture<CollaboratorsViewsListCollaboratorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CollaboratorsViewsListCollaboratorsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorsViewsListCollaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
