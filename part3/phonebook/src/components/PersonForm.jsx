import {useState} from "react";
import personService from "../services/persons.js"

const PersonForm = ({persons, setPersons, setNotification}) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    const addPerson = (event) => {
        event.preventDefault();
        if (newName === '' || newNumber === '') {
            alert('name or number cannot be empty');
            return;
        }
        const isNameExist = persons.some(person =>
            person.name === newName
        );
        const isNumberExist = persons.some(person =>
            person.number === newNumber
        );
        if (isNameExist && isNumberExist) {
            alert(`${newName} ${newNumber} is already added to phonebook`)
        } else if (isNameExist) {
            if (window.confirm(`${newName} is already added, replace the old number?`)) {
                const existingPerson = persons.find(person => person.name === newName);
                const updatedPerson = {...existingPerson, number: newNumber};
                const newPersonList = persons.filter(person => person.id !== existingPerson.id).concat(updatedPerson)
                personService
                    .update(updatedPerson.id, updatedPerson);
                setNewName('');
                setNewNumber('');
                setPersons(newPersonList);
            }
        } else if (isNumberExist) {
            const owner = persons.find(person =>
                person.number === newNumber
            )
            alert(`Number ${newNumber} already saved under the name ${owner.name}`)
        } else {
            const newPerson = {name: newName, number: newNumber, id: persons.length + 1}
            personService
                .create(newPerson)
                .then(returnedPerson => {
                    setNotification({message: `Added ${returnedPerson.name}`, isError: false})
                    setTimeout(() => setNotification(null), 5000)
                    setPersons(persons.concat(returnedPerson));
                    setNewName('');
                    setNewNumber('');
                })
        }
    }

    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;