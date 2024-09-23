import { BaseMethods } from '@core/domain/base-methods-interface';
import { Project } from '../entities/project';

export type ProjectRepository = BaseMethods<Project>;
//export interface ProjectRepository extends BaseMethods<Project> {} // Esta forma también sirve
