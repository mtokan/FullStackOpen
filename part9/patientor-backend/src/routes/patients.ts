import { Router, Response } from 'express';
import patientService from "../services/patientService";
import { PatientWithoutSSN } from '../types';
import {toNewPatient} from "../utils";


const router = Router();

router.get('/', (_req, res: Response<PatientWithoutSSN[]>) => {
    res.send(patientService.getPatientsWithoutSSN());
});

router.post('/', (req, res: Response<PatientWithoutSSN|string>) => {
    try {
        const newPatient = toNewPatient(req.body);
        const patientWithoutSSN = patientService.addPatient(newPatient);
        res.json(patientWithoutSSN);
    } catch (error: unknown) {
        let errorMessage = 'Error adding patient';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;