import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { generateQuestions } from '../services/geminiService';
import './Quiz.css';

const Quiz = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const generatedQuestions = await generateQuestions(topic);
        setQuestions(generatedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Failed to load questions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (topic) {
      fetchQuestions();
    }
  }, [topic]);

  const handleAnswer = (selectedAnswer) => {
    setSelectedOption(selectedAnswer);
    setShowAnswer(true);

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    setTimeout(() => {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      setAnswers(newAnswers);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setShowAnswer(false);
      } else {
        // Calculate score
        let correctAnswers = 0;
        newAnswers.forEach((answer, index) => {
          if (answer === questions[index].correctAnswer) {
            correctAnswers++;
          }
        });
        setScore(correctAnswers);
        setShowResults(true);
      }
    }, 1500); // Show correct/incorrect for 1.5 seconds before moving to next question
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
    setLoading(true);
    setError(null);
    setQuestions([]);
    setSelectedOption(null);
    setShowAnswer(false);
    window.location.reload();
  };

  const handleBackToHome = () => {
    navigate('/homepage');
  };

  if (loading) {
    return (
      <div className="quiz-container">
        <h2 className="topic-title">Loading questions about {topic}...</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-container">
        <h2 className="topic-title">Error</h2>
        <div className="question-container">
          <p className="question-text">{error}</p>
          <div className="action-buttons">
            <button onClick={handleRetry}>Try Again</button>
            <button onClick={handleBackToHome}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="quiz-container">
        <h2 className="topic-title">Quiz Results</h2>
        <div className="results">
          <div className="score-circle">
            <div className="score-number">{score}</div>
            <div className="score-text">out of {questions.length}</div>
          </div>
          <div className="score-details">
            <div className="percentage">
              {((score / questions.length) * 100).toFixed(0)}%
            </div>
            {score === questions.length && (
              <p className="feedback perfect">Perfect score! Excellent work! 🎉</p>
            )}
            {score >= questions.length * 0.7 && score < questions.length && (
              <p className="feedback great">Great job! Keep it up! 👏</p>
            )}
            {score >= questions.length * 0.5 && score < questions.length * 0.7 && (
              <p className="feedback good">Good effort! Room for improvement. 💪</p>
            )}
            {score < questions.length * 0.5 && (
              <p className="feedback needs-practice">Keep practicing! You'll get better. 📚</p>
            )}
          </div>
          <div className="answers-review">
            <h3>Review Your Answers</h3>
            {questions.map((question, index) => (
              <div key={index} className="review-item">
                <p className="review-question">
                  <span className="question-number">{index + 1}.</span> {question.question}
                </p>
                <p className={`review-answer ${answers[index] === question.correctAnswer ? 'correct' : 'incorrect'}`}>
                  Your answer: {answers[index]}
                  {answers[index] !== question.correctAnswer && (
                    <span className="correct-answer">
                      Correct answer: {question.correctAnswer}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
          <div className="action-buttons">
            <button onClick={handleRetry}>Try Again</button>
            <button onClick={handleBackToHome}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="quiz-container">
      <h2 className="topic-title">{topic} Quiz</h2>
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
      
      <div className="question-container">
        <p className="question-number">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <p className="question-text">{currentQuestion.question}</p>
        <div className="options">
          {currentQuestion.options.map((option, index) => {
            let optionClass = 'quiz-button';
            if (showAnswer && option === selectedOption) {
              optionClass += option === currentQuestion.correctAnswer ? ' correct' : ' incorrect';
            } else if (showAnswer && option === currentQuestion.correctAnswer) {
              optionClass += ' correct';
            }
            
            return (
              <button
                key={index}
                onClick={() => !showAnswer && handleAnswer(option)}
                className={optionClass}
                disabled={showAnswer}
              >
                {option}
                {showAnswer && option === selectedOption && (
                  <span className="answer-icon">
                    {option === currentQuestion.correctAnswer ? '✓' : '✗'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
