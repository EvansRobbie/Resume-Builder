import {useState, useEffect} from 'react'
import { Form, Formik } from 'formik'
import axios from 'axios'
import FormikControl from '../forms/FormikControl'
import { useParams } from 'react-router-dom'

const Certifications = () => {
  const {subpages} = useParams()
  const [initialValues, setInitialValues] = useState({
    certificate:''
  })
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() =>{
    if (subpages === 'certifications'){
      setIsEdit(true)
      const fetchData = async () =>{
        try {
            const {data} = await axios.get('/certification')
            setInitialValues(data)
            // console.log(data)
        } catch (e) {
          console.log('Failed to fetch Certification details', e)
          
        }
      }
      fetchData()
    }
  }, [subpages])
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
    enableReinitialize={true}
    >
        <Form>
        <FormikControl
                control='textarea'
                name = 'certificate'
                label='Certification/ Achievements'
                placeholder='Cisco Certification, AWS Cloud Certification'
            />

            <div className='button'>
              <button className='text-slate-200 font-blod uppercase text-sm ' type='submit'>{isEdit? 'update' : 'save'}</button>
            </div>
        </Form>

    </Formik>
  )
}

export default Certifications