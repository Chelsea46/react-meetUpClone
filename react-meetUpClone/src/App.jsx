import { Routes, Route } from 'react-router-dom'
import ActivityForm from './components/ActivityForm'
import './App.css'
import Homepage from './pages/Homepage'


function App() {


  return (
    <>
     <Routes>
      <Route path='/' element ={<Homepage />} />
      <Route path="/addActivity" element={ <ActivityForm/>}/>
     </Routes>
    </>
  )
}

export default App
