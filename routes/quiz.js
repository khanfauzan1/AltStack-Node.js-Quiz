
const express = require('express');
const router = express.Router();
const quizData = require('../data/questions.json');

// Route to get the first quiz question
router.get('/', (req, res) => {
  req.session.userAnswers = {};
  req.session.currentQuestion = 0;
  res.render('quiz', { question: quizData[0] });
});

// Route to handle quiz submission and navigate to the next question
router.post('/', (req, res) => {
  const userAnswer = req.body.answer;
  const currentQuestion = req.session.currentQuestion;

  // Store the user's answer
  req.session.userAnswers[`question${currentQuestion}`] = userAnswer;

  // Move to the next question
  req.session.currentQuestion++;

  // If there are more questions, render the next question
  if (req.session.currentQuestion < quizData.length) {
    res.render('quiz', { question: quizData[req.session.currentQuestion] });
  } else {
    // If all questions are answered, calculate the score and render the result
    const score = calculateScore(req.session.userAnswers, quizData);
    res.render('result', { score, questions: quizData, userAnswers: req.session.userAnswers });
  }
});

// Helper function to calculate the score
function calculateScore(userAnswers, questions) {
  let score = 0;
  questions.forEach((question, index) => {
    if (userAnswers[`question${index}`] == question.correctAnswer) {
      score++;
    }
  });
  return score;
}

module.exports = router;
