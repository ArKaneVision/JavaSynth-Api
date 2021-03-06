# JavaSynth API

  JavaSynth is a browser based synthesizer built using Tone.js and React.

  This is the API for the user created patches.

  Users can save their synth settings and create patches that are stored in this API which was
  built using MongoDB, Mongoose, and Express.

  The data storage is simple, The JSON objects in the DB are a mirror of the react state that is used collectively by
  all of the components in the synthesizer. Each is a large document with no relationship besides to the user
  who created them

## Front End

  Check out the deployed front end site [Here]

  And check out the client repo [Here](https://github.com/ArKaneVision/JavaSynth-Client)

## Technologies used
  * MongoDB
  * Mongoose
  * Express
  * Curl
  * JavaScript
  * Node.js

## Install
  to install dependencies run ` npm install `

## Future Features

  I would like to add functions to the back end that aggregate stats about users
  and create a social media like experience sharing synth settings.

  Far future I would like to create an AI that sorts the synth settings by tone types.

## Why MongoDB

  I chose to use MongoDB because of the shape of my data, The model is perfect to
  be represented by a JSON object. It is scalable and fast for large simple files

## Catalog of Routes

| Method   | URI           |
| ---------|:-------------:|
| GET      | /patches      |
| GET      | /patches/:id  |
| POST     | /patches      |
| PATCH    | /patches/:id  |
| DELETE   | /patches/:id  |

## Entity Relationship Diagram

![ERD](https://imgur.com/O1chFfU.png)
