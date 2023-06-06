import { useParams} from "react-router-dom"
import { useContext, useState} from "react"
import { ActivityContext } from "../contexts/ActivityContext"
import Navbar from "../components/Navbar"
import Modal from "../components/Modal"


export default function Activity(){

    const { newActivity, setNewActivity} = useContext(ActivityContext)

    const [openModal, setModalOpen] = useState(false)
    const [enrollFormData, setEnrollFormData] = useState({
        enrolled:[{
        firstName: '',
        lastName: '',
        email: ''
        }]
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
                firstName: value
              }))
        }else if(name === 'last-name'){
            setEnrollFormData((prevFormData) => ({
                ...prevFormData,
                lastName: value
              }))
        }else if(name === 'email'){
            setEnrollFormData((prevFormData) => ({
                ...prevFormData,
                email: value
              }))
        }
    }

    const editActivityWithEnrolled = (data) => {
        const updatedActivityEnrollment = newActivity.map((activity) => {
            if (activity.id === id) {
                return {
                    id: activity.id,
                    activityName: activity.activityName,
                    activityType: activity.activityType,
                    creatorName: activity.creatorName,
                    date: activity.date,
                    city: activity.city,
                    enrolled: [{
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email
                    }]
                }
            }
            return activity
        })
        setNewActivity(updatedActivityEnrollment)
    }

    console.log(currentActivity[0].enrolled)


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
            <Navbar />
            <div className="activity-hero">
                <h1>Activity Details for {currentActivity[0].activityName}</h1>
                <p>Hosted by</p>
                <p> <strong>{currentActivity[0].creatorName} </strong> </p>
            </div>
            <div className="details-container">
                <div className="details-left">
                    <img className="details-img" src="https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
                    <h3>Details</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit et, error voluptatem iste rem odio. Voluptas alias sequi, at voluptates ad error quisquam nesciunt dignissimos earum in repudiandae odio. Dolorem!
                    Aperiam repellendus ea similique nesciunt dolore quae at eius excepturi voluptas, obcaecati, maiores illo suscipit impedit delectus officiis quis ut. Itaque quasi rerum ex ducimus sed non corrupti quos at!
                    Veritatis doloribus perspiciatis sint tempora accusamus aliquid molestiae amet voluptas qui ratione odit consequatur debitis, laudantium corporis cum laboriosam? Ut, perspiciatis? Eum nemo quia nisi quasi odio ullam quo architecto.
                    Nulla, eius omnis fuga nam architecto temporibus rem quae corporis magni iste saepe, pariatur, quaerat at deserunt quidem recusandae aperiam unde magnam deleniti atque laborum! Aperiam veniam quo odit fugiat.</p>
                </div>
                    <div className="details-right">
                        <div className="details-right-card">
                            <div className="date-location">
                                <p><i className="fa-solid fa-clock"></i>{currentActivity[0].date}</p>
                                <p><i className="fa-solid fa-location-dot"></i>{currentActivity[0].city}</p>
                                <p>People enrolled: {currentActivity[0].enrolled.firstName} {currentActivity[0].enrolled.lastName}</p>
                                <img src="https://images.unsplash.com/photo-1604357209793-fca5dca89f97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1664&q=80" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <Modal open={openModal} onClose={() => setModalOpen(false)} onChange={enrollFormChange} onSubmit={onSubmit}/>
                <div className="enroll-container">
                    <div className="date-activity">
                        <p className="card-text" id="date">{currentActivity[0].date}</p>
                         <h3 className="card-text">{currentActivity[0].activityName}</h3>
                    </div>
                    <div className="details-btns">
                        <button className="share-btn">Share</button>
                        <button className="enroll-btn" onClick={() => setModalOpen(true)}>Enroll</button>
                    </div>
                </div>
        </div>
    )
}