// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Preset = require('../models/preset')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
// const requireOwnership = customErrors.requireOwnership

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
    .then(preset => res.status(200).json({ example: preset.toObject() }))
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

module.exports = router
