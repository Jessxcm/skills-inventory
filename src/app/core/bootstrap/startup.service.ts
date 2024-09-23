import { Injectable } from '@angular/core';
import { AuthService, User } from '@core/authentication';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { switchMap, tap } from 'rxjs/operators';
import { Menu, MenuService } from './menu.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  user: User | null = null;
  currentRole = '';
  currentPermissions: string[] = [];
  permissionsOfRole: any = {
    ADMIN: ['canAdd', 'canDelete', 'canEdit', 'canRead'],
    MANAGER: ['canAdd', 'canEdit', 'canRead'],
    GUEST: ['canRead'],
  };

  constructor(
    private authService: AuthService,
    private menuService: MenuService,
    private permissionsSrv: NgxPermissionsService,
    private rolesSrv: NgxRolesService
  ) {}

  /**
   * Load the application only after getting the menu or other essential information
   * such as permissions and roles.
   */
  load(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.authService
        .change()
        .pipe(
          tap(user => this.setUserAndPermissions(user)),
          switchMap(() => this.authService.menu()),
          tap(menu => this.setMenu(menu))
        )
        .subscribe({
          next: () => resolve(this.onPermissionChange()),
          error: err => {
            console.error('An error occurred during loading:', err);
            resolve();
          },
        });
    });
  }

  private setMenu(menu: Menu[]) {
    this.menuService.addNamespace(menu, 'menu');
    this.menuService.set(menu);
  }

  private setUserAndPermissions(user: User) {
    this.user = user;
    if (user) {
      this.setPermissions(user);
    }
  }

  private setPermissions(user: User) {
    const rolePermissionsMap: { [role: string]: string[] } = {
      Administrator: ['canAdd', 'canDelete', 'canEdit', 'canRead'],
      Manager: ['canAdd', 'canEdit', 'canRead'],
      Guest: ['canRead'],
    };

    this.user = user;
    this.currentRole = user?.role || '';
    this.currentPermissions = rolePermissionsMap[this.currentRole] || [];

    this.permissionsSrv.loadPermissions(this.currentPermissions);
    this.rolesSrv.flushRoles();
    this.rolesSrv.addRoleWithPermissions(this.currentRole, this.currentPermissions);
  }

  private onPermissionChange() {
    const roleMapping: { [role: string]: string } = {
      Administrator: 'ADMIN',
      Manager: 'MANAGER',
      Guest: 'GUEST',
    };

    console.log('user:', this.user);

    if (this.user && this.user.role in roleMapping) {
      this.currentRole = roleMapping[this.user.role];
      console.log(`Es ${this.user.role.toLowerCase()}`);
    } else {
      this.currentRole = '';
    }

    this.currentPermissions = this.permissionsOfRole[this.currentRole] || [];
    this.rolesSrv.flushRolesAndPermissions();
    this.rolesSrv.addRoleWithPermissions(this.currentRole, this.currentPermissions);
  }
}
