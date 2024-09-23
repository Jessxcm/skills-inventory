import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MedicsRoutingModule } from './medics-routing.module';
import { ListMedicsComponent } from './views/list-medics/list-medics.component';
import { FormMedicComponent } from './views/form-medic/form-medic.component';

const COMPONENTS: any[] = [FormMedicComponent];
const COMPONENTS_DYNAMIC: any[] = [ListMedicsComponent];

@NgModule({
  imports: [SharedModule, MedicsRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class MedicsModule {}
