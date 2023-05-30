import Navbar from "../components/Navbar"
import { useEffect} from "react"
import { useContext } from "react"
import { ActivityContext } from "../contexts/ActivityContext"

export default function Homepage(){
    
    const {activityFormData} = useContext(ActivityContext)
    
    useEffect(() => {
        JSON.parse(localStorage.getItem('activityFormData'))
    }, [activityFormData])
    
    return (
        <>
        <Navbar />
        {/* {activities.map((activity) => {
            return (
                <>
                <h1>{activity.activityType}</h1>
                </>
            )
        })} */}
        </>
    )
}