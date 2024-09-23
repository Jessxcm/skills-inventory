import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'app-collaborators-views-card-collaborator',
  templateUrl: './card-collaborator.component.html',
  styleUrls: ['./card-collaborator.component.scss'],
})
export class CollaboratorsViewsCardCollaboratorComponent implements OnInit {
  @Input() showSummary!: any; // false
  @Input() collaborator!: any;

  nombreBoton = 'Summary';

  constructor(private utilsSvc: UtilsService, private router: Router) {}

  ngOnInit(): void {
    //console.log('showSummary', this.showSummary);
  }

  goToProfile(collaborator: any) {
    this.utilsSvc.setCollaborator(collaborator);
    //this.router.navigate(['/profile/settings']);
    this.router.navigate(['/profile/overview']);
  }

  rotateCard() {
    this.showSummary = !this.showSummary;
    this.nombreBoton = !this.showSummary ? 'Summary' : 'Skills';
  }
}
