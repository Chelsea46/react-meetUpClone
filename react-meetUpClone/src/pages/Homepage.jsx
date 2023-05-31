import Navbar from "../components/Navbar"
import { useEffect} from "react"
import { useContext } from "react"
import { ActivityContext } from "../contexts/ActivityContext"

export default function Homepage(){
    
    const {activityFormData} = useContext(ActivityContext)
    
    // useEffect(() => {
       const activities = JSON.parse(localStorage.getItem('activityFormData'))
    // }, [activityFormData])
    
    return (
        <>
        <Navbar />
        <div className="activity-card-center">
            <div className="activity-card">
                <p className="card-text" id="date">{activities.date}</p>
                <h2 className="card-text">{activities.activityName}</h2>
                <p className="card-text  content">{activities.activityType}</p>
                <p className="card-text content">{activities.creatorName}</p>
            </div>
        </div>
        </>
    )
}