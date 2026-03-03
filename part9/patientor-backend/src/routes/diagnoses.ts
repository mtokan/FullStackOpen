import { Router } from 'express';
import diagnosisService from '../services/diagnosisService';

const router = Router();

router.get('/', (_req, res) => {
    res.send(diagnosisService.getDiagnoses());
});

export default router;