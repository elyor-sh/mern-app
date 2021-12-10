const {Schema, model} = require('mongoose')

const schema = new Schema ({
    uniqueKey: {type: String, required: true, unique: true},
    ip: {type: String, default: ''},
    clientAddress: {type: String, default: ''},
    email: {type: String, required: true},
})

module.exports = model('Candidate', schema)