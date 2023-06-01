import { Form, Formik } from 'formik'
import React from 'react'
import FormikControl from '../forms/FormikControl'

const Personal = () => {
  const initialValues = {
    name: '',
    email:'',
    address: '',
    phone:'',
    website: '',
    linked: ''

  }
  const onSubmit = (values:any) => {
   
    console.log(values)
  }
  return (
    <Formik
    initialValues= {initialValues}
    onSubmit={onSubmit}
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
              <button className='text-slate-200 font-blod uppercase text-sm ' type='submit'>Save</button>
            </div>
        </Form>
    </Formik>
  )
}

export default Personal