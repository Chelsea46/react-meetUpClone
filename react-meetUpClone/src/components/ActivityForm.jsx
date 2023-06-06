import { useState } from "react"
import { useContext } from "react"
import { ActivityContext } from "../contexts/ActivityContext"
import Navbar from "./Navbar"

export default function ActivityForm(){


    const {handleChange, handleSubmit} = useContext(ActivityContext)
   

    return(
        <div className="form-page-container">
            <Navbar />
            <div className="center-form">
                <div className="activity-form-container">
                    <h1>Lets add an activity!</h1>
                    <form onSubmit = {handleSubmit}>
                        <input className="form-input" type="text" name="activity-name" placeholder="Activity name" onChange={handleChange} required/>
                        <input className="form-input"type="text" name="activity-type" placeholder="What type of activity?" onChange={handleChange} required/>
                        <input className="form-input"type="text" name="creator-name" placeholder="Creators name" onChange={handleChange} required/>
                        <input className="form-input"type="text" name="city" placeholder="City" onChange={handleChange} required/>
                        <input className="form-input"type="date" name="date" onChange={handleChange} required />
                        <button className="activity-btn">Submit Activity</button>
                    </form>
                </div>
            </div>
        </div>
    )
}