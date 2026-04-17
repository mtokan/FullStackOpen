import * as React from 'react'

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "Low Risk" = 1,
  "High Risk" = 2,
  "Critical Risk" = 3
}

interface BaseEntry {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;
export type EntryType = Entry['type'];

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  ssn: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type OccupationalHealthcareEntryFormProps = {
  employerName: string;
  sickLeaveStartDate: string;
  sickLeaveEndDate: string;
  sickLeave: boolean;
  submitted: boolean;
  setSickLeave: React.Dispatch<React.SetStateAction<boolean>>;
  setSickLeaveStartDate: React.Dispatch<React.SetStateAction<string>>;
  setSickLeaveEndDate: React.Dispatch<React.SetStateAction<string>>;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
};

export type HealthCheckEntryFormProps = {
  healthCheckRating: HealthCheckRating;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>
};

export type HospitalEntryFormProps = {
  dischargeDate: string;
  dischargeCriteria: string;
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
  setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
  submitted: boolean;
};