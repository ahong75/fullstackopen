const mongoose = require('mongoose')

if (process.argv.length != 3 && process.argv.length != 5) process.exit(1)

const password = process.argv[2];
const url = 'mongodb+srv://fullstack:uTvzsEsvUIIULpR8@cluster0.fwcjkzg.mongodb.net/phonebook?retryWrites=true&w=majority'

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)
mongoose
    .connect(url)
    .then((result) => {
        if (process.argv.length == 3) {
            console.log('phonebook')
            Person.find({}).then(result => {
                result.forEach(person => {
                    console.log(`${person.name} ${person.number}`)
                })
            })
        }
        if (process.argv.length == 5) {
            const person = new Person({
                name: process.argv[3],
                number: process.argv[4],
            })
            person.save().then(() => console.log('Person saved!'))
        }
        return mongoose.connection.close()
    })
    .catch(error => console.log(error))
