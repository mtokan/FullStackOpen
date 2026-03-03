import patients from '../../data/patients';
import {NewPatient, Patient, PatientWithoutSSN} from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
    return patients;
};

const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

const addPatient = (newPatient: NewPatient): PatientWithoutSSN => {
    const patient: Patient = {
        id: uuid(),
        ...newPatient
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

export default { getPatients, getPatientsWithoutSSN, addPatient };