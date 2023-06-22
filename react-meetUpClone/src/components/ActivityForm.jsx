
import { useContext } from "react"
import { ActivityContext } from "../contexts/ActivityContext"
import Navbar from "./Navbar"

export default function ActivityForm(){


    const {handleChange, handleSubmit, activityFormData} = useContext(ActivityContext)
   

    return(
        <div className="form-page-container">
            <Navbar />
            <div className="center-form">
                <div className="activity-form-container">
                    <h1>Lets add an activity!</h1>
                    <form onSubmit = {handleSubmit}>
                        <input className="form-input" type="text" name="activity-name" placeholder="Activity name"  value={activityFormData.name} onChange={handleChange} required/>
                        <input className="form-input"type="text" name="activity-type" placeholder="What type of activity?" value={activityFormData.type} onChange={handleChange} required/>
                        <input className="form-input"type="text" name="creator-name" placeholder="Creators name" value={activityFormData.creator} onChange={handleChange} required/>
                        <input className="form-input"type="text" name="city" placeholder="City" value={activityFormData.city} onChange={handleChange} required/>
                        <input className="form-input"type="date" name="date" value={activityFormData.date} onChange={handleChange} required />
                        <button className="activity-btn">Submit Activity</button>
                    </form>
                </div>
            </div>
        </div>
    )
}