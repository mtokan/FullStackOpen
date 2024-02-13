import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import personService from "./services/persons.js"
import Notification from "./components/Notification.jsx";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [filter, setFilter] = useState('');
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        personService
            .getAll()
            .then(returnedPersons => {
                setPersons(returnedPersons)
            })
    }, []);

    const deletePerson = (name, id) => () => {
        if (window.confirm(`Delete ${name} ?`)) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                })
                .catch(error => {
                    if (error.response.status === 404) {
                        setNotification({
                            message: `Information of ${name} has already been removed from server`,
                            isError: true
                        })
                        setPersons(persons.filter(person => person.id !== id))
                    }
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notification={notification}/>
            <Filter setFilter={setFilter}/>
            <h2>add a new</h2>
            <PersonForm persons={persons} setPersons={setPersons} setNotification={setNotification}/>
            <h2>Numbers</h2>
            <Persons filter={filter} persons={persons} deletePerson={deletePerson}/>
        </div>
    )
}

export default App