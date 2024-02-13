const Person = ({name,number,deletePerson}) => {
    return (
        <>
            <p>{name} {number}
                <button onClick={deletePerson}>Delete</button>
            </p>
        </>
    )
}

const Persons = ({filter, persons, deletePerson}) => {
    const filteredPersons =
        filter === ''
            ? persons
            : persons.filter(person =>
                person.name.toLowerCase().includes(filter.toLowerCase())
            );

    return (
        <div>
            {filteredPersons.map(person =>
                <Person key={person.id} name={person.name} number={person.number}
                        deletePerson={deletePerson(person.name,person.id)}/>
            )}
        </div>
    )
}

export default Persons;