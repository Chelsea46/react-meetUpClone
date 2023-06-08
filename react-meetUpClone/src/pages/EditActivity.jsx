import { useContext, useState} from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ActivityContext } from "../contexts/ActivityContext"
import Navbar from "../components/Navbar"


export default function EditActivity(){

    const { newActivity, setNewActivity } = useContext(ActivityContext)

    const {id} = useParams()

    const navigate = useNavigate()

    const currentActivity = newActivity.filter(current => { 
        return id === current.id
    })

    const [editActivityData, setEditActivityData] = useState({
        activityName: '',
        activityType: '',
        creatorName: '',
        date: '',
        city: ''
    })


      function editFormChange(e){
            const { name, value } = e.target;
            if (name === 'activity-name') {
              setEditActivityData((prevFormData) => ({
                ...prevFormData,
                activityName: value.charAt(0).toUpperCase() + value.slice(1)
              }))
            } else if (name === 'activity-type') {
              setEditActivityData((prevFormData) => ({
                ...prevFormData,
                activityType:value.charAt(0).toUpperCase() + value.slice(1)
              }))
            } else if (name === 'creator-name') {
              setEditActivityData((prevFormData) => ({
                ...prevFormData,
                creatorName: value.charAt(0).toUpperCase() + value.slice(1)
              }))
            } else if (name === 'city') {
              setEditActivityData((prevFormData) => ({
                ...prevFormData,
                city:value.charAt(0).toUpperCase() + value.slice(1)
              }))
            } else if (name === 'date') {
                setEditActivityData((prevFormData) => ({
                    ...prevFormData,
                    date:value
                }))
            }
        }

        const editActivityUpdate = (data) => {
            const updatedActivity = newActivity.map((activity) => {
                if (activity.id === id) {
                    return {
                        id: activity.id,
                        activityName: data.activityName,
                        activityType: data.activityType,
                        creatorName: data.creatorName,
                        date: data.date,
                        city: data.city
                    }
                }
                return activity
            })
            setNewActivity(updatedActivity)
        }

        function handleEdit(e){
            e.preventDefault()
            editActivityUpdate(editActivityData)
            setEditActivityData({
                activityName: '',
                activityType: '',
                creatorName: '',
                date: '',
                city: ''
            })
            navigate("/")
        }

    return(
        <div className="form-page-container">
        <Navbar />
        <div className="center-form">
            <div className="activity-form-container">
                <h1>Edit activity details</h1>
                <form onSubmit={handleEdit}>
                    <input className="form-input" type="text" name="activity-name" placeholder={currentActivity[0].activityName} value={editActivityData.activityName} onChange={editFormChange} required/>
                    <input className="form-input"type="text" name="activity-type" placeholder={currentActivity[0].activityType} value={editActivityData.activityType} onChange={editFormChange} required/>
                    <input className="form-input"type="text" name="creator-name" placeholder={currentActivity[0].creatorName} value={editActivityData.creatorName} onChange={editFormChange} required/>
                    <input className="form-input"type="text" name="city" placeholder={currentActivity[0].city} value={editActivityData.city} onChange={editFormChange} required/>
                    <input className="form-input"type="date" name="date" placeholder={currentActivity[0].date} value={editActivityData.date} onChange={editFormChange} required />
                    <button className="activity-btn">Submit Edited Activity</button>
                </form>
            </div>
        </div>
    </div>
    )
}