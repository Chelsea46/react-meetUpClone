import { useContext, useState, useEffect} from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ActivityContext } from "../contexts/ActivityContext"
import axios from "axios"
import Navbar from "../components/Navbar"


export default function EditActivity(){

    const { newActivity, setNewActivity } = useContext(ActivityContext)
    const {id} = useParams()
    
    const navigate = useNavigate()
        
    const currentActivity = newActivity.filter(current => { 
       return id === current._id
    })

    // console.log(currentActivity[0]._id)
    
    const currentID = currentActivity.length > 0 && currentActivity[0]._id || ""
   
    const [editActivityData, setEditActivityData] = useState({ 
      name: currentActivity[0].activityName || '',
      type: currentActivity[0].activityType || '',
      creator: currentActivity[0].creatorName || '',
      date: currentActivity[0].activityDate || '',
      city: currentActivity[0].activityCity || ''})


      function editFormChange(e){
            const { name, value } = e.target;
            if (name === 'activity-name') {
              setEditActivityData((prevFormData) => ({
                ...prevFormData,
                name: value.charAt(0).toUpperCase() + value.slice(1)
              }))
            } else if (name === 'activity-type') {
              setEditActivityData((prevFormData) => ({
                ...prevFormData,
                type:value.charAt(0).toUpperCase() + value.slice(1)
              }))
            } else if (name === 'creator-name') {
              setEditActivityData((prevFormData) => ({
                ...prevFormData,
                creator: value.charAt(0).toUpperCase() + value.slice(1)
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

       console.log(editActivityData)

        const editActivityUpdate = async (data) => {
          // let localStorageActivity = JSON.parse(localStorage.getItem('activityFormData')) || []
            const updatedActivity = newActivity.map((activity) => {
                if (activity._id === currentID) {
                    return {
                        _id: activity._id,
                        activityName: data.name || activity.activityName,
                        activityType: data.type || activity.activityType,
                        creatorName: data.creator || activity.creatorName,
                        activityDate: data.date || activity.activityDate,
                        activityCity: data.city || activity.activityCity,
                        enrolled: activity.enrolled || []
                    }
                }
                   return activity
            })
            // localStorage.setItem('activityFormData', JSON.stringify(updatedActivity))
           await axios.put(`http://localhost:5000/api/activity/${currentID}`,{
            name: data.name,
            type: data.type,
            creator: data.creator,
            date: data.date,
            city: data.city
           })
            setNewActivity(updatedActivity)
        }

       function handleEdit(e){
            e.preventDefault()
            editActivityUpdate(editActivityData)
            // console.log(editActivityData)
            // axios.put(`http://localhost:5000/api/activity/${currentID}`, editActivityData)
            setEditActivityData({
                name: '',
                type: '',
                creator: '',
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
                    <input className="form-input" type="text" name="activity-name"   defaultValue={currentActivity[0].activityName} onChange={editFormChange} autoComplete="on" required/>
                    <input className="form-input"type="text" name="activity-type"  defaultValue={currentActivity[0].activityType} onChange={editFormChange} autoComplete="on" required/>
                    <input className="form-input"type="text" name="creator-name"  defaultValue={currentActivity[0].creatorName} onChange={editFormChange} autoComplete="on" required/>
                    <input className="form-input"type="text" name="city"  defaultValue={currentActivity[0].activityCity} onChange={editFormChange} autoComplete="on" required/>
                    <input className="form-input"type="date" name="date"  defaultValue={currentActivity[0].activityDate} onChange={editFormChange} autoComplete="on" required />
                    <button className="activity-btn">Submit Edited Activity</button>
                </form>
            </div>
        </div>
    </div>
    )
}