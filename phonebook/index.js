const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())

morgan.token('body', (req) => console.log(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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

app.get('/', (req, res) => {
    res.status(200).json({message: "Server started successfully!"})
})
app.get('/info', (req, res) => {
    res.status(200).send(`<p>Phone has ${getNbOfEntries()} info of people</p>  ${new Date()}`)
})

app.get('/api/persons', (req, res) => {
    res.status(200).json(persons)
})

// GET A Person
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(pers => pers.id === id)

    if(!person) {
        return res.status(404).send("Person not found")
    }
    res.status(200).json(person)
})
// DELETE A Person
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const people = persons.filter(pers => pers.id !== id)
    persons = people
    res.status(204).end()
})
// CREATE A Person
app.post('/api/persons/', (req, res) => {
    const person = req.body
    const exist = !persons.find(pers => pers.name === person.name)? false : true
    if(!req.body.name || !req.body.number) {
      return res.status(403).send("Person's name or number is missing !")
    }
    
    if(exist) {
      return res.status(403).send("Entry already exist !")
    }

    person.id = getId()
    persons = persons.concat(person)

    
    res.status(201).json(person)
})

const getId = () => Math.floor(Math.random()*32145698799)

const getNbOfEntries = () => persons.length


const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server start on ${PORT} and persons tables contain: `, PORT)
})
