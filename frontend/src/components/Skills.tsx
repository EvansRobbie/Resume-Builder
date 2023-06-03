import  { useState, useEffect } from 'react'
import Editor from './Editor'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
 
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
  return (
     <form onSubmit={onSubmit} className="px-4 my-20 flex flex-col py-4 max-w-7xl mx-auto gap-4">
      <h4 className='font-semibold flex justify-center'>Skills</h4>
      <Editor value={content} onChange ={setContent}/>
      <div className=' button'>
              <button className='text-slate-200 font-boldd uppercase text-sm ' type='submit'>{isEdit? 'update' : 'save'}</button>
        </div>
    </form>
  )
}

export default Skills