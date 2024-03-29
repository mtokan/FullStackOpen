const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fsopen:${password}@fullstackopen.fl8cdf4.mongodb.net/phonebook?
retryWrites=true&w=majority&appName=FullStackOpen`

mongoose.set("strictQuery",false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(person => console.log(person))
        mongoose.connection.close();
    })
} else if(process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close();
    })
} else {
    console.log('give name and number as arguments in this order')
    mongoose.connection.close();
}