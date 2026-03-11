const StudentTable = ({
  students,
  editStudent,
  deleteStudent,
  selectedStudents,
  handleRowSelect,
}) => {
  return (
    <table className="table table-striped table-hover">
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.map((student) => {
          const isSelected = selectedStudents.some(
            (s) => s._id === student._id,
          );

          return (
            <tr
              key={student._id}
              onClick={() => handleRowSelect(student)}
              className={isSelected ? "table-success" : ""}
              style={{ cursor: "pointer" }}
            >
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    editStudent(student);
                  }}
                >
                  Edit
                </button>
                  
                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm("Delete student?")) {
                      deleteStudent(student._id);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default StudentTable;
