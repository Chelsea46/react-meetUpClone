import { useParams} from "react-router-dom"
import { useContext} from "react"
import { ActivityContext } from "../contexts/ActivityContext"


export default function Activity(){
    
    const { newActivity } = useContext(ActivityContext)
    
    return(
        <>
        </>
    )
}