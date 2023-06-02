import {useState, useEffect} from 'react'
import { Formik, Form } from 'formik'
import axios from 'axios'
import FormikControl from '../forms/FormikControl'
import { useParams } from 'react-router-dom'

const Projects = () => {
  const {subpages} = useParams()
  const [initialValues, setInitialValues] = useState({
    title : '',
    description : '',


  })
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() =>{
    if (subpages === 'projects'){
      setIsEdit(true)
      const fetchData = async () =>{
        try {
            const {data} = await axios.get('/projects')
            setInitialValues(data)
            // console.log(data)
        } catch (e) {
          console.log('Failed to fetch Projects details', e)
          
        }
      }
      fetchData()
    }
  }, [subpages])
  const onSubmit = async (values:any) => {
    try{
      await axios.post('/projects', values)
    }catch(e){
      console.log(e)
    }
  }
  return (
    <Formik
    initialValues= {initialValues}
    onSubmit={onSubmit}
    enableReinitialize={true}
    >
        <Form className='flex flex-col gap-4'>
            <FormikControl
                control = 'input'
                name = 'title'
                label = 'Title'
                placeholder=' React Resume Builder'
            />
             <FormikControl
                control='textarea'
                name = 'description'
                label='Description'
                placeholder='Developed a Resume Builder using Typescript, React, React Formik...'
            />

            <div className='button'>
              <button className='text-slate-200 font-blod uppercase text-sm ' type='submit'>Save</button>
            </div>
        </Form>
    </Formik>
  )
}

export default Projects