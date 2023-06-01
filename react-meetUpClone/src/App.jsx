import { Routes, Route } from 'react-router-dom'
import ActivityForm from './components/ActivityForm'
import './App.css'
import Homepage from './pages/Homepage'
import Activity from './pages/Activity'


function App() {


  return (
    <>
     <Routes>
      <Route path='/' element ={<Homepage />} />
      <Route path="/addActivity" element={ < ActivityForm />}/>
      <Route path ='Activity' element = { <Activity />} />
     </Routes>
    </>
  )
}

export default App
