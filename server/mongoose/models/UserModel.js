const mongoose = require('mongoose')

const Schema = mongoose.Schema

let UserSchme = new Schema({
    userName: {
        type: Number,
        required: true
    },
    password: {
        type: Number,
        required: true
    }
})

let UserModel = mongoose.model('user', UserSchme)

module.exports = UserModel