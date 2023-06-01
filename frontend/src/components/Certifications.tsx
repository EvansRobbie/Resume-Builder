import { Form, Formik } from 'formik'
import React from 'react'
import FormikControl from '../forms/FormikControl'

const Certifications = () => {
  const initialValues = {}
  const onSubmit =  () =>{}
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