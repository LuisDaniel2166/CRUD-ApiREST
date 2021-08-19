const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const url = 'mongodb://localhost:27017/myNotes'

const app = express()

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
const con = mongoose.connection

con.on('open', () => {
    console.log('DB connected...')
})

const notesRouter = require('./routers/notes')
app.use('/notes',notesRouter)

app.listen(9000, () => {
    console.log('Server started')
})