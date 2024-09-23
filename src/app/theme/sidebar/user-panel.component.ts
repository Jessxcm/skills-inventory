import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '@core/authentication';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'app-user-panel',
  template: `
    <div class="matero-user-panel">
      <img class="matero-user-panel-avatar" [src]="user.avatar" alt="avatar" width="64" />
      <h4 class="matero-user-panel-name">{{ user.name | uppercase }}</h4>
      <h5 class="matero-user-panel-email">{{ user.email }}</h5>
      <h5 class="matero-user-panel-email">{{ user.role }}</h5>
      <div class="matero-user-panel-icons">
        <button mat-icon-button routerLink="/profile/overview">
          <mat-icon class="icon-18">account_circle</mat-icon>
        </button>
        <button mat-icon-button routerLink="/profile/settings">
          <mat-icon class="icon-18">settings</mat-icon>
        </button>
        <button mat-icon-button (click)="logout()">
          <mat-icon class="icon-18">exit_to_app</mat-icon>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./user-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserPanelComponent implements OnInit {
  user!: User;

  constructor(private utilsSvc: UtilsService, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user().subscribe(user => (this.user = user));
  }

  goToProfile(collaborator: any) {
    this.utilsSvc.setCollaborator(collaborator);
    //this.router.navigate(['/profile/settings']);
    this.router.navigate(['/profile/overview']);
  }

  logout() {
    this.auth.logout().subscribe(() => this.router.navigateByUrl('/auth/login'));
  }
}
