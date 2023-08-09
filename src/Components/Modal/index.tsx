import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddMember } from "../../actions/MemberActions";
import "./style.css";

const Modal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const dispatch = useDispatch<any>();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Handle form submission, data storage, etc.
    const formData = {
      name,
      companyName,
      status,
      notes,
      lastUpdatedAt: new Date(),
    };

    dispatch(AddMember(formData));

    const existingData = 
      JSON.parse(localStorage.getItem("formData") || "{}")

    const concatenatedData = Array.isArray(existingData) ? [
      ...existingData,
      { id: new Date().getTime().toString(), formData },
    ] : [{ id: new Date().getTime().toString(), formData }];

    localStorage.setItem("formData", JSON.stringify(concatenatedData));

    setCompanyName("");
    setName("");
    setNotes("");
    setStatus("");

    onClose(); // Close the modal after submission
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h1>Add members</h1>
        <hr />

        {/* Name */}
        <p>
          <b>Name</b>
        </p>
        <input
          placeholder="Enter member name"
          className="user__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <p>
          <b>Company</b>
        </p>
        <input
          placeholder="Enter company name"
          className="user__input"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <p>
          <b>Status</b>
        </p>
        <input
          placeholder="Enter status"
          className="user__input"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <p>
          <b>Notes</b>
        </p>
        <input
          placeholder="Enter notes"
          className="user__input"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div
          style={{ display: "flex", justifyContent: "end", marginTop: "50px" }}
        >
          <button className="button" onClick={() => onClose()}>
            Cancel
          </button>{" "}
          <button className="button" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
