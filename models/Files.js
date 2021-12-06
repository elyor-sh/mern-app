const {Schema, model, Types} = require('mongoose')

const schema = new Schema ({
    name: {type: String, required: true},
    type: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
    description: {type: String, default: ''},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Files', schema)