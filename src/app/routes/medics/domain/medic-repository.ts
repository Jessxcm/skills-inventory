import { BaseMethods } from '@core/domain/base-methods-interface';
import { Medic } from './medic';

export type MedicRepository = BaseMethods<Medic>;
//export interface MedicRepository extends BaseMethods<Medic> {} // Esta forma también sirve
