import {PatientSchema} from './schemas';
import {Patient} from './types';

export const toPatient = (obj: unknown): Patient => PatientSchema.parse(obj);