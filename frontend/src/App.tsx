import './App.css'
import {Routes, Route} from 'react-router-dom'
import Index from './pages/Index'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
 
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Index/>}/>
      <Route path='/create-resume/:subpages/:action' element={<Home/>} />
      <Route path='/create-resume/:subpages?' element={<Home/>} />
    </Routes>
     
    </>
  )
}

export default App
