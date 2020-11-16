const mongoose = require('mongoose')

const Turtle = mongoose.model('Turtle', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        default: false,
        required: true,
    },
    image: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = Turtle