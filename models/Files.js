const {Schema, model, Types} = require('mongoose')

const schema = new Schema ({
    imageSrc: {type: String, required: true},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Files', schema)