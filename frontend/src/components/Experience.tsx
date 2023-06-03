import {useState, useEffect} from 'react'
import axios from 'axios'
import FormikControl from '../forms/FormikControl'
import { Form, Formik, FieldArray } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'

const Experience = () => {
  const {subpages} = useParams()
  const navigate = useNavigate()
  // console.log(subpages)
  const [initialValues, setInitialValues] = useState ({
    experiences:[
      {
        companyName: '',
        jobTitle:'',
        start:'',
        end:'',
        details:''

      }
    ]
  })
const [isEdit, setIsEdit] = useState(false)

useEffect(() =>{
  if (subpages === 'experience'){
    // setIsEdit(true)
    const fetchData = async () =>{
      try {
          const {data} = await axios.get('/experience')
          if(data){
            const updatedInitialValues = { experiences: data.experiences };
            setInitialValues(updatedInitialValues);
            setIsEdit(true)
          }
          // console.log(data)
      } catch (e) {
        console.log('Failed to fetch Experience details', e)
        
      }
    }
    fetchData()
  }
}, [subpages])
// console.log(initialValues)
  const onSubmit = async (values:any, onSubmitProps:any) => {
    try{
      if(isEdit){
        await axios.put('/experience', {experiences: values.experiences})
      }else{

        await axios.post('/experience', {experiences: values.experiences})
        onSubmitProps.resetForm()
        
      }
      navigate('/create-resume')
    }catch(e){
      console.log(e)
    }
  }
  return (
    <Formik
    initialValues= {initialValues}
    onSubmit={onSubmit}
    enableReinitialize={true}
    className='py-4'
    >
      {(formik) =>(
        <Form className='w-full flex flex-col gap-6'>
          {/* <div className='grid grid-cols-2 w-full gap-4'> */}
          <FieldArray name='experiences'>
            {({push, remove}) =>(
              <div>
                {formik.values.experiences.map((_, index) =>(
                  <div key={index}  className="my-10 relative shadow-md overflow-hidden  shadow-slate-900 px-4 rounded-2xl py-5" >

                      <FormikControl
                          control = 'input'
                          name = {`experiences.[${index}].companyName`}
                          label = 'Company Name'
                          placeholder ='Google'
                        
                      />
                      <FormikControl
                          control = 'input'
                          name =  {`experiences.[${index}].jobTitle`}
                          label = 'Job Title'
                          placeholder = 'Software Developer'
                          
                      />
        
                  {/* </div> */}
                    <div className='grid grid-cols-2 gap-4'>
        
                    <FormikControl
                        control = 'input'
                        name =  {`experiences.[${index}].start`}
                        label = 'Start Date'
                        placeholder = 'March - 2023'
                    />
                    <FormikControl
                        control = 'input'
                        name =  {`experiences.[${index}].end`}
                        label = 'End Date'
                        placeholder='upto Date/ Present'
                    />
                    </div>
                    <FormikControl
                        control='textarea'
                        name =  {`experiences.[${index}].details`}
                        label='Details'
                        placeholder='collaborated with team to members to write clean and efficient code ...'
                    />
                     {index > 0 && (
                      <button className="absolute top-0 bg-red-500 text-slate-200 right-0 px-4 py-1 text-sm" type="button" onClick={() => remove(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>

                      </button>
                    )}
                  </div>
                  
                ))}
                 <button className="bg-cyan-500 flex px-4 py-1 text-sm rounded-full my-3 gap-2 items-center hover:bg-slate-950 duration-500 ease-in text-slate-200" type="button" onClick={() => push({})}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                  Add
                </button>
              </div>
            )}
          </FieldArray>
          <button
              className='text-slate-200 button font-blod uppercase text-sm disabled:bg-cyan-500/20 cursor-pointer disabled:text-slate-950'
              type='submit'
              disabled={!formik.dirty || !formik.isValid}
            >
              {isEdit ? 'Update' : 'Save'}
            </button>
        </Form>

      )}
    </Formik>
  )
}

export default Experience