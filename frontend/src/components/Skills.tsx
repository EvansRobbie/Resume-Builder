import  { useState } from 'react'
import Editor from './Editor'

const Skills = () => {
  const [content, setContent] = useState('')
  const onSubmit = () =>{

  }
  return (
     <form onSubmit={onSubmit} className="px-4 my-20 flex flex-col py-4 max-w-7xl mx-auto gap-4">
      <h4 className='font-semibold flex justify-center'>Skills</h4>
      <Editor value={content} onChange ={setContent}/>
      
    </form>
  )
}

export default Skills