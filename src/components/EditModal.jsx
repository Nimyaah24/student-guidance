import { useState } from "react";
import "./EditModal.css"; // we'll add this style below

function EditModal({ student, onClose, onUpdate }) {
  const [updated, setUpdated] = useState(student);

  const handleChange = (e) => {
    setUpdated({ ...updated, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate(updated);
  };

  return (
    <dialog open className="modal">
      <div className="modal-content">
        <h2>Edit Student</h2>
        <input
          name="name"
          value={updated.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          name="course"
          value={updated.course}
          onChange={handleChange}
          placeholder="Course"
        />
        <input
          name="counselor"
          value={updated.counselor}
          onChange={handleChange}
          placeholder="Counselor"
        />
        <textarea
          name="notes"
          value={updated.notes}
          onChange={handleChange}
          placeholder="Guidance Notes"
        />
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button className="close-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default EditModal;
