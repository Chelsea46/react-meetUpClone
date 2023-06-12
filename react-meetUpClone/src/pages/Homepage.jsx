import Navbar from "../components/Navbar"
import { useContext, useState, useEffect} from "react"
import { useNavigate, Link } from "react-router-dom"
import { ActivityContext } from "../contexts/ActivityContext"

export default function Homepage(){

    const nav = useNavigate()

    const { newActivity, citySearch, activitySearch, dateSearch} = useContext(ActivityContext)
    const [filteredState, setFilteredState] = useState([])
    const [activityPerPage, setActivityPerPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)

    console.log(newActivity)



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

    const numOfTotalPages = Math.ceil(filteredState.length / activityPerPage)
    const pages = [...Array(numOfTotalPages +1).keys()].slice(1)
    const indexOfLastItem = currentPage * activityPerPage
    const indexOfFirstItem = indexOfLastItem - activityPerPage

    const visibleActivity = filteredState.slice(indexOfFirstItem, indexOfLastItem)

    const prevPageHandle = () => {
        if(currentPage !=1) setCurrentPage(currentPage -1)
    }

    const nextPageHandle = () => {
        if(currentPage != numOfTotalPages) setCurrentPage(currentPage +1)
    }
    return (
        <div className="homepage-container">
            <Navbar />
            <div className="wavy">
                <div className="welcome-title">
                <h1>Forge New Bonds,  <span className="adventure"> Unleash Adventure! </span></h1>
                <button className="add-activity-btn" onClick = {navToForm}>Add activity</button>
                </div>
            </div>
            <h2 className="upcoming-title">Upcoming Events ~</h2>
                <div className="activity-card-container">
                    {filteredState.length > 0  && visibleActivity.map((activity) => {
                        return(
                            <>
                                    <div className="activity-card">
                                        <div className="image">
                                            <img className="activity-card-img" src="https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
                                        </div>
                                        <div className="text">
                                            <p className="card-text" id="date">{activity.date}</p>
                                            <Link style={{ textDecoration: 'none' }} to={`/Activity/${activity.id}`}>
                                                <h2 className="card-text">{activity.activityName}</h2>
                                            </Link> 
                                            <p className="card-text content">{activity.creatorName} - {activity.city}</p>
                                        </div>
                                        <div className="edit-btn-center">
                                            <Link style={{ textDecoration: 'none' }} to={`/EditActivity/${activity.id}`}><button className="edit-btn">Edit</button></Link>
                                        </div>
                                    </div>
                            </>
                    )
                })}
            </div>
            <div className="page-navigation">
                <p onClick={prevPageHandle}><i className="fa-solid fa-caret-left"></i></p>
                <p>{pages.map(page => <span className={`${currentPage === page ? 'active' : ''}`} key={page} onClick={() => setCurrentPage(page)}> <i className="fa-solid fa-circle"></i>  </span>)}</p>
                <p onClick={nextPageHandle}><i className="fa-solid fa-caret-right"></i></p>
            </div>
         </div>
        
    )
}

