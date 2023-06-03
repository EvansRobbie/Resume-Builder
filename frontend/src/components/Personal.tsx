import {useState, useEffect} from 'react'
import { Form, Formik } from 'formik'
import axios from 'axios'
import FormikControl from '../forms/FormikControl'
import { useNavigate, useParams } from 'react-router-dom'

const Personal = () => {
 const {subpages} = useParams()
 const navigate = useNavigate()
//  console.log(params)
const [isEdit, setIsEdit] = useState(false)
// const [ready, set]
  const [initialValues, setInitialValues] = useState ({
    name: '',
    email:'',
    address: '',
    phone:'',
    website: '',
    linked: ''

  })
  useEffect(() =>{
    if (subpages === 'personal'){

      const fetchData = async () =>{
        try{
          const {data} = await axios.get('/personal')
          if(data){
            setInitialValues(data)
            setIsEdit(true)
          }
          
        }catch(e){
          console.log('Failed to fetch personal Data', e)
        }
      }
      fetchData()
    }
  }, [subpages])
  const onSubmit = async (values:any, onSubmitProps:any) => {
    try{
      if(isEdit){
        await axios.put('/personal', values)
      }else{

        await axios.post('/personal', values)
        onSubmitProps.resetForm()
        navigate('/create-resume')
      }
    }catch(e){
      console.log(e)
    }
  }
  // console.log(isEdit)
  return (
    // enable initialize helps in pupulating the data that is in the db in the input fields for editing
    <Formik
    initialValues= {initialValues}
    onSubmit={onSubmit}
    enableReinitialize={true}
    className='py-4'
    >
        <Form className='w-full flex flex-col gap-6'>
          <div className='grid grid-cols-2 w-full gap-4'>
              <FormikControl
                  control = 'input'
                  name = 'name'
                  label = 'Name'
                  placeholder ='Jane Doe'
                 
              />
              <FormikControl
                  control = 'input'
                  name = 'email'
                  label = 'Email'
                  placeholder = 'janedoe@gmail.com'
                  
              />

          </div>
            <FormikControl
                control='textarea'
                name = 'address'
                label='Address'
                placeholder='Nairobi, Kenya'
            />
            <div className='grid grid-cols-2 gap-4'>

            <FormikControl
                control = 'input'
                name = 'phone'
                label = 'Phone'
                placeholder = '+254700000000'
            />
            <FormikControl
                control = 'input'
                name = 'website'
                label = 'Website'
                placeholder='www.janedoe.com'
            />
            </div>
            <FormikControl
                control = 'input'
                name = 'linked'
                label = 'LinkedIn'
                placeholder= 'www.linkedin/janedoe.com'
            />
            <div className=' button'>
              <button className='text-slate-200 font-blod uppercase text-sm ' type='submit'>{isEdit? 'update' : 'save'}</button>
            </div>
        </Form>
    </Formik>
  )
}

export default Personal