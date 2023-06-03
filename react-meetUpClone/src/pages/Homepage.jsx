import Navbar from "../components/Navbar"
import { useContext, useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { ActivityContext } from "../contexts/ActivityContext"

export default function Homepage(){

    const nav = useNavigate()

    const { newActivity, citySearch, activitySearch, dateSearch} = useContext(ActivityContext)

    const [filteredState, setFilteredState] = useState([])
    console.log(citySearch)
    useEffect(() => {
        if(filteredState.length < 1){
            setFilteredState(newActivity)
        }
    },[newActivity])

    useEffect(() => {
       const filteredActivity = filteredState.filter((activity) =>{
        console.log("Activity Search:", activitySearch);
        console.log("City Search:", citySearch);


            if(activitySearch && citySearch){
                console.log(activity.activityName.toLowerCase().includes(activitySearch?.toLowerCase())
                && activity.city.toLowerCase().includes(citySearch.toLowerCase()))
                return (
                activity.activityName.toLowerCase().includes(activitySearch?.toLowerCase()) &&
                activity.city.toLowerCase().includes(citySearch.toLowerCase())
                )
            } 
       })
       const filteredArray = [...filteredActivity]

       if(activitySearch && citySearch){
           setFilteredState(filteredArray)
       }

    //    console.log(filteredActivity)
    }, [activitySearch, citySearch])

    function navToForm(){
        nav('/addActivity')
    }

    console.log(filteredState)
    console.log(newActivity)
    return (
        <>
        <Navbar />
        <div className="welcome-title">
        <h1>Welcome 👋</h1>
        <h2>Upcoming Events</h2>
        </div>
        <button onClick = {navToForm}>Add activity</button>
        {filteredState.length > 0  && filteredState.map((activity) => {
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

