import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function QuestionPage() {
  const navigate = useNavigate();

  // 💬 Dummy questions (replace with backend later)
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

  // 🧠 State variables
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0); // Total time
  const [questionStartTime, setQuestionStartTime] = useState(0); // For current question
  const [questionTimes, setQuestionTimes] = useState([]); // ⏱️ Time spent per question

  // 🕒 Start total timer
  useEffect(() => {
    const totalTimer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(totalTimer);
  }, []);

  // 🕒 Track individual question time
  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentIndex]);

  // 🔧 Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // 🔄 Next or Finish
  const handleNext = () => {
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    const updatedTimes = [...questionTimes, timeSpent];
    const updatedAnswers = [...answers, selectedOption];

    setQuestionTimes(updatedTimes);
    setAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("🎉 Exam Finished!");
      console.log("Per-Question Times:", updatedTimes);
      console.log("Answers:", updatedAnswers);
      // navigate("/results"); // Future upgrade
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl mx-auto p-6">

        {/* ⏱️ Time & ✅ Progress - Split Bars */}
<div className="flex justify-between items-center mb-6 text-sm text-gray-700 font-medium">
  {/* TIME BLOCK */}
  <div>
    ⏱️ Time: {formatTime(timeElapsed)}
    <div className="w-40 h-2 bg-gray-200 rounded-full mt-1">
      <div
        className="h-full bg-purple-500 rounded-full"
        style={{ width: `${Math.min((timeElapsed / (questions.length * 72)) * 100, 100)}%` }}
      ></div>
    </div>
  </div>

  {/* PROGRESS BLOCK */}
  <div className="text-right">
    ✅ Progress: {currentIndex + 1} / {questions.length}
    <div className="w-40 h-2 bg-gray-200 rounded-full mt-1">
      <div
        className="h-full bg-green-500 rounded-full"
        style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
      ></div>
    </div>
  </div>
</div>


        {/* 🔢 Question Count */}
        <div className="text-xl font-semibold text-gray-800 mb-2">
          Question {currentIndex + 1} of {questions.length}
        </div>

        {/* 💬 Question Text */}
        <div className="text-lg text-gray-700 mb-4">
          {questions[currentIndex].question}
        </div>

        {/* 🧠 Options */}
        <div className="space-y-3 mb-6">
          {questions[currentIndex].options.map((option, idx) => (
            <div key={idx}>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                />
                <span className="ml-2 text-gray-800">{option}</span>
              </label>
            </div>
          ))}
        </div>

        {/* 👉 Next or Finish Button */}
        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className={`w-full text-center bg-blue-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-600 transition duration-300 ${
            !selectedOption && "opacity-50 cursor-not-allowed"
          }`}
        >
          {currentIndex + 1 === questions.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default QuestionPage;
