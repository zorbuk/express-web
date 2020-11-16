const express = require('express')
const Turtle = require('../models/turtle')
const router = new express.Router()

router.post('/turtles', async (req, res) => {
    const turtle = new Turtle(req.body)

    try {
        await turtle.save()
        res.status(201).send(turtle)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/turtles', async (req, res) => {
    try {
        const turtles = await Turtle.find({})
        res.send(turtles)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/turtles/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const turtle = await Turtle.findById(_id)

        if (!turtle) {
            return res.status(404).send()
        }

        res.send(turtle)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/turtles/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'type', 'image']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const turtle = await Turtle.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!turtle) {
            return res.status(404).send()
        }

        res.send(turtle)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/turtles/:id', async (req, res) => {
    try {
        const turtle = await Turtle.findByIdAndDelete(req.params.id)

        if (!turtle) {
            res.status(404).send()
        }

        res.send(turtle)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router