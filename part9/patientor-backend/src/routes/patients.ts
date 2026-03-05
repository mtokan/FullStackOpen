import {Router, Response, Request, NextFunction} from 'express';
import patientService from "../services/patientService";
import {NewPatient, PatientWithoutSSN} from '../types';
import {NewPatientSchema} from "../utils";
import z from "zod";


const router = Router();

router.get('/', (_req, res: Response<PatientWithoutSSN[]>) => {
    res.send(patientService.getPatientsWithoutSSN());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        req.body = NewPatientSchema.parse(req.body);
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
    res.json(patientService.addPatient(req.body));
});

router.use(errorMiddleware);

export default router;