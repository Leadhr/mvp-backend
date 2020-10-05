const express = require('express')
const router = express.Router()
const Answers = require('../models/answers')
// Getting one
router.get('/:id', getAnswer, (req, res) => {
  res.json(res.answer)
})
//Creating one
router.post('/', async (req, res) => {
  //implement scoring method here
  //key

//1 Achieving
//2 Caring
//3 Commanding
//4 Considering
//5 Enjoying
//6 Exploring
//7 Organizing
//8 Structuring

//version 0 of the scoring array
let scoringArrayV0 = [
  //1
  [6, 2, 7],
  //2
  [3, 1, 2],
  //3
  [1, 5, 7],
  //4
  [8, 5, 6],
  //5
  [1, 4, 2],
  // 6
  [5, 2, 7],
  // 7
  [8, 6, 7],
  // 8
  [8, 1, 4],
  // 9
  [3, 5, 2],
  // 10
  [1, 6, 7],
  // 11
  [3, 6, 2],
  // 12
  [1, 4, 7],
  // 13
  [8, 5, 2],
  // 14
  [3, 6, 7],
  // 15
  [8, 3, 1],
  // 16
  [3, 1, 5],
  // 17
  [1, 5, 6],
  // 18
  [5, 6, 4],
  // 19
  [6, 4, 2],
  // 20
  [4, 2, 7],
  // 21
  [8, 2, 7],
  // 22
  [8, 3, 7],
  // 23
  [8, 6, 4],
  // 24
  [1, 5, 4],
  // 25
  [3, 1, 6],
  // 26
  [8, 3, 5],
  // 27
  [3, 5, 4],
  // 28
  [3, 4, 7],
  // 29
  [8, 3, 6],
  // 30
  [8, 1, 7],
  // 31
  [5, 4, 2],
  // 32
  [8, 4, 2],
  // 33
  [8, 5, 4],
  // 34
  [8, 3, 4],
  // 35
  [3, 6, 4],
  // 36
  [1, 6, 4],
  // 37
  [8, 4, 7],
  // 38
  [1, 2, 7],
  // 39
  [5, 6, 2],
  // 40
  [5, 6, 7],
  // 41
  [3, 1, 7],
  // 42
  [3, 5, 6],
  // 43
  [1, 5, 2],
  // 44
  [8, 1, 2],
  // 45
  [3, 1, 4],
  // 46
  [8, 5, 7],
  // 47
  [3, 2, 7],
  // 48
  [8, 6, 2],
  // 49
  [8, 1, 6],
  // 50
  [5, 4, 7],
  // 51
  [3, 4, 2],
  // 52
  [3, 5, 7],
  // 53
  [8, 1, 5],
  // 54
  [6, 4, 7],
  // 55
  [1, 6, 2],
  // 56
  [8, 3, 2],
];

// create a function that takes the answers array and the scoring array and returns the sum of each 8 categories
function score(answer, scoring) {
  // manipulate answer array to be of length 56 with elements of array length 2
  function nest(answer) {
    // make a new nested array from the original nested array
    let newAnswerArray = [];
    // populate newAnswerArray
    for (i = 0; i < answer.length; i += 2) {
      let subArray = [answer[i], answer[i + 1]];
      newAnswerArray.push(subArray);
    }
    return newAnswerArray;
  }
  // helper function which takes an element from the scoring array (len 3)
// element from the answer array (len 2) and the counting array. returns
// updated counting array
function calculateLine(scoring, answer, counter) {
  //shallow copy of counter array
  let newCounter = counter.slice();
  // initialize counter array
  // key -
  // 0 - achieving
  // 1 - caring
  // 2 - commanding
  // 3 - considering
  // 4 - enjoying
  // 5 - exploring
  // 6 - organizing
  // 7 - structuring
  //award two points to first answer
  newCounter[scoring[answer[0] - 1] - 1] += 2;
  //award one point to second answer
  newCounter[scoring[answer[1] - 1] - 1] += 1;
  return newCounter;
}
  // initialize counter array
  // key -
  // 0 - achieving
  // 1 - caring
  // 2 - commanding
  // 3 - considering
  // 4 - enjoying
  // 5 - exploring
  // 6 - organizing
  // 7 - structuring
  let counter = [0, 0, 0, 0, 0, 0, 0, 0];
  //first translate the answer array into one that is length 56
  let newAnswer = nest(answer);
  //iterate from 0 to 55
  for (i = 0; i < newAnswer.length; i++) {
    counter = calculateLine(scoring[i], newAnswer[i], counter);
  }
  return counter;
}
  const answer = new Answers({
    name: req.body.name,
    answers: req.body.answers,
    score: score(req.body.answers, scoringArrayV0)
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