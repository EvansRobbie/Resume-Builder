import {useState, useEffect} from 'react'
import axios from 'axios'
import FormikControl from '../forms/FormikControl'
import { Form, Formik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'

const Education = () => {
  const {subpages} = useParams()
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState({
    course:'',
    school:'',
    grade:'',
    year:'',
  })
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() =>{
    if (subpages === 'education'){
      
      const fetchData = async () =>{
        try {
            const {data} = await axios.get('/education')
            if(data){
              setInitialValues(data)
              setIsEdit(true)
            }
            // console.log(data)
        } catch (e) {
          console.log('Failed to fetch Education details', e)
          
        }
      }
      fetchData()
    }
  }, [subpages])
  // console.log(initialValues)
  const onSubmit = async (values:any, onSubmitProps:any) =>{
    try{
      if(isEdit){
        await axios.put('/education', values)
      }else{

        await axios.post('/education', values)
        onSubmitProps.resetForm()
        
      }
      navigate('/create-resume')
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
                  name = 'course'
                  label = 'Course/Degree'
                  placeholder ='Bsc Infomation Technology'
                 
              />
              <FormikControl
                  control = 'input'
                  name = 'school'
                  label = 'School/University'
                  placeholder = 'University of ...'
                  
              />

          {/* </div> */}
          <FormikControl
                control = 'input'
                name = 'grade'
                label = 'Grade/Score'
                placeholder = 'University of ...'
                
            />
          
            <FormikControl
                control = 'input'
                name = 'year'
                label = 'Year'
                placeholder= '2011 - 2015'
            />
            <div className=' button'>
              <button className='text-slate-200 font-blod uppercase text-sm ' type='submit'>{isEdit? 'Update': 'save'}</button>
            </div>
        </Form>
    </Formik>
  )
}

export default Education