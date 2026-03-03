import {Gender, NewPatient} from "./types";

const isString = (value: unknown): value is string => typeof value === 'string' || value instanceof String;

const isDate = (value: string): boolean => Boolean(Date.parse(value));

const isGender = (value: string): value is Gender => Object.values(Gender).map(g => g.toString()).includes(value);

const parseString = (object: unknown): string => {
    if (!object || !isString(object)) {
        throw new Error('Incorrect or missing data');
    }

    return object;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

export const toNewPatient = (object:unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object &&
        'dateOfBirth' in object &&
        'gender' in object &&
        'occupation' in object &&
        'ssn' in object) {
        return {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation),
            ssn: parseString(object.ssn)
        };
    }

    throw new Error('Incorrect data: some fields are missing');
};