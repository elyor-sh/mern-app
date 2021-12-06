const {Schema, model, Types} = require('mongoose')

const schema = new Schema ({
    link: {type: String, required: true, sparse: false},
    date: {type: Date, default: Date.now},
    description: {type: String, default: ''},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Link', schema)