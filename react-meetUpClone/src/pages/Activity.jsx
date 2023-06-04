import { useParams} from "react-router-dom"
import { useContext} from "react"
import { ActivityContext } from "../contexts/ActivityContext"


export default function Activity(){
    
    const { newActivity } = useContext(ActivityContext)

    const {id} = useParams()

    const currentActivity = newActivity.filter(current => { 
        return id === current.id
    })

    return(
        <>
            <p className="card-text" id="date">{currentActivity[0].date}</p>
            <h2 className="card-text">{currentActivity[0].activityName}</h2>
            <p className="card-text content">{currentActivity[0].creatorName} - {currentActivity[0].city}</p>
         </>
    )
}