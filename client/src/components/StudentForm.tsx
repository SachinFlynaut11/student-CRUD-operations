import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { createStudent } from "../services/studentApi";
import { encryptData } from "../utils/crypto";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    course: "",
    password: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we navigated here from the dashboard
  const fromDashboard = location.state?.fromDashboard || false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("Please fill in at least Name, Email, and Password.");
      return;
    }

    try {
      setIsSubmitting(true);
      const encryptedPayload = encryptData(formData);
      await createStudent(encryptedPayload);
      
      toast.success("Student registered successfully!");
      
      // Redirect based on where we came from
      setTimeout(() => {
        if (fromDashboard) {
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      }, 1000);
      
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to register student");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto border border-gray-200">
        <Toaster position="top-right" />
        
        <div className="mb-6 border-b border-gray-200 pb-4 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {fromDashboard ? "Add New Student" : "Student Registration"}
            </h2>
            <p className="text-gray-600 mt-1">Please enter the student details below.</p>
          </div>
          {fromDashboard ? (
            <Link to="/dashboard" className="text-sm text-blue-600 hover:underline font-medium mb-1">
              Back to Dashboard
            </Link>
          ) : (
            <Link to="/login" className="text-sm text-blue-600 hover:underline font-medium mb-1">
              Back to Login
            </Link>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="inputStyle" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="inputStyle" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="inputStyle" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="inputStyle text-gray-700" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} className="inputStyle" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Enrolled</label>
            <input type="text" name="course" value={formData.course} onChange={handleChange} className="inputStyle" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Home Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="inputStyle" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="inputStyle" />
          </div>

          <div className="md:col-span-2 mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {!fromDashboard && (
                <>
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:underline font-medium">
                    Login here
                  </Link>
                </>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Registering...' : (fromDashboard ? 'Add Student' : 'Register Student')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;