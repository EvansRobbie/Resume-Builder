import { Form, Formik } from 'formik'
import axios from 'axios'
import FormikControl from '../forms/FormikControl'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Objective = () => {
  const {subpages} = useParams()
  const [initialValues, setInitialValues] = useState ({
    objective:''
  }
)
const [isEditing, setIsEdit] = useState(false)

useEffect(() =>{
  if (subpages === 'objective'){
      setIsEdit(true)

      const fetchData =  async () =>{ 
          const {data} =  await axios.get('/objective')
          setInitialValues(data)
      }
      fetchData()
  }
}, [subpages])
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
    enableReinitialize={true}
    >
        <Form>
        <FormikControl
                control='textarea'
                name = 'objective'
                label='Objective'
                placeholder='Results-driven and highly motivated Full Stack Junior developer.....'
            />

            <div className='button'>
              <button className='text-slate-200 font-blod uppercase text-sm ' type='submit'>{isEditing ? 'update' : 'save'}</button>
            </div>
        </Form>

    </Formik>
  )
}

export default Objective