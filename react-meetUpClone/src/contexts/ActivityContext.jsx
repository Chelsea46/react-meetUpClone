import {useState, createContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export const ActivityContext = createContext()

function ActivityContextProvider(props){

    const navigate = useNavigate()

    // form state
    const [activityFormData, setActivityFormData] = useState({
        name: '',
        type: '',
        city: '',
        creator: '',
        date: ''
      })

    //   new activity state
    const [newActivity, setNewActivity] = useState([]);

    //   search states
    const [activitySearch, setActivitySearch] = useState('')
    const [citySearch, setCitySearch] = useState('')
    const [dateSearch, setDateSearch] = useState('')

    // api call for activities
    async function getActivities(){
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/activity`)
        setNewActivity(res.data)
    }

    useEffect(() => {
        // let localStorageActivity = JSON.parse(localStorage.getItem('activityFormData')) || []
        // setNewActivity(localStorageActivity)
        getActivities()
    }, [])

    
    
    //   form change
    function handleChange(e){
        const {name, value} = e.target
        if(name === 'activity-name'){
            setActivityFormData((prevActivityFormData) => ({
                ...prevActivityFormData,
                name:value.charAt(0).toUpperCase() + value.slice(1)
            }))
        }else if(name === 'activity-type'){
            setActivityFormData((prevActivityFormData) => ({
                ...prevActivityFormData,
                type:value.charAt(0).toUpperCase() + value.slice(1)
            }))
        }else if(name === 'creator-name'){
            setActivityFormData((prevActivityFormData) => ({
                ...prevActivityFormData,
                creator:value.charAt(0).toUpperCase() + value.slice(1)
            }))
        }else if(name === 'date'){
            setActivityFormData((prevActivityFormData) => ({
                ...prevActivityFormData,
                date:value
            }))
        }else if(name === 'city'){
            setActivityFormData((prevActivityFormData) => ({
                ...prevActivityFormData,
                city:value.charAt(0).toUpperCase() + value.slice(1)
            }))
        }
    }

    
    // handle submit of form
    async function handleSubmit(event) {
        event.preventDefault()

        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/activity`, activityFormData)
        const addedActivity = res.data

        setNewActivity((prevNewActivity) => [...prevNewActivity, addedActivity]);

        // setNewActivity([...newActivity, {
        //     activityName: activityFormData.name,
        //     activityType: activityFormData.type,
        //     creatorName: activitySearch.creator,
        //     activityCity: activityFormData.city,
        //     activityDate: activityFormData.date,
        //    }])
        navigate('/')
        
        // **Code before Backend was initialised**
        // const uniqueId = uuidv4()
        // const formDataWithId = { ...activityFormData, id: uniqueId }
        

        // let localStorageActivity = JSON.parse(localStorage.getItem('activityFormData')) || []
        // const addedActivity = [...localStorageActivity, formDataWithId]
        
        // localStorage.setItem('activityFormData', JSON.stringify(addedActivity))
        // setNewActivity(addedActivity)
        // setActivityFormData({
        //   activityName: '',
        //   activityType: '',
        //   creatorName: '',
        //   date: '',
        //   city: ''
        // })
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


    const value = { activitySearch, citySearch, dateSearch, handleActivity, handleCity, handleDate, handleSubmit, handleChange, activityFormData, setActivityFormData, newActivity, setNewActivity, getActivities}

    return(
        <ActivityContext.Provider value={value}>
            {props.children}
        </ActivityContext.Provider>
    )
}

export default ActivityContextProvider