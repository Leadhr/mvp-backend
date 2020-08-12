const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

const questionSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answers: {
    type: [answerSchema],
    required: true
  }
})

module.exports = mongoose.model('Question', questionSchema)