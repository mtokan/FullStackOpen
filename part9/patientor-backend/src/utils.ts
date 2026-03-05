import {Gender, NewPatient} from "./types";
import z from "zod";

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    gender: z.enum(Gender),
    occupation: z.string(),
    ssn: z.string(),
});

export const toNewPatient = (obj: unknown): NewPatient => NewPatientSchema.parse(obj);