function StudentList({ students, search, onDelete, onEdit }) {
  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Name</th>
          <th>Course</th>
          <th>Counselor</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students
          .filter(
            (s) =>
              s.name.toLowerCase().includes(search) ||
              s.course.toLowerCase().includes(search)
          )
          .map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.course}</td>
              <td>{s.counselor}</td>
              <td>{s.notes}</td>
              <td>
                <button onClick={() => onEdit(s)}>Edit</button>
                <button onClick={() => onDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default StudentList;
