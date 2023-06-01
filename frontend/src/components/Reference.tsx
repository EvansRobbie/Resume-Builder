import { Form, Formik } from 'formik'
import axios from 'axios'
import FormikControl from '../forms/FormikControl'

const Reference = () => {
  const initialValues = {
    name:'',
    title:'',
    companyName:'',
    email:'',
    phone:'',

  }
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
              <button className='text-slate-200 font-blod uppercase text-sm ' type='submit'>Save</button>
            </div>
        </Form>
    </Formik>
  )
}

export default Reference