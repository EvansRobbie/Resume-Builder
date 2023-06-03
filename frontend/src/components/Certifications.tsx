import {useState, useEffect} from 'react'
import { Form, Formik } from 'formik'
import axios from 'axios'
import FormikControl from '../forms/FormikControl'
import { useNavigate, useParams } from 'react-router-dom'

const Certifications = () => {
  const {subpages} = useParams()
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState({
    certificate:''
  })
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() =>{
    if (subpages === 'certifications'){
      const fetchData = async () =>{
        try {
            const {data} = await axios.get('/certification')
            if(data){
              setInitialValues(data)
              setIsEdit(true)
            }
            // console.log(data)
        } catch (e) {
          console.log('Failed to fetch Certification details', e)
          
        }
      }
      fetchData()
    }
  }, [subpages])
  const onSubmit = async (values:any, onSubmitProps:any) =>{
    try{
      if(isEdit){
        await axios.put('/certifications', values)
      }else{

        await axios.post('/certifications', values)
        onSubmitProps.resetForm()
        
      }
      navigate('/create-resume')
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