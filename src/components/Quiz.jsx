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
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
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
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
    setLoading(true);
    setError(null);
    setQuestions([]);
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
          <h3>Score: {score} out of {questions.length}</h3>
          <p>Percentage: {((score / questions.length) * 100).toFixed(2)}%</p>
          {score === questions.length && (
            <p style={{ color: '#4CAF50' }}>Perfect score! Excellent work! 🎉</p>
          )}
          {score >= questions.length * 0.7 && score < questions.length && (
            <p style={{ color: '#8BC34A' }}>Great job! Keep it up! 👏</p>
          )}
          {score >= questions.length * 0.5 && score < questions.length * 0.7 && (
            <p style={{ color: '#FFC107' }}>Good effort! Room for improvement. 💪</p>
          )}
          {score < questions.length * 0.5 && (
            <p style={{ color: '#FF5722' }}>Keep practicing! You'll get better. 📚</p>
          )}
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
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="quiz-button"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
