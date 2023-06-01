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

    const filterActivity = newActivity.filter((activity) =>{
       return activity.activityName.toLowerCase().includes(activitySearch?.toLowerCase())
    })

    // const filterCity = newActivity.filter((activity) =>{
    //     return activity.city.toLowerCase().includes(citySearch?.toLowerCase())
    //  })
     

    //  const filterDate = newActivity.filter((activity) =>{
    //     return activity.date.includes(dateSearch)
    //  })
    

    return (
        <>
        <Navbar />
        <div className="welcome-title">
            <h1>Welcome 👋</h1>
            <h2>Upcoming Events</h2>
        </div>
        <button onClick = {navToForm}>Add activity</button>
        {newActivity.length > 0  && filterActivity.map((activity) => {
            return(
                <>
                    <div className="activity-card-center">
                        <div className="activity-card">
                            <p className="card-text" id="date">{activity.date}</p>
                            <h2 className="card-text">{activity.activityName}</h2>
                            <p className="card-text content">{activity.creatorName} - {activity.city}</p>
                            {/* <p className="card-text  content">{activity.activityType}</p> */}
                        </div>
                    </div>
                </>
            )
        })}
        </>
    )
}

