

const mongoose = require('mongoose')

// 一个Schema对应一个mongodb collection
const Schema = mongoose.Schema

// 创建文档结构对象
let AccountShema = new Schema({
    title: {
        type: String,
        required: true
    },
    time: Date,
    type: {
        type: String,
        default: -1
    },
    account: {
        type: Number,
        default: -1
    },
    remarks: {
        type: String,
    },
})

// 创建文档模型对象
let AccountModel = mongoose.model('AccountModel', AccountShema)

module.exports = AccountModel