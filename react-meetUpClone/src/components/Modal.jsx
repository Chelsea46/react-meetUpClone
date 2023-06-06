


export default function Modal({open, onClose, onChange, onSubmit}){
    if(!open ) return null
    return(
        <div className="overlay">
            <div className="modal-container">
                <div className="modal-left">
                    <img className="modal-img" src="https://images.unsplash.com/photo-1496637721836-f46d116e6d34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="" />
                 </div>
                <div className="modal-right">
                    <p className="close-btn" onClick={onClose}>X</p>
                    <form onSubmit= {onSubmit}className="modal-form">
                        <input type="text" name="first-name" placeholder="First Name" onChange={onChange} required />
                        <input type="text" name="last-name" placeholder="Last Name" onChange={onChange} required />
                        <input type="text" name="email" placeholder="Email-address" onChange={onChange} required />
                        <button>Enroll</button>
                    </form>
                </div>
            </div>
        </div>
    )
}