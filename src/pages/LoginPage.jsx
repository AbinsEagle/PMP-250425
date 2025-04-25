import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [name, setName] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [examTime, setExamTime] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const timeRequired = (numQuestions * 1.2).toFixed(1);
    setExamTime(timeRequired);

    // Delay then navigate to loading page
    setTimeout(() => {
      navigate("/loading");
    }, 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">PMP Exam Trainer</h1>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="questions">Number of Questions</label>
          <input
            id="questions"
            type="number"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition duration-300"
        >
          Start Exam
        </button>

        {examTime > 0 && (
          <div className="text-center text-green-600 mt-4">
            Estimated Time: {examTime} minutes
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginPage;
