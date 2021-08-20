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

router.post('/searchUser', async (req,res) =>{
    const dataJS=req.body.data
    Notes.find({user: dataJS.user})
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
    const dataJS= req.body.data
    let data = {
        date: dataJS.date,
        content: dataJS.content,
        user: dataJS.user,
    }
    console.log(data)
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