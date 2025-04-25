import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/questions");
    }, 2000); // 2 seconds loading

    return () => clearTimeout(timer); // clean up
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <div className="text-2xl font-semibold mb-4 text-gray-700 animate-pulse">
          🧞‍♂️ Fetching questions from your PMP Genie...
        </div>
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}

export default LoadingPage;
