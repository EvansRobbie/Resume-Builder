import { Form, Formik } from 'formik'
import axios from 'axios'
import FormikControl from '../forms/FormikControl'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Objective = () => {
  const {subpages} = useParams()
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState ({
    objective:''
  }
)
const [isEditing, setIsEdit] = useState(false)

useEffect(() =>{
  if (subpages === 'objective'){
      const fetchData =  async () =>{ 
          const {data} =  await axios.get('/objective')
          if(data){
            setInitialValues(data)
            setIsEdit(true)
          }
      }
      fetchData()
  }
}, [subpages])
  const onSubmit = async (values:any, onSubmitProps:any) => {
    try{
      if(isEditing){
        await axios.put('/objective', values)
      }else{
        await axios.post('/objective', values)
        onSubmitProps.resetForm()

      }
    }catch(e){
      console.log(e)
    }
    navigate('/create-resume')
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