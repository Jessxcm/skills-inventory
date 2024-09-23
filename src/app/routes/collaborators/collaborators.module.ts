import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CollaboratorsRoutingModule } from './collaborators-routing.module';
import { CollaboratorsViewsListCollaboratorsComponent } from './views/list-collaborators/list-collaborators.component';
import { CollaboratorsViewsCardCollaboratorComponent } from './views/card-collaborator/card-collaborator.component';

const COMPONENTS: any[] = [CollaboratorsViewsListCollaboratorsComponent];
const COMPONENTS_DYNAMIC: any[] = [CollaboratorsViewsCardCollaboratorComponent];

@NgModule({
  imports: [SharedModule, CollaboratorsRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class CollaboratorsModule {}
