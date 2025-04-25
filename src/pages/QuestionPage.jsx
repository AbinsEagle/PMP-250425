import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function QuestionPage() {
  const navigate = useNavigate();

  // Dummy Questions for now
  const questions = [
    {
      id: 1,
      question: "What is the first phase in a project lifecycle?",
      options: ["Planning", "Execution", "Initiation", "Closure"],
    },
    {
      id: 2,
      question: "Who approves the project charter?",
      options: ["Sponsor", "Manager", "Stakeholder", "Customer"],
    },
  ];

  // State to track current question
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl mx-auto p-8">
        <div className="text-gray-800 text-xl font-semibold mb-6">
          Question {currentIndex + 1} of {questions.length}
        </div>

        <div className="text-lg font-medium mb-4">
          {questions[currentIndex].question}
        </div>

        <div className="space-y-4 mb-6">
          {questions[currentIndex].options.map((option, idx) => (
            <div key={idx}>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-500"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                />
                <span className="ml-2 text-gray-700">{option}</span>
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            const updatedAnswers = [...answers, selectedOption];
            setAnswers(updatedAnswers);
            setSelectedOption(null);

            if (currentIndex + 1 < questions.length) {
              setCurrentIndex(currentIndex + 1);
            } else {
              // Move to result page later
              alert("Exam finished!");
            }
          }}
          disabled={!selectedOption}
          className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-600 transition duration-300 disabled:opacity-50"
        >
          {currentIndex + 1 === questions.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default QuestionPage;
