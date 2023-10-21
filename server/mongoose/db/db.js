

module.exports = function (success, error) {
    const mongoose = require("mongoose")
    const { DBHOST, DBPORT, DBNAME } = require('../config/config.js')

    if (typeof error !== 'function') {
        error = () => {
            console.log('连接失败')
        }
    }

    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)


    mongoose.connection.once('open', () => {
        success()
    })

    mongoose.connection.once('error', () => {
        error()
    })

    mongoose.connection.once('close', () => {
        console.log('连接关闭')
    })

} 