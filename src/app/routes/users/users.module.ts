import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { ListUsersComponent } from './views/list-users/list-users.component';
import { FormUserComponent } from './views/form-user/form-user.component';

const COMPONENTS: any[] = [];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, UsersRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, ListUsersComponent, FormUserComponent],
})
export class UsersModule {}
