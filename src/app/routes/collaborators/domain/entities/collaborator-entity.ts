import { ProjectEntity } from 'app/routes/projects/domain/entities/project2';
import { SkillEntity } from 'app/routes/skills/domain/entities/skill-entity';

interface Collaborator {
  id: number;
  skills: SkillEntity[];
  projects: ProjectEntity[];
  gender: string;
  name: Name;
  civilStatus: string;
  job: Job;
  location: Location;
  citizenship: string;
  email: string;
  login: Login;
  dob: Dob;
  registered: Registered;
  phone: string;
  cell: string;
  document: Document;
  picture: Picture;
  studies: Studies[];
}

interface Name {
  first: string;
  last: string;
}
interface Job {
  position: string;
  cesantias: string;
  eps: string;
  pension: string;
  rh: string;
  salary: string;
  dateAdmission: string;
  status: string;
}

interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number;
}

interface Street {
  number: number;
  name: string;
}

interface Login {
  username: string;
  password: string;
}

interface Dob {
  date: string;
  age: number;
}

interface Registered {
  date: string;
  age: number;
}
interface Social {
  linkedin: string;
}

interface Document {
  type: string;
  number: string;
}

interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}
interface Studies {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
  institution: string;
}

export type CollaboratorEntity = Collaborator;
