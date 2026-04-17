import z from 'zod';
import {Gender, HealthCheckRating} from './types';

export const DiagnosisSchema = z.object({
    code: z.string(),
    name: z.string(),
    latin: z.string().optional(),
});

const BaseEntrySchema = z.object({
    description: z.string(),
    date: z.iso.date(),
    specialist: z.string(),
    diagnosisCodes: z.array(DiagnosisSchema.shape.code).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.enum(HealthCheckRating),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: z.object({
        startDate: z.iso.date(),
        endDate: z.iso.date(),
    }).optional(),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: z.object({
        date: z.iso.date(),
        criteria: z.string(),
    }),
});

export const EntrySchemaWithoutId = z.discriminatedUnion("type", [
    HealthCheckEntrySchema,
    OccupationalHealthcareEntrySchema,
    HospitalEntrySchema,
]);

export const EntrySchema = z.discriminatedUnion("type", [
    HealthCheckEntrySchema.extend({ id: z.string() }),
    OccupationalHealthcareEntrySchema.extend({ id: z.string() }),
    HospitalEntrySchema.extend({ id: z.string() }),
]);

export const PatientSchema = z.object({
    id: z.string(),
    name: z.string(),
    dateOfBirth: z.iso.date(),
    gender: z.enum(Gender),
    occupation: z.string(),
    ssn: z.string(),
    entries: z.array(EntrySchema),
});

export const NewPatientSchema = PatientSchema.omit({id: true, entries:true});

