import { useState, useEffect } from "react";
import axios from "axios";

import StudentForm from "./components/studentForm.jsx";
import StudentTable from "./components/studentTable.jsx";
import { exportToExcel } from "./utils/exportExcel.js";

function App() {
  const API = "https://student-crud-backend-3wf2.onrender.com";

  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchStudents = async () => {
    const res = await axios.get(API);

    setStudents(res.data);

    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (student) => {
    await axios.post(API, student);

    fetchStudents();
  };

  const updateStudent = async (student) => {
    await axios.put(`${API}/${student._id}`, student);

    setEditing(null);

    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(`${API}/${id}`);

    fetchStudents();
  };
  const handleRowSelect = (student) => {
    const alreadySelected = selectedStudents.find((s) => s._id === student._id);

    if (alreadySelected) {
      setSelectedStudents(
        selectedStudents.filter((s) => s._id !== student._id),
      );
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );
  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Students Table</h1>

      <div className="card p-4 mb-4 shadow">
        <StudentForm
          addStudent={addStudent}
          updateStudent={updateStudent}
          editing={editing}
        />
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Search student"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-6 text-end">
          <button
            className="btn btn-success m-2"
            onClick={() => exportToExcel(filteredStudents, "students")}
          >
            Download Excel
          </button>
          {/* this is for selected entries download */}
          <button
            className="btn btn-primary m-2"
            onClick={() => exportToExcel(selectedStudents, "filtered_students")}
          >
            Download Filtered
          </button>
        </div>
      </div>

      <div className="card p-3 shadow">
        <StudentTable
          students={filteredStudents}
          editStudent={setEditing}
          deleteStudent={deleteStudent}
          selectedStudents={selectedStudents}
          handleRowSelect={handleRowSelect}
        />
      </div>
    </div>
  );
}

export default App;
