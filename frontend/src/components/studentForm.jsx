import { useState, useEffect } from "react";

const StudentForm = ({ addStudent, updateStudent, editing }) => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    if (editing) {
      setStudent(editing);
    }
  }, [editing]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!student.name || !student.email || !student.age) {
      alert("All fields required");
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(student.email)) {
      alert("Invalid Email");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (editing) {
      updateStudent(student);
    } else {
      addStudent(student);
    }

    setStudent({
      name: "",
      email: "",
      age: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-4">
          <input
            className="form-control"
            name="name"
            placeholder="Name"
            value={student.name}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <input
            className="form-control"
            name="email"
            placeholder="Email"
            value={student.email}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <input
            className="form-control"
            name="age"
            placeholder="Age"
            value={student.age}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <button className="btn btn-primary w-100">
            {editing ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default StudentForm;
