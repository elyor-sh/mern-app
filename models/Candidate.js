const {Schema, model} = require('mongoose')

const schema = new Schema ({
    uniqueKey: {type: String, required: true, unique: true},
    email: {type: String, required: true},
})

module.exports = model('Candidate', schema)