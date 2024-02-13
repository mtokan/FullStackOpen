const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const app = express();
morgan.token('body', req => JSON.stringify(req.body))

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('dist'))
app.use(cors());

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const generateId = () => {
    return Math.floor(Math.random() * 10000);
}

app.get('/api/persons', (req, res) => {
    res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);

    if (person)
        res.json(person);
    else
        res.status(404).end();
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();
})

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if(!body.name || !body.number){
        return res.status(400).json({error: 'name or number missing'})
    }

    if(persons.some(person => person.name.toLowerCase() === body.name.toLowerCase())) {
        return res.status(400).json({error: 'name must be unique'})
    }

    const newPerson = {...body, id: generateId()};
    persons = persons.concat(newPerson);
    res.json(newPerson);

})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date().toString()}</p>`);
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));