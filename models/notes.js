const mongoose = require ('mongoose')

const notesSchema = new mongoose.Schema({
    date: { type: Date, default: new Date()},
    content: {type: String},
    user: {type: String}  
})

module.exports = mongoose.model('notes', notesSchema)