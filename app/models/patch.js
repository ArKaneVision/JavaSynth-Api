const mongoose = require('mongoose')

const patchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  oscSettings: {
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
      }
    },
    oscillator: {
      type: {
        type: String,
        required: true
      },
      modulationIndex: {
        type: Number,
        required: true
      },
      harmonicity: {
        type: Number,
        required: true
      }
    }
  },
  effects: {
    distortion: {
      type: Number,
      required: true
    },
    freeverb: {
      roomSize: {
        type: Number,
        required: true
      },
      dampning: {
        type: Number,
        required: true
      },
      wetDry: {
        type: Number,
        required: true
      }
    },
    phaser: {
      frequency: {
        type: Number,
        required: true
      },
      octaves: {
        type: Number,
        required: true
      },
      baseFrequency: {
        type: Number,
        required: true
      },
      wetDry: {
        type: Number,
        required: true
      }
    },
    pingPong: {
      delayTime: {
        type: Number,
        required: true
      },
      feedBack: {
        type: Number,
        required: true
      },
      wetDry: {
        type: Number,
        required: true
      }
    }
  },
  master: {
    noteLength: {
      type: Number,
      required: true
    }
  }
})

module.exports = mongoose.model('Patch', patchSchema)
