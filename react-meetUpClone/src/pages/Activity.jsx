import { useNavigate, useParams} from "react-router-dom"
import { useContext, useState} from "react"
import ActivityRemoved from '../components/ActivityRemoved'
import { ActivityContext } from "../contexts/ActivityContext"
import axios from "axios"
import moment from "moment"
import Modal from "../components/Modal"


export default function Activity(){
    
    const nav = useNavigate()
    const { newActivity, setNewActivity} = useContext(ActivityContext)
    const [activityDeleted, setActivityDeleted] = useState(false)

    const [openModal, setModalOpen] = useState(false)
    const [enrollFormData, setEnrollFormData] = useState({
        enrolledFirstName: '',
        enrolledLastName: '',
        enrolledEmail: ''
    })

    const {id} = useParams()
    const currentActivity = newActivity.filter(current => { 
        return id === current._id
     })

     const currentID = currentActivity.length > 0 && currentActivity[0]._id || ""

     console.log(currentActivity)
         
    function enrollFormChange(e){
        const { name, value } = e.target;
        if(name === 'first-name'){
            setEnrollFormData((prevFormData) => ({
                ...prevFormData,
                enrolledFirstName: value.charAt(0).toUpperCase() + value.slice(1)
            }))
        }else if(name === 'last-name'){
            setEnrollFormData((prevFormData) => ({
                ...prevFormData,
                enrolledLastName: value.charAt(0).toUpperCase() + value.slice(1)
            }))
        }else if(name === 'email'){
            setEnrollFormData((prevFormData) => ({
                ...prevFormData,
                enrolledEmail: value
            }))
        }
    }

    const editActivityWithEnrolled = async (data) => {
         // let localStorageActivity = JSON.parse(localStorage.getItem('activityFormData')) || []
        const updatedActivityEnrollment = newActivity.map((activity) => {
          if (activity._id === currentID) {
            const prevEnrolled = activity.enrolled || []
            const updatedEnrolled = [
              ...prevEnrolled,
              {
                enrolledFirstName: data.enrolledFirstName,
                enrolledLastName: data.enrolledLastName,
                enrolledEmail: data.enrolledEmail,
              },
            ];
            return {
              ...activity,
              enrolled: updatedEnrolled,
            }
          }
          return activity
        })
      
        await axios.put(`http://localhost:5000/api/activity/enroll/${currentID}`, {
            enrolledFirstName: data.enrolledFirstName,
            enrolledLastName: data.enrolledLastName,
            enrolledEmail: data.enrolledEmail
        })
      
        setNewActivity(updatedActivityEnrollment)
      }
      // localStorage.setItem('activityFormData', JSON.stringify(updatedActivityEnrollment))
      // setNewActivity(updatedActivityEnrollment)
      
    
    function onSubmit(e){
        e.preventDefault()
        editActivityWithEnrolled(enrollFormData)
        setEnrollFormData({
            enrolledFirstName: '',
            enrolledLastName: '',
            enrolledEmail: ''
        })
        setModalOpen(false)
    }

    async function deleteActivity(){
        await axios.delete(`http://localhost:5000/api/activity/${currentActivity[0]._id}`)
        setNewActivity(prevActivity => prevActivity.filter(activity => activity._id !== currentActivity[0]._id))
        setActivityDeleted(true)
    }

    if(currentActivity.length === 0){
        return(
            <ActivityRemoved />
        )
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
                    </p>
                </div>
                
                    <div className="details-right">
                        <div className="details-right-card">
                            <div className="date-location">
                                <h3>When and where:</h3>
                                <p><i className="fa-solid fa-clock"></i>{moment(currentActivity[0].activityDate).format("Do MMM YY")}</p>
                                <p><i className="fa-solid fa-location-dot"></i>{currentActivity[0].activityCity}</p>
                            </div>
                            <img className="enrollment-card-img" src="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=384" alt="" />
                            <div className="enrolled">
                                <h3>People enrolled:</h3>
                                {Array.isArray(currentActivity[0].enrolled) && currentActivity[0].enrolled.map((person, index) => (
                                <p key={index}>
                                    <span className="line"></span><span><i className="fa-solid fa-user"></i></span>{person.enrolledFirstName} {person.enrolledLastName}
                                </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Modal open={openModal} onClose={() => setModalOpen(false)} onChange={enrollFormChange} onSubmit={onSubmit}/>
                <div className="enroll-container">
                    <div className="details-btns">
                        <button className="delete-btn" onClick={deleteActivity}>Delete</button>
                        <button className="enroll-btn" onClick={() => setModalOpen(true)}>Enroll</button>
                    </div>
                </div>
        </div>
    )
}