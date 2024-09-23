import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMedicsComponent } from './views/list-medics/list-medics.component';
import { FormMedicComponent } from './views/form-medic/form-medic.component';

const routes: Routes = [
  {
    path: '',
    component: ListMedicsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicsRoutingModule {}
