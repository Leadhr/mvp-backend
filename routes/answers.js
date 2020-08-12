const express = require('express')
const router = express.Router()
const Answers = require('../models/answers')

//Getting all
// router.get('/', async (req, res) => {
//   try {
//     const question = await Question.find()
//     res.json(question)
//   } catch (err) {
//     res.status(500).json({message: err.message})
//   }
// })
// Getting one
router.get('/:id', getAnswer, (req, res) => {
  res.json(res.answer)
})
//Creating one
router.post('/', async (req, res) => {
  const answer = new Answers({
    name: req.body.name,
    answers: req.body.answers,
  })
  try {
    const newAnswer = await answer.save()
    res.status(201).json(newAnswer)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
//Updating one
router.patch('/:id', getAnswer, async (req, res) => {
  if (req.body.answers != null) {
    res.answer.answers = req.body.answers
  }
  try {
    const updatedAnswer = await res.answer.save()
    res.json(updatedAnswer)
  } catch {
    res.status(400).json({message: err.message})
  }
})
// //Deleting one
// router.delete('/:id', getSubscriber, async (req, res) => {
//   try {
//     await res.subscriber.remove()
//     res.json({ message: 'Deleted Subscriber'})
//   } catch (err) {
//     res.status(500).json({ message: err.message})
//   }
// })

async function getAnswer(req, res, next) {
  let answer
  try {
    answer = await Answers.findById(req.params.id)
    if (answer == null) {
      return res.status(404).json({message: 'Cannot find response'})
    }
  } catch (err) {
      return res.status(500).json({ message: err.message })
  }

  res.answer = answer
  next()

}

module.exports = router