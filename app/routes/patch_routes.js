// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Patch = require('../models/patch')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET to /patches

router.get('/patches', (req, res, next) => {
  Patch.find()
    .then(patches => {
      return patches.map(patch => patch.toObject())
    })
    .then(patches => res.status(200).json({ patches: patches }))
    .catch(next)
})

// SHOW
// GET to /patches/:id

router.get('/patches/:id', (req, res, next) => {
  Patch.findById(req.params.id)
    .then(handle404)
    .then(patch => res.status(200).json({ patch: patch.toObject() }))
})

// CREATE
// POST to /patches

router.post('/patches', requireToken, (req, res, next) => {
  req.body.patch.owner = req.user.id

  Patch.create(req.body.patch)
    .then(patch => {
      res.status(201).json({ patch: patch.toObject() })
    })
    .catch(next)
})

// UPDATE
// PATCH to /patches/:id

router.patch('/patches/:id', requireToken, removeBlanks, (req, res, next) => {
  Patch.findById(req.params.id)
    .then(handle404)
    .then(patch => {
      requireOwnership(req, patch)
      return patch.updateOne(req.body)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DELETE
// delete to /patches/:id

router.delete('/patches/:id', requireToken, (req, res, next) => {
  Patch.findById(req.params.id)
    .then(handle404)
    .then(patch => {
      requireOwnership(req, patch)
      patch.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
