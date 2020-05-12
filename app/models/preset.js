const mongoose = require('mongoose')

const presetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  envelope: {
    attack: {
      type: Number,
      required: true
    },
    decay: {
      type: Number,
      required: true
    },
    sustain: {
      type: Number,
      required: true
    },
    release: {
      type: Number,
      required: true
    }}
})

module.exports = mongoose.model('Preset', presetSchema)
