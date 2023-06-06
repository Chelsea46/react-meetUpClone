import { Routes, Route } from 'react-router-dom'
import ActivityForm from './components/ActivityForm'
import './App.css'
import Homepage from './pages/Homepage'
import Activity from './pages/Activity'
import EditActivity from './pages/EditActivity'


function App() {


  return (
    <>
     <Routes>
      <Route path='/' element ={<Homepage />} />
      <Route path="/addActivity" element={ < ActivityForm />}/>
      <Route path ='/Activity/:id' element = { <Activity />} />
      <Route path = '/EditActivity/:id' element= {<EditActivity />} />
     </Routes>
    </>
  )
}

export default App
