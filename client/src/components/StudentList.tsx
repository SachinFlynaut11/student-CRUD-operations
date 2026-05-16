import { useEffect, useState } from "react";
import { fetchStudents, removeStudent, updateStudent } from "../services/studentApi";
import { encryptData } from "../utils/crypto";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);

  const getAllStudents = async () => {
    try {
      setLoading(true);
      const response = await fetchStudents();
      const studentArray = Array.isArray(response) ? response : (response?.data || []);
      setStudents(studentArray);
    } catch (error) {
      console.log(error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await removeStudent(id);
        toast.success("Student deleted successfully!");
        getAllStudents(); // refresh list
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to delete student");
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const encryptedPayload = encryptData(editingStudent.data);
      await updateStudent(editingStudent._id, encryptedPayload);
      toast.success("Student updated successfully!");
      setEditingStudent(null);
      getAllStudents(); // refresh list
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update student");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500 text-lg">Loading students...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
      <Toaster position="top-right" />
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Student Directory</h2>
        <div className="flex items-center space-x-4">
          <Link 
            to="/register" 
            state={{ fromDashboard: true }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors"
          >
            + Add New Student
          </Link>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded">
            Total: {students.length}
          </span>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-gray-500">No students found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {student.data.fullName || '-'}
                  </td>
                  <td className="px-6 py-4">
                    {student.data.email || '-'}
                  </td>
                  <td className="px-6 py-4">
                    {student.data.phone || '-'}
                  </td>
                  <td className="px-6 py-4">
                    {student.data.course || '-'}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => setEditingStudent(student)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit"
                    >
                      <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Simple Edit Modal */}
      {editingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit Student</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editingStudent.data.fullName || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, data: { ...editingStudent.data, fullName: e.target.value } })}
                  className="inputStyle"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editingStudent.data.email || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, data: { ...editingStudent.data, email: e.target.value } })}
                  className="inputStyle"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <input
                  type="text"
                  value={editingStudent.data.course || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, data: { ...editingStudent.data, course: e.target.value } })}
                  className="inputStyle"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;