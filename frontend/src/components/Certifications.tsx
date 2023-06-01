import { Form, Formik } from 'formik'
import axios from 'axios'
import FormikControl from '../forms/FormikControl'

const Certifications = () => {
  const initialValues = {
    certificate:''
  }
  const onSubmit = async (values:any) =>{
    try{
      await axios.post('/certifications', values)
    }catch(e){
      console.log(e)
    }
  }
  return (
    <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    >
        <Form>
        <FormikControl
                control='textarea'
                name = 'certificate'
                label='Certification/ Achievements'
                placeholder='Cisco Certification, AWS Cloud Certification'
            />

            <div className='button'>
              <button className='text-slate-200 font-blod uppercase text-sm ' type='submit'>Save</button>
            </div>
        </Form>

    </Formik>
  )
}

export default Certifications