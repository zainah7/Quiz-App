import React, { useState } from "react";
import questions from "../components/Questions";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill(null)
  );
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const handleAnswer = (selectedOption) => {
    if (!answeredQuestions.includes(currentQuestion)) {
      const updatedSelectedAnswers = [...selectedAnswers];
      updatedSelectedAnswers[currentQuestion] = selectedOption;
      setSelectedAnswers(updatedSelectedAnswers);

      if (selectedOption === questions[currentQuestion].correct) {
        setScore(score + 1);
      }
      setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedAnswers(Array(questions.length).fill(null));
    setAnsweredQuestions([]);
  };

  const progressBarStyle = {
    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
  };

  return (
    <div className="p-4">
      {quizCompleted ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Quiz Completed!</h2>
          <p className="text-gray-500">
            Your Score: {score}/{questions.length}
          </p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={resetQuiz}
          >
            Restart
          </button>
        </div>
      ) : (
        <div>
          <div className="text-center mb-4">
            <h1 className="text-2xl font-semibold">Quiz Application</h1>
            <p className="text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold">
              {questions[currentQuestion].question}
            </h2>
            <div className="mt-4 space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`block w-full py-3 px-4 rounded-full ${
                    selectedAnswers[currentQuestion] === option
                      ? option === questions[currentQuestion].correct
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                  disabled={selectedAnswers[currentQuestion] !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            {selectedAnswers[currentQuestion] && (
              <p
                className={`mt-4 text-center text-${
                  selectedAnswers[currentQuestion] ===
                  questions[currentQuestion].correct
                    ? "green"
                    : "red"
                }-600`}
              >
                {selectedAnswers[currentQuestion] ===
                questions[currentQuestion].correct
                  ? "Correct!"
                  : `Incorrect. Correct answer: ${questions[currentQuestion].correct}`}
              </p>
            )}
          </div>

          <div className="mt-4 text-center text-gray-500">
            Your Score: {score}
          </div>

          <div className="mt-4 flex justify-between">
            <div>
              {currentQuestion > 0 && (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                  onClick={handlePreviousQuestion}
                  disabled={selectedAnswers[currentQuestion] !== null}
                >
                  Previous
                </button>
              )}
            </div>
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentQuestion] === null}
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div className="w-full bg-gray-200 h-4 rounded-lg">
              <div
                className="h-4 bg-blue-500 rounded-lg"
                style={progressBarStyle}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
