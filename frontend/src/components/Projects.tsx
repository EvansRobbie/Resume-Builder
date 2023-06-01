import { Formik, Form } from 'formik'
import React from 'react'
import FormikControl from '../forms/FormikControl'

const Projects = () => {
  const initialValues = {
    name: '',

  }
  const onSubmit = (values) => console.log(values)
  return (
    <Formik
    initialValues= {initialValues}
    onSubmit={onSubmit}
    >
        <Form className='flex flex-col gap-4'>
            <FormikControl
                control = 'input'
                name = 'title'
                label = 'Title'
                placeholder=' React Resume Builder'
            />
             <FormikControl
                control='textarea'
                name = 'description'
                label='Description'
                placeholder='Developed a Resume Builder using Typescript, React, React Formik...'
            />

            <div className='button'>
              <button className='text-slate-200 font-blod uppercase text-sm ' type='submit'>Save</button>
            </div>
        </Form>
    </Formik>
  )
}

export default Projects