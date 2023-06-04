import  { useState, useEffect } from 'react'
import Editor from './Editor'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Button from './DeleteButton'
 
const Skills = () => {
  const {subpages} = useParams()
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  useEffect(() =>{
    if (subpages === 'skills'){
      const fetchData = async () =>{
        try {
            const {data} = await axios.get('/skills')
            if (data){
              setContent(data.content)
              setIsEdit(true)
            }
            // console.log(data)
        } catch (e) {
          console.log('Failed to fetch Skills details', e)
          
        }
      }
      fetchData()
    }
  }, [subpages])
  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
      try{
        if(isEdit){
          await axios.put('/skills', {content})
        }else{
          await axios.post('/skills', {content})
          setContent('')

        }
      }catch(e){
        console.log(e)
      }
      navigate('/create-resume')
  }
  const handleDelete = async () =>{
    try {
      await axios.delete('/skills')
      setContent('')
      navigate('/create-resume/skills')
    } catch (e) {
      console.log('Failed to delete skills Details')
    }
  }
  return (
     <form onSubmit={onSubmit} className="p-4 relative group  shadow-md shadow-slate-950 rounded-2xl my-20 flex flex-col max-w-7xl mx-auto gap-4">
      <h4 className='font-semibold flex justify-center'>Skills</h4>
      <Editor value={content} onChange ={setContent}/>
      <div className=' button'>
              <button className='text-slate-200 font-bold uppercase text-sm ' type='submit'>{isEdit? 'update' : 'save'}</button>
        </div>
        {isEdit &&  <Button handleDelete={handleDelete}/>}
    </form>
  )
}

export default Skills