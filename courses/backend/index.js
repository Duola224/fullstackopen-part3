const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Pingoing now!</h1>')
})
// GET All Notes
app.get('/api/notes', (req, res) => {
    res.json(notes)
})

// GET A Note by id
app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id) - 1
    const note = notes.find( n => n.id === id)

    if(!note){
        return res.status(404).end()
    }
    res.json(note)
})

// DELETEA Note 

app.delete('/api/notes/:id', (req, res) => {
    notes = notes.filter(note => note.id !== Number(req.params.id))
    res.status(204).end()
})

// PATCH Note
app.patch('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id) - 1
    console.log(notes[id])
    notes[id] = {...notes[id], ...req.body}
    console.log("New note is: ", newNote)
    res.status(201).end()
})

app.post('/api/notes/', (req, res) => {
    console.log("Body: → \n", req.body)
    const note = req.body
    notes.push(note)
    console.log("\n → ", notes)
    res.status(201).send(notes)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, (req, res) => {
    console.log(`Server running on port ${PORT}`)
})
