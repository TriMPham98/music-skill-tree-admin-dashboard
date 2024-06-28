import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    grade: "",
    mainInstrument: "",
    progress: 0,
  });
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    // Load students from localStorage on component mount
    const storedStudents = JSON.parse(localStorage.getItem("students") || "[]");
    setStudents(storedStudents);
  }, []);

  useEffect(() => {
    // Save students to localStorage whenever the students array changes
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingStudent) {
      setEditingStudent({ ...editingStudent, [name]: value });
    } else {
      setNewStudent({ ...newStudent, [name]: value });
    }
  };

  const addStudent = () => {
    if (newStudent.name && newStudent.grade && newStudent.mainInstrument) {
      setStudents([...students, { ...newStudent, id: Date.now() }]);
      setNewStudent({ name: "", grade: "", mainInstrument: "", progress: 0 });
    }
  };

  const startEditing = (student) => {
    setEditingStudent(student);
  };

  const saveEdit = () => {
    if (editingStudent) {
      setStudents(
        students.map((s) => (s.id === editingStudent.id ? editingStudent : s))
      );
      setEditingStudent(null);
    }
  };

  const cancelEdit = () => {
    setEditingStudent(null);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4">Student Management</h2>

      {/* Add/Edit Student Form */}
      <div className="mb-4 p-4 bg-gray-700 rounded">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={editingStudent ? editingStudent.name : newStudent.name}
          onChange={handleInputChange}
          className="mb-2 p-2 w-full bg-gray-600 text-white rounded"
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={editingStudent ? editingStudent.grade : newStudent.grade}
          onChange={handleInputChange}
          className="mb-2 p-2 w-full bg-gray-600 text-white rounded"
        />
        <input
          type="text"
          name="mainInstrument"
          placeholder="Main Instrument"
          value={
            editingStudent
              ? editingStudent.mainInstrument
              : newStudent.mainInstrument
          }
          onChange={handleInputChange}
          className="mb-2 p-2 w-full bg-gray-600 text-white rounded"
        />
        {editingStudent ? (
          <div>
            <button
              onClick={saveEdit}
              className="mr-2 p-2 bg-green-500 text-white rounded">
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="p-2 bg-red-500 text-white rounded">
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={addStudent}
            className="p-2 bg-blue-500 text-white rounded flex items-center">
            <Plus size={20} className="mr-2" /> Add Student
          </button>
        )}
      </div>

      {/* Student List */}
      <div>
        {students.map((student) => (
          <div
            key={student.id}
            className="mb-2 p-4 bg-gray-700 rounded flex justify-between items-center">
            <div>
              <p className="text-white">
                <strong>{student.name}</strong> - Grade: {student.grade},
                Instrument: {student.mainInstrument}
              </p>
              <p className="text-gray-400">Progress: {student.progress}%</p>
            </div>
            <div>
              <button
                onClick={() => startEditing(student)}
                className="mr-2 p-2 bg-yellow-500 text-white rounded">
                <Edit size={20} />
              </button>
              <button
                onClick={() => deleteStudent(student.id)}
                className="p-2 bg-red-500 text-white rounded">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentManagement;
