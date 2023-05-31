import {useState, createContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export const ActivityContext = createContext()

function ActivityContextProvider(props){

    const navigate = useNavigate()

    const [activityFormData, setActivityFormData] = useState({
        activityName: '',
        activityType: '',
        creatorName: '',
        date: ''
    })

    function handleChange(e){
        const {name, value} = e.target
        if(name === 'activity-name'){
            setActivityFormData((prevActivityFormData) => ({
                ...prevActivityFormData,
                activityName:value
            }))
        }else if(name === 'activity-type'){
            setActivityFormData((prevActivityFormData) => ({
                ...prevActivityFormData,
                activityType:value
            }))
        }else if(name === 'creator-name'){
            setActivityFormData((prevActivityFormData) => ({
                ...prevActivityFormData,
                creatorName:value
            }))
        }else if(name === 'date'){
            setActivityFormData((prevActivityFormData) => ({
                ...prevActivityFormData,
                date:value
            }))
        }   
    }

    
    function handleSubmit(event){
        event.preventDefault()
        localStorage.setItem('activityFormData', JSON.stringify(activityFormData))
        setActivityFormData({
            activityName: '',
            activityType: '',
            creatorName: '',
            date: ''
        })
        navigate('/')
    }

    const value = {handleSubmit, handleChange, activityFormData, setActivityFormData}

    return(
        <ActivityContext.Provider value={value}>
            {props.children}
        </ActivityContext.Provider>
    )
}

export default ActivityContextProvider