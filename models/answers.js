const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  name: {
    type: String,
    //set to true when testing is done
    required: false
  },
  answers: {
    type: Array,
    required: true
  },
  score: {
    type: Array,
    required: true
  },
  time: {
    type: Date,
    default: Date.now,
    required: true
  }
})

module.exports = mongoose.model('Answers', answerSchema)