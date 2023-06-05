import React, {useEffect} from 'react'
import { useResumeContext } from '../context/ResumeContext'
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'

interface childrenProp {
    children: React.ReactNode
}
const ProtectedRoute = ({children}:childrenProp) => {
    const {user} = useResumeContext()
    useEffect(() => {
        if (!user) {
          toast.success('Login To Create Your Resume');
        }
      }, [user]);
    if (!user){
        return(<>
        <Navigate to ='/'/>
        {/* {toast.success('Login To Create Your Resume')} */}
        </> 
        )
    }else{
        return <div>{children}</div>
    }
}

export default ProtectedRoute