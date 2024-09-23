interface ProjectIdentification {
  id: number; // FIXME: this is not a number
  projectName: string;
}

interface ProjectDetails {
  projectLeader: string;
  commencementDate: string;
  completionDate: string;
}

interface ProjectStatus {
  ProjectStatus: string;
}

// Combine the interfaces
interface ProjectBasic extends ProjectIdentification, ProjectDetails {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProjectStatusOptionals extends ProjectStatus {}

export type ProjectEntity = Required<ProjectBasic> & Partial<ProjectStatusOptionals>;
