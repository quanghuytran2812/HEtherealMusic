import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
              <p className="text-gray-700 mb-6">
                  You do not have permission to view this page. Please log in with the appropriate account.
              </p>
              <button
                  onClick={() => navigate(-1)}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                  Go to Login
              </button>
          </div>
      </div>
  );
}

export default Unauthorized