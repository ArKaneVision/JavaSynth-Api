// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Preset = require('../models/preset')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET to /presets

router.get('/presets', (req, res, next) => {
  Preset.find()
    .then(presets => {
      return presets.map(preset => preset.toObject())
    })
    .then(presets => res.status(200).json({ presets: presets }))
    .catch(next)
})

// SHOW
// GET to /presets/:id

router.get('/presets/:id', (req, res, next) => {
  Preset.findById(req.params.id)
    .then(handle404)
    .then(preset => res.status(200).json({ preset: preset.toObject() }))
})

// CREATE
// POST to /presets

router.post('/presets', requireToken, (req, res, next) => {
  req.body.preset.owner = req.user.id

  Preset.create(req.body.preset)
    .then(preset => {
      res.status(201).json({ preset: preset.toObject() })
    })
    .catch(next)
})

// UPDATE
// PATCH to /presets/:id

router.patch('/presets/:id', requireToken, removeBlanks, (req, res, next) => {
  Preset.findById(req.params.id)
    .then(handle404)
    .then(preset => {
      requireOwnership(req, preset)
      console.log(preset)
      return preset.updateOne(req.body)
    })
    .then(preset => (console.log(preset)))
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DELETE
// delete to /presets/:id

router.delete('/presets/:id', requireToken, (req, res, next) => {
  Preset.findById(req.params.id)
    .then(handle404)
    .then(preset => {
      requireOwnership(req, preset)
      preset.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
