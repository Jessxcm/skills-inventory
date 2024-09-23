import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsViewsCardCollaboratorComponent } from './card-collaborator.component';

describe('CollaboratorsViewsCardCollaboratorComponent', () => {
  let component: CollaboratorsViewsCardCollaboratorComponent;
  let fixture: ComponentFixture<CollaboratorsViewsCardCollaboratorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CollaboratorsViewsCardCollaboratorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorsViewsCardCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
