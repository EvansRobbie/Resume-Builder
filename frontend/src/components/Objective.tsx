import { Form, Formik } from 'formik'
import React from 'react'
import FormikControl from '../forms/FormikControl'

const Objective = () => {
  const initialValues = {
    objective:''
  }

  const onSubmit = (values:any) => {
    
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