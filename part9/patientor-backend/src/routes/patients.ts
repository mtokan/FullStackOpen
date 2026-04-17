import {Router, Response, Request, NextFunction} from 'express';
import patientService from "../services/patientService";
import {Entry, EntryWithoutId, NewPatient, Patient, PatientWithoutSSN} from '../types';
import {EntrySchemaWithoutId, NewPatientSchema} from '../schemas';
import z from "zod";


const router = Router();

router.get('/', (_req, res: Response<PatientWithoutSSN[]>) => {
    res.json(patientService.getPatientsWithoutSSN());
});

router.get('/:id', (req: Request<{id: string}>, res: Response<Patient | { error: string }>) => {
    const patient = patientService.getPatientById(req.params.id);
    if (patient) res.json(patient);
    else {
        res.status(404).json({ error: 'Patient not found' });
    }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        req.body = NewPatientSchema.parse(req.body);
        next();
    } catch (e: unknown) {
        next(e);
    }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        req.body = EntrySchemaWithoutId.parse(req.body);
        next();
    } catch (e: unknown) {
        next(e);
    }
};

const errorMiddleware = (err: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof z.ZodError) {
        res.status(400).send({ error: err.issues });
    } else {
        next(err);
    }
};

router.post('/', newPatientParser, (req: Request<unknown,unknown,NewPatient>, res: Response<PatientWithoutSSN>) => {
    res.status(201).json(patientService.addPatient(req.body));
});

router.post('/:id/entries', newEntryParser, (req: Request<{id: string}, unknown, EntryWithoutId>, res: Response<Entry | { error: string }>) => {
    const patient = patientService.getPatientById(req.params.id);
    if (patient) {
        res.status(201).json(patientService.addEntryToPatient(patient, req.body));
    }
    else {
        res.status(404).json({ error: 'Patient not found' });
    }
});

router.use(errorMiddleware);

export default router;