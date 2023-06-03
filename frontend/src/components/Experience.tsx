import {useState, useEffect} from 'react'
import axios from 'axios'
import FormikControl from '../forms/FormikControl'
import { Form, Formik } from 'formik'
import { useParams } from 'react-router-dom'

const Experience = () => {
  const {subpages} = useParams()
  // console.log(subpages)
  const [initialValues, setInitialValues] = useState ({
    companyName: '',
    jobTitle:'',
    start:'',
    end:'',
    details:''
  })
const [isEdit, setIsEdit] = useState(false)

useEffect(() =>{
  if (subpages === 'experience'){
    setIsEdit(true)
    const fetchData = async () =>{
      try {
          const {data} = await axios.get('/experience')
          if(data){
            setInitialValues(data)
            setIsEdit(true)
          }
          // console.log(data)
      } catch (e) {
        console.log('Failed to fetch Experience details', e)
        
      }
    }
    fetchData()
  }
}, [subpages])
// console.log(initialValues)
  const onSubmit = async (values:any, onSubmitProps:any) => {
    try{
      await axios.post('/experience', values)
      onSubmitProps.resetForm()
    }catch(e){
      console.log(e)
    }
  }
  return (
    <Formik
    initialValues= {initialValues}
    onSubmit={onSubmit}
    enableReinitialize={true}
    className='py-4'
    >
        <Form className='w-full flex flex-col gap-6'>
          {/* <div className='grid grid-cols-2 w-full gap-4'> */}
              <FormikControl
                  control = 'input'
                  name = 'companyName'
                  label = 'Company Name'
                  placeholder ='Google'
                 
              />
              <FormikControl
                  control = 'input'
                  name = 'jobTitle'
                  label = 'Job Title'
                  placeholder = 'Software Developer'
                  
              />

          {/* </div> */}
            <div className='grid grid-cols-2 gap-4'>

            <FormikControl
                control = 'input'
                name = 'start'
                label = 'Start Date'
                placeholder = 'March - 2023'
            />
            <FormikControl
                control = 'input'
                name = 'end'
                label = 'End Date'
                placeholder='upto Date/ Present'
            />
            </div>
            <FormikControl
                control='textarea'
                name = 'details'
                label='Details'
                placeholder='collaborated with team to members to write clean and efficient code ...'
            />
            <div className=' button'>
              <button className='text-slate-200 font-blod uppercase text-sm ' type='submit'>{isEdit? 'update' : 'save'}</button>
            </div>
        </Form>
    </Formik>
  )
}

export default Experience