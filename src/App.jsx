import { useState, useEffect } from "react";
import "./App.css";
import StudentList from "./components/StudentList";
import EditModal from "./components/EditModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    counselor: "",
    notes: "",
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode to body
  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setStudents(
        students.map((s) => (s.id === editId ? { ...formData, id: editId } : s))
      );
      toast.success("Student updated successfully!");
      setEditId(null);
    } else {
      setStudents([...students, { ...formData, id: Date.now() }]);
      toast.success("Student added successfully!");
    }
    setFormData({ name: "", course: "", counselor: "", notes: "" });
  };

  const handleEdit = (student) => {
    setFormData(student);
    setEditId(student.id);
  };

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
    toast.success("Student deleted successfully!");
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Toast container (top-right) */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Dark Mode Button */}
      <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <h1>🎓 Student Guidance Management</h1>

      {/* Form Section */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Course"
          value={formData.course}
          onChange={(e) => setFormData({ ...formData, course: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Counselor"
          value={formData.counselor}
          onChange={(e) =>
            setFormData({ ...formData, counselor: e.target.value })
          }
          required
        />
        <textarea
          placeholder="Guidance Notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or course..."
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto 20px",
          display: "block",
        }}
      />

      {/* Student Table */}
      <StudentList
        students={students}
        search={search}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Edit Modal (if editing) */}
      {editId && (
        <EditModal
          student={formData}
          onClose={() => setEditId(null)}
          onUpdate={(updatedStudent) => {
            setStudents(
              students.map((s) =>
                s.id === updatedStudent.id ? updatedStudent : s
              )
            );
            toast.success("Student updated successfully!");
            setEditId(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
