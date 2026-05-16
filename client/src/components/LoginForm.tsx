import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { fetchStudents } from "../services/studentApi";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      setIsLoggingIn(true);
      const response = await fetchStudents();
      const studentArray = Array.isArray(response) ? response : (response?.data || []);
      
      // Check if credentials match any registered student
      const user = studentArray.find((student: any) => 
        student.data.email === email && student.data.password === password
      );

      if (user) {
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Login to manage students
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-medium rounded-md shadow-sm"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;