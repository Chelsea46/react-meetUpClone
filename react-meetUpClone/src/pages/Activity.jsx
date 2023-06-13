import { useParams} from "react-router-dom"
import { useContext, useState, useEffect} from "react"
import { ActivityContext } from "../contexts/ActivityContext"
import Navbar from "../components/Navbar"
import Modal from "../components/Modal"


export default function Activity(){

    const { newActivity, setNewActivity} = useContext(ActivityContext)

    const [openModal, setModalOpen] = useState(false)
    const [enrollFormData, setEnrollFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    
    const {id} = useParams()
    
    const currentActivity = newActivity.filter(current => { 
        return id === current.id
    })
    
    function enrollFormChange(e){
        const { name, value } = e.target;
        if(name === 'first-name'){
            setEnrollFormData((prevFormData) => ({
                ...prevFormData,
                firstName: value.charAt(0).toUpperCase() + value.slice(1)
            }))
        }else if(name === 'last-name'){
            setEnrollFormData((prevFormData) => ({
                ...prevFormData,
                lastName: value.charAt(0).toUpperCase() + value.slice(1)
            }))
        }else if(name === 'email'){
            setEnrollFormData((prevFormData) => ({
                ...prevFormData,
                email: value
            }))
        }
    }
    
    const editActivityWithEnrolled = (data) => {
        let localStorageActivity = JSON.parse(localStorage.getItem('activityFormData')) || []
        
        const updatedActivityEnrollment = localStorageActivity.map((activity) => {
            if (activity.id === id) {
                const prevEnrolled = activity.enrolled || [] 
                const updatedEnrolled = [
                    ...prevEnrolled,
                    {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                    }
                ]
                return {
                    ...activity,
                    enrolled: updatedEnrolled
                }
            }
            return activity
        })  
        localStorage.setItem('activityFormData', JSON.stringify(updatedActivityEnrollment))
        setNewActivity(updatedActivityEnrollment)
    }
    
    function onSubmit(e){
        e.preventDefault()
        editActivityWithEnrolled(enrollFormData)
        setEnrollFormData({
            firstName: '',
            lastName: '',
            email: ''
        })
        setModalOpen(false)
    }
    

    return(
        <div className="activity-page-container">
            <div className="wavy">
                <div className="activity-hero">
                    <h1>Activity Details for {currentActivity[0].activityName}</h1>
                    <p>Hosted by</p>
                    <p> <strong>{currentActivity[0].creatorName} </strong> </p>
                </div>
            </div>
            <div className="details-container">
                <div className="details-left">
                    <img className="details-img" src="https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
                    <h3>Details</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, perferendis repellendus velit alias possimus asperiores veritatis at error tempore quas provident illum impedit minus assumenda laborum obcaecati fuga eos natus.
                    Odio nesciunt quis temporibus repellendus vero sit delectus, quod velit error culpa. Minima aliquam architecto adipisci eum necessitatibus. Officiis earum repellendus aspernatur saepe ab fugit natus voluptatibus repellat exercitationem porro.
                    Porro nam sed inventore, nemo id dicta magni minus iste impedit placeat enim, quisquam ipsa perspiciatis vero omnis qui, quia molestiae expedita quod suscipit explicabo voluptates! Quod dolores omnis provident!
                    Iusto quia similique ea quibusdam eaque et accusantium inventore? Nulla commodi fugit quisquam. A non in accusamus beatae libero optio id cumque, dolorum enim culpa voluptas dicta illum ducimus sequi!
                    </p>
                </div>
                
                    <div className="details-right">
                        <div className="details-right-card">
                            <div className="date-location">
                                <p><i className="fa-solid fa-clock"></i>{currentActivity[0].date}</p>
                                <p><i className="fa-solid fa-location-dot"></i>{currentActivity[0].city}</p>
                                <p>People enrolled:</p>
                            <ul>
                                {currentActivity[0].enrolled && currentActivity[0].enrolled.map((person, index) => (
                                <li key={index}>
                                    <span><i className="fa-solid fa-user"></i></span>{person.firstName} {person.lastName}
                                </li>
                                ))}
                            </ul>
                                <img className="enrollment-card-img" src="https://images.unsplash.com/photo-1604357209793-fca5dca89f97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1664&q=80" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <Modal open={openModal} onClose={() => setModalOpen(false)} onChange={enrollFormChange} onSubmit={onSubmit}/>
                <div className="enroll-container">
                    <div className="details-btns">
                        <button className="share-btn">Share</button>
                        <button className="enroll-btn" onClick={() => setModalOpen(true)}>Enroll</button>
                    </div>
                </div>
        </div>
    )
}