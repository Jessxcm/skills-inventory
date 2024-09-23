import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SkillsRoutingModule } from './skills-routing.module';
import { ListSkillsComponent } from './views/list-skills/list-skills.component';
import { FormSkillComponent } from './views/form-skill/form-skill.component';

const COMPONENTS: any[] = [];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, SkillsRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, ListSkillsComponent, FormSkillComponent],
})
export class SkillsModule {}
