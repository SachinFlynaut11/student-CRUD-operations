import { useNavigate } from "react-router-dom";
import StudentList from "../components/StudentList";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Basic logout flow, clears state or tokens if any, then redirects
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-800">
                Student Management System
              </h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md font-medium text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StudentList />
      </main>
    </div>
  );
};

export default Dashboard;