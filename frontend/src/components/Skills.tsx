import  { useState } from 'react'
import Editor from './Editor'
import axios from 'axios'
 
const Skills = () => {
  const [content, setContent] = useState('')
  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
      try{
        await axios.post('/skills', {content})
      }catch(e){
        console.log(e)
      }
  }
  return (
     <form onSubmit={onSubmit} className="px-4 my-20 flex flex-col py-4 max-w-7xl mx-auto gap-4">
      <h4 className='font-semibold flex justify-center'>Skills</h4>
      <Editor value={content} onChange ={setContent}/>
      <div className=' button'>
              <button className='text-slate-200 font-blod uppercase text-sm ' type='submit'>Save</button>
            </div>
    </form>
  )
}

export default Skills