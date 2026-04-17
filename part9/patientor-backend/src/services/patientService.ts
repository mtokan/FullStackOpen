import patients from '../../data/patients';
import {Entry, EntryWithoutId, NewPatient, Patient, PatientWithoutSSN} from '../types';
import { v4 as uuid } from 'uuid';

const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

const getPatientById = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

const addEntryToPatient = (patient: Patient, newEntry: EntryWithoutId): Entry => {
    const entry: Entry = {...newEntry, id: uuid()};
    patient.entries.push(entry);
    return entry;
};

const addPatient = (newPatient: NewPatient): PatientWithoutSSN => {
    const patient: Patient = {
        id: uuid(),
        entries: Array<Entry>(),
        ...newPatient,
    };
    patients.push(patient);

    return {
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation
    };
};

export default { getPatientsWithoutSSN, addPatient, getPatientById, addEntryToPatient };