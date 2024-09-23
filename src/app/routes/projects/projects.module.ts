import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { ProjectsRoutingModule } from './projects-routing.module';
import { FormProjectComponent } from './views/form-project/form-project.component';
import { ListProjectsComponent } from './views/list-projects/list-projects.component';

@NgModule({
  declarations: [ListProjectsComponent, FormProjectComponent],
  imports: [CommonModule, ProjectsRoutingModule, SharedModule],
})
export class ProjectsModule {}
