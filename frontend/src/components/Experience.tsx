import axios from 'axios'
import FormikControl from '../forms/FormikControl'
import { Form, Formik } from 'formik'

const Experience = () => {
  const initialValues = {
    companyName: '',
    jobTitle:'',
    start:'',
    end:'',
    details:''
  }
  const onSubmit = async (values:any) => {
    try{
      await axios.post('/experience', values)
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
              <button className='text-slate-200 font-blod uppercase text-sm ' type='submit'>Save</button>
            </div>
        </Form>
    </Formik>
  )
}

export default Experience