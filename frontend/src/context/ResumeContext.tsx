import {useState, useContext, createContext, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
interface contextProp {
    user: {username: string} | null
    setUser:React.Dispatch<React.SetStateAction<{username: string} | null>>
    ready:boolean
    handleLogout: ()=> void
}
const ResumeContext = createContext({} as contextProp )
const ResumeContextProvider = ({children}:{children:React.ReactNode}) => {
    const [user, setUser] = useState<{username: string }| null >(null)
    const [ready, setReady] = useState(false)
    const navigate = useNavigate()
    useEffect( () =>{
      const fetchUser = async () =>{
          if (!user) {
           const {data} =  await axios.get('/profile')
           setUser(data)
           setReady(true)
          }
      }
      fetchUser()
  }, [])
  // console.log(user)
  const handleLogout = async () =>{
      await axios.post('/logout')
      setUser(null)
      navigate('/')
      
    }
  return (
    <ResumeContext.Provider value={{user, setUser, ready, handleLogout}}>
        {children}
    </ResumeContext.Provider>
  )
}
export const useResumeContext = () => useContext(ResumeContext)
export default ResumeContextProvider