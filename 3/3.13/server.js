  
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Note = require('./models/note')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())



  



let notes = [
  
]
const date=new Date("2019-08-02T11:30:00+10:00")
let a=notes.length
console.log(a)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/persons', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})






app.get('/info', (req, res) => {
  res.send(`<h1> There is ${a} persons. ${date.toString()}</h1>`)
})





  


//...





app.get('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/persons', (request, response) => {
  const body = request.body

  

 

  const note =new Note( {
    
    
    id: body.id,
    name: body.name,
    puh: body.puh,
  
  }
  )
  notes=notes.concat(note)
  note.save().then(savedNote => {
    response.json(savedNote)
  })
  
})








const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



