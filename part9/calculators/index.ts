import express from 'express';
import {calculateBMI} from "./bmiCalculator";
import {calculateExercises} from "./exerciseCalculator";
import {isObject} from "./utils/helpers";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if (!height || isNaN(Number(height)) || !weight || isNaN(Number(weight))) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    return res.send(calculateBMI(Number(height), Number(weight)));
});

app.post('/exercises', (req, res) => {
    const body: unknown = req.body;

    if (!isObject(body)) {
        return res.status(400).send({ error: 'invalid body' });
    }
    if (!('daily_exercises' in body) || !('target' in body)) {
        return res.status(400).send({ error: 'parameters missing' });
    }
    if (!Array.isArray(body.daily_exercises) || typeof body.target !== 'number') {
        return res.status(400).send({ error: 'malformatted parameters' });
    }
    if (body.daily_exercises.some(h => typeof h !== 'number')) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    const dailyExercises = body.daily_exercises.map(Number);
    const target = Number(body.target);

    const result = calculateExercises(target, dailyExercises);
    return res.send(result);
});

const PORT = 3003;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));