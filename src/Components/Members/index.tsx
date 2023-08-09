import React, { useState } from "react";
import Modal from "../Modal";
import "./style.css";
import Table from "../Table";

const Members: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <div style={{ display: "flex", margin: "10px" }}>
        <h3>Members</h3>

        <button onClick={openModal} className="add__button">
          Add Members
        </button>
      </div>
      <hr />
      <Modal isOpen={modalIsOpen} onClose={closeModal} />
      <Table isOpen={modalIsOpen} />
    </div>
  );
};

export default Members;
