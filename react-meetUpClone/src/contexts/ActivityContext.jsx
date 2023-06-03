import {useState, createContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export const ActivityContext = createContext()

function ActivityContextProvider(props){

    const navigate = useNavigate()

    // form state
    const [activityFormData, setActivityFormData] = useState({
        activityName: '',
        activityType: '',
        city: '',
        creatorName: '',
        date: ''
      })

    //   new activity state
      const [newActivity, setNewActivity] = useState([]);

    //   search states
    const [activitySearch, setActivitySearch] = useState('')
    const [citySearch, setCitySearch] = useState('')
    const [dateSearch, setDateSearch] = useState('')

    useEffect(() => {
        let localStorageActivity = JSON.parse(localStorage.getItem('activityFormData')) || []
        setNewActivity(localStorageActivity)
    }, [])

    //   form change
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
        }else if(name === 'city'){
            setActivityFormData((prevActivityFormData) => ({
                ...prevActivityFormData,
                city:value
            }))
        }
    }

    
    // handle submit of form
    function handleSubmit(event) {
        event.preventDefault();
        let localStorageActivity = JSON.parse(localStorage.getItem('activityFormData')) || []
        const addedActivity = [...localStorageActivity, activityFormData]
        localStorage.setItem('activityFormData', JSON.stringify(addedActivity))
        setNewActivity(addedActivity)
        setActivityFormData({
          activityName: '',
          activityType: '',
          creatorName: '',
          date: '',
          city: ''
        })
        navigate('/')
      }
      

    //   handle search
    function handleActivity(e) {
        const activityValue = e.target.value;
        setActivitySearch(activityValue);
      }
      
      function handleCity(e) {
        const cityValue = e.target.value;
        setCitySearch(cityValue);
      }
      
      function handleDate(e) {
        const dateValue = e.target.value;
        setDateSearch(dateValue);
      }
      


    const value = { activitySearch, citySearch, dateSearch, handleActivity, handleCity, handleDate, handleSubmit, handleChange, activityFormData, setActivityFormData, newActivity, setNewActivity}

    return(
        <ActivityContext.Provider value={value}>
            {props.children}
        </ActivityContext.Provider>
    )
}

export default ActivityContextProvider