import { useContext, useState} from "react"
import { ActivityContext } from "../contexts/ActivityContext"

export default function Searchbar(){

    const {handleActivity, handleCity, handleDate } = useContext(ActivityContext)
    return(
        <div className="search">
            <input type="text"
            placeholder="Activity" onChange={handleActivity} />
            <input type="text" 
            placeholder="City" onChange={handleCity}/>
            <input type="date" onChange={handleDate}/>
         </div>
    )
}