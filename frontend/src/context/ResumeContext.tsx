import {useState, useContext, createContext} from 'react'

// interface contextProp {
//     resumeData: {}
//     handleSubmit: () => void
// }
const ResumeContext = createContext({})
const ResumeContextProvider = ({children}:{children:React.ReactNode}) => {
    const [resumeData, setResumeData] = useState({})

    const handleSubmit = (data:any) => {
        setResumeData((prevData) => ({...prevData, ...data}))
    }
  return (
    <ResumeContext.Provider value={{resumeData, handleSubmit}}>
        {children}
    </ResumeContext.Provider>
  )
}
export const useResumeContext = () => useContext(ResumeContext)
export default ResumeContextProvider