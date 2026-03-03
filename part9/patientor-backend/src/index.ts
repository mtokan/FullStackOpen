import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const app = express();
const corsOptions = {
    origin: 'http://localhost:5173',
};
app.use(cors(corsOptions),express.json());
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    res.send('Pong');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});