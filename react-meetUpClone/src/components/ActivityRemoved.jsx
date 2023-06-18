import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function DeleteModal({ deleteActivity }) {
  const [isOpen, setIsOpen] = useState(true)
  const nav = useNavigate()

  const handleClose = () => {
    setIsOpen(false)
    nav("/")
  };

  return (
    <div className={`delete-modal ${isOpen ? "open" : ""}`}>
      <div className="modal-card">
        <button className="close-btn" onClick={handleClose}>
          &times;
        </button>
        <h3>Activity successfully deleted</h3>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  )
}
