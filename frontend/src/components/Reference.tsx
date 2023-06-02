import {useState, useEffect} from 'react'
import { Form, Formik } from 'formik'
import axios from 'axios'
import FormikControl from '../forms/FormikControl'
import { useParams } from 'react-router-dom'

const Reference = () => {
  const {subpages} = useParams()
  const [initialValues, setInitialValues] = useState({
    name:'',
    title:'',
    companyName:'',
    email:'',
    phone:'',

  })
  const [isEdit, setIsEdit] = useState(false)
  useEffect(() =>{
    if (subpages === 'reference'){
      setIsEdit(true)
      const fetchData = async () =>{
        try {
            const {data} = await axios.get('/referee')
            setInitialValues(data)
            // console.log(data)
        } catch (e) {
          console.log('Failed to fetch Referee details', e)
          
        }
      }
      fetchData()
    }
  }, [subpages])
  const onSubmit = async (values:any) => {
    try{
      await axios.post('/reference', values)
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
                  name = 'name'
                  label = 'Referee Name'
                  placeholder ='John Doe'
                 
              />
              <FormikControl
                  control = 'input'
                  name = 'title'
                  label = 'Job Title'
                  placeholder = 'Senior Software Developer'
                  
              />

          {/* </div> */}
            <div className='grid grid-cols-2 gap-4'>

            <FormikControl
                control = 'input'
                name = 'companyName'
                label = 'Company Name'
                placeholder = 'Google'
            />
            <FormikControl
                  control = 'input'
                  name = 'email'
                  label = 'Email'
                  placeholder = 'johndoe@gmail.com'
                  
              />
            </div>
            <FormikControl
                control = 'input'
                name = 'phone'
                label = 'Phone'
                placeholder= '+254700000000'
            />
            <div className=' button'>
              <button className='text-slate-200 font-blod uppercase text-sm ' type='submit'>{isEdit? 'update' : 'save'}</button>
            </div>
        </Form>
    </Formik>
  )
}

export default Reference