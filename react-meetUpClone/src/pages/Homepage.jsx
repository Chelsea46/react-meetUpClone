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
        <button className="add-activity-btn" onClick = {navToForm}>Add activity</button>
        <h1>Welcome 👋</h1>
        </div>
        <h2 className="upcoming-title">Upcoming Events</h2>
        {filteredState.length > 0  && filteredState.map((activity) => {
            return(
                <>
                    <div className="activity-card-center">
                        <div className="activity-card">
                            <div className="image">
                                <img src="https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
                            </div>
                            <div className="text">
                                <p className="card-text" id="date">{activity.date}</p>
                                <Link style={{ textDecoration: 'none' }} to={`/Activity/${activity.id}`}>
                                    <h2 className="card-text">{activity.activityName}</h2>
                                </Link> 
                                <p className="card-text content">{activity.creatorName} - {activity.city}</p>
                            </div>
                            {/* <p className="card-text  content">{activity.activityType}</p> */}
                        </div>
                    </div>
                </>
            )
        })}
        </>
    )
}

