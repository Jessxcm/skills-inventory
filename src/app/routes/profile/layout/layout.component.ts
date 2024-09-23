import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@core/authentication';
import { UtilsService } from '@shared/services/utils.service';
import { CollaboratorEntity } from 'app/routes/collaborators/domain/entities/collaborator-entity';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class ProfileLayoutComponent implements OnInit {
  icon_header = 'person';
  title_header = 'Personal Profile';
  user!: User;
  collaborator!: CollaboratorEntity;
  srcResult: any;

  Data = [
    { Id: 101, Name: 'Nitin', Salary: 1234 },
    { Id: 102, Name: 'Sonu', Salary: 1234 },
    { Id: 103, Name: 'Mohit', Salary: 1234 },
    { Id: 104, Name: 'Rahul', Salary: 1234 },
    { Id: 105, Name: 'Kunal', Salary: 1234 },
  ];

  constructor(private auth: AuthService, private utilsSvc: UtilsService) {
    this.auth.user().subscribe(user => (this.user = user));
    this.collaborator = this.utilsSvc.getCollaborator() || undefined;
  }

  ngOnInit(): void {
    //this.auth.user().subscribe(user => (this.user = user));
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  savePDF() {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [['Full Name', 'Position']],
      body: [
        [
          this.collaborator?.name?.first + ' ' + this.collaborator?.name?.last,
          this.collaborator?.job?.position,
        ],
      ],
    });

    autoTable(doc, {
      head: [['Country', 'State', 'City']],
      body: [
        [
          this.collaborator?.location?.country,
          this.collaborator?.location?.state,
          this.collaborator?.location?.city,
        ],
      ],
    });

    autoTable(doc, {
      head: [['Email', 'Mobile']],
      body: [[this.collaborator?.email, this.collaborator?.phone]],
    });

    const col = [['Skill', 'Experience']];
    const rows: any[] = [];

    const skills = this.collaborator.skills || [];
    console.log('skills: ', skills);

    skills.forEach((element: { name: any; experience: any }) => {
      const temp = [element.name, element.experience];
      rows.push(temp);
    });

    autoTable(doc, {
      head: col,
      body: rows,
    });

    doc.text(
      'Hoja de Vida : ' + (this.collaborator?.name?.first + ' ' + this.collaborator?.name?.last),
      60,
      10
    );
    doc.save(
      'CV ' + (this.collaborator?.name?.first + ' ' + this.collaborator?.name?.last) + '.pdf'
    );
  }

  getCollaborator(collaborator: any) {
    //console.log('collaborator: ', collaborator);
    //console.log('collaborator from here: ', this.collaborator);
  }
}
