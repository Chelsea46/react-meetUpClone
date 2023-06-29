import Navbar from "../components/Navbar"
import { useContext, useState, useEffect} from "react"
import { useNavigate, Link } from "react-router-dom"
import { ActivityContext } from "../contexts/ActivityContext"
import Searchbar from "../components/Searchbar"
import moment from "moment"

export default function Homepage(){

    const nav = useNavigate()

    const { newActivity, citySearch, activitySearch, dateSearch} = useContext(ActivityContext)
    const [filteredState, setFilteredState] = useState([])
    const [activityPerPage, setActivityPerPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(1)
    // const [randomImages, setRandomImages] = useState([]);


    
    useEffect(() => {
        if(filteredState.length < 1){
            setFilteredState(newActivity)
        }
    },[newActivity])
    
    // unsplash
    // const fetchRandomImages = async () => {
    //     try {
    //       const randomImagePromises = newActivity.map(async (activity) => {
    //         const response = await fetch("https://api.unsplash.com/photos/random", {
    //           headers: {
    //             Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ID}`,
    //           },
    //         })
    //         const data = await response.json()
    //         return data.urls.regular
    //       })
      
    //       const randomImages = await Promise.all(randomImagePromises);
    //       setRandomImages(randomImages)
    //     } catch (error) {
    //       console.error(error)
    //     }
    // }
        //   end of unsplash
    
    useEffect(() => {
        const filteredActivity = filteredState.filter((activity) =>{
            
            if(activitySearch && citySearch){
                 return (
                     activity.activityName.toLowerCase().includes(activitySearch?.toLowerCase()) &&
                     activity.activityCity.toLowerCase().includes(citySearch.toLowerCase())
                 )
             } else if (activitySearch){
                 return (
                     activity.activityName.toLowerCase().includes(activitySearch?.toLowerCase())
                 )
             } else if (citySearch){
                 return (
                     activity.activityCity.toLowerCase().includes(citySearch.toLowerCase())
                 )
             } else if(dateSearch){
                return (
                    activity.activityDate.includes(dateSearch)
                )
             }
         })
 
        setFilteredState(filteredActivity)
        
        if (filteredActivity.length < 1){
            setFilteredState(newActivity)
        }
    }, [activitySearch, citySearch, dateSearch])
    
    function navToForm(){
        nav('/addActivity')
    }

    // useEffect(() => {
    //     fetchRandomImages();
    //   }, [filteredState]);
      

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
                <div className="hero-section">
                    <div className="welcome-title">
                        <h1 className="bonds">Forge New Bonds,</h1>
                        <h1 className="adventure"> Unleash Adventure! </h1>
                        <p>Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on BuddyUp. Events are happening every day—sign up to join the fun.
                        </p>
                        <button className="add-activity-btn" onClick = {navToForm}>Add activity</button>
                    </div>
                    <div className="homepage-right-img">
                        {/* <img className="homepage-img" src="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=1080" alt="" /> */}
                    </div>
                </div>
            <div className="homepage-card-container">
                <h2 className="upcoming-title">Upcoming Events ~</h2>
                <Searchbar />
                    <div className="activity-card-container">
                        {filteredState.length > 0  && visibleActivity.map((activity) => {
                            return(
                                <>
                                        <div className="activity-card" key={activity._id}>
                                            <div className="text">
                                                <p className="card-text" id="date">{moment(activity.activityDate).format("Do MMM YY")}</p>
                                                <Link style={{ textDecoration: 'none' }} to={`/Activity/${activity._id}`}>
                                                    <h2 className="card-text">{activity.activityName}</h2>
                                                </Link> 
                                                <p className="card-text content">{activity.creatorName} - {activity.activityCity}</p>
                                                <div className="edit-btn-center">
                                                    <Link style={{ textDecoration: 'none' }} to={`/EditActivity/${activity._id}`}><p className="edit-btn">Edit</p></Link>
                                                </div>
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
        </div>
        
    )
}

