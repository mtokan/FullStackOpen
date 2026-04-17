import z from 'zod';
import {DiagnosisSchema, EntrySchema, EntrySchemaWithoutId, NewPatientSchema, PatientSchema} from './schemas';

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export type Diagnosis = z.infer<typeof DiagnosisSchema>;
export type Patient = z.infer<typeof PatientSchema>;
export type Entry = z.infer<typeof EntrySchema>;
export type EntryWithoutId = z.infer<typeof EntrySchemaWithoutId>;
export type PatientWithoutSSN = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = z.infer<typeof NewPatientSchema>;