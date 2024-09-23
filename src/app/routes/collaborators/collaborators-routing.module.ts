import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollaboratorsViewsListCollaboratorsComponent } from './views/list-collaborators/list-collaborators.component';

const routes: Routes = [{ path: '', component: CollaboratorsViewsListCollaboratorsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollaboratorsRoutingModule {}
