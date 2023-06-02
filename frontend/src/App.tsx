import {useState} from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Index from './pages/Index'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import axios from 'axios'
import ViewResume from './pages/ViewResume'
axios.defaults.baseURL= import.meta.env.VITE_BASEURL
axios.defaults.withCredentials=true
// console.log(axios.defaults.baseURL)
function App() {
  const [showModal, setShowModal] = useState(false)
  const handleModal = () =>{
    setShowModal(!showModal)
  }


  return (
    <>
    <Navbar handleModal = {handleModal}/>
    {showModal && <ViewResume/>}
    <Routes>
      <Route path='/' element={<Index/>}/>
      <Route path='/create-resume/:subpages/:action' element={<Home/>} />
      <Route path='/create-resume/:subpages?' element={<Home/>} />
      {/* <Route path='/view-resume' element= {<ViewResume/>}/> */}
    </Routes>
     
    </>
  )
}

export default App
