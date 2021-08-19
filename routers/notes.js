const express = require('express')
const router = express.Router()
const Notes = require('../models/notes')
const status = require('http-status');

router.use(express.json())

router.get('/', async (req,res) => {
    Notes.find()
    .then(doc => {
        res.status(status.OK).json(doc)
    })
    .catch(err => {
        res.status(status.INTERNAL_SERVER_ERROR).json({
            error: err.toString()
        })
    })
})

router.post('/addNote', async (req,res) => {
    const user= req.body.user
    const content = req.body.content
    let data = {
        date: new Date(),
        content: content,
        user: user,
    }
    Notes.create(data).then(doc => {
        res.status(status.OK).json({
            created: true
        })
    }).catch(err =>{
        res.status(status.INTERNAL_SERVER_ERROR).json({
            error: err.toString()
        })
    })
})

router.post('/editNote', (req,res) => {
    const id= req.body.id
    const content = req.body.content

    Notes.findByIdAndUpdate({_id: id}, {$set: {content: content}})
    .then(doc =>{
        res.status(status.OK).json({
            updated: true
        })
    })
    .catch(err => {
        res.status(status.INTERNAL_SERVER_ERROR).json({
            error: err.toString()
        })
    })
})

router.delete('/deleteNote/:id', (req,res) => {
    const id= req.params.id
    Notes.findByIdAndDelete({_id:id})
    .then(doc => {
        res.status(status.OK).json({
            deleted: true
        })
    })
    .catch(err => {
        res.status(status.INTERNAL_SERVER_ERROR).json({
            error: err.toString()
        })
    })
})

module.exports = router