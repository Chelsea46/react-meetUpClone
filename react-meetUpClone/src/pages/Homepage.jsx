import Navbar from "../components/Navbar"
import { useContext, useState, useEffect} from "react"
import { useNavigate, Link } from "react-router-dom"
import { ActivityContext } from "../contexts/ActivityContext"

export default function Homepage(){

    const nav = useNavigate()

    const { newActivity, citySearch, activitySearch, dateSearch} = useContext(ActivityContext)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(6)
    const [filteredState, setFilteredState] = useState([])



    useEffect(() => {
        if(filteredState.length < 1){
            setFilteredState(newActivity)
        }
    },[newActivity])

    useEffect(() => {
        const filteredActivity = filteredState.filter((activity) =>{

             if(activitySearch && citySearch){
                 return (
                     activity.activityName.toLowerCase().includes(activitySearch?.toLowerCase()) &&
                     activity.city.toLowerCase().includes(citySearch.toLowerCase())
                 )
             } else if (activitySearch){
                 return (
                     activity.activityName.toLowerCase().includes(activitySearch?.toLowerCase())
                 )
             } else if (citySearch){
                 return (
                     activity.city.toLowerCase().includes(citySearch.toLowerCase())
                 )
             }
         })
 
        setFilteredState(filteredActivity)
 
        if (filteredActivity.length < 1){
             setFilteredState(newActivity)
        }
     }, [activitySearch, citySearch])

    function navToForm(){
        nav('/addActivity')
    }

    // pagnation

    const indexOfLastItem = currentPage *postsPerPage
    const indexOfFirstItem = indexOfLastItem - postsPerPage
    const currentItem = filteredState.slice(indexOfFirstItem, indexOfLastItem)
    console.log(currentItem)

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
                            <Link to={`/Activity/${activity.id}`}>
                                 <h2 className="card-text">{activity.activityName}</h2>
                             </Link> 
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

