import { Form, Formik } from 'formik'
import axios from 'axios'
import FormikControl from '../forms/FormikControl'

const Objective = () => {
  const initialValues = {
    objective:''
  }

  const onSubmit = async (values:any) => {
    try{
      await axios.post('/objective', values)
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
                name = 'objective'
                label='Objective'
                placeholder='Results-driven and highly motivated Full Stack Junior developer.....'
            />

            <div className='button'>
              <button className='text-slate-200 font-blod uppercase text-sm ' type='submit'>Save</button>
            </div>
        </Form>

    </Formik>
  )
}

export default Objective