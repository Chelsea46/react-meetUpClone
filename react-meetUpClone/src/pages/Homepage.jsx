import Navbar from "../components/Navbar"
import { useContext} from "react"
import { useNavigate } from "react-router-dom"
import { ActivityContext } from "../contexts/ActivityContext"

export default function Homepage(){

    const nav = useNavigate()
    
    const {newActivity, citySearch, activitySearch, dateSearch} = useContext(ActivityContext)

    
    function navToForm(){
        nav('/addActivity')
    }

    let filter = newActivity.filter((activity) =>{
       if(activity.activityName.includes(activitySearch)){
        return activity.activityName
       }
    })

    // console.log(filter)

    
    
    return (
        <>
        <Navbar />
        <button onClick = {navToForm}>Add activity</button>
        {newActivity.length > 0  && newActivity.map((activity) => {
            return(
                <>
                    <div className="activity-card-center">
                        <div className="activity-card">
                            <p className="card-text" id="date">{activity.date}</p>
                            <h2 className="card-text">{activity.activityName}</h2>
                            <p className="card-text content">{activity.city}</p>
                            <p className="card-text  content">{activity.activityType}</p>
                            <p className="card-text content">{activity.creatorName}</p>
                        </div>
                    </div>
                </>
            )
        })}
        </>
    )
}

