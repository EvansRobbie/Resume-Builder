import { formProps } from '../interfaces/form'
import { Field } from 'formik'

const Textarea = ({label, name, ...rest}: formProps) => {
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
        <label htmlFor={name}>{label}</label>
        <Field as='textarea' id={name} name={name} {...rest} className='w-full border border-slate-500 px-4 py-1.5 outline-none rounded-xl h-24 bg-slate-200'/>
    </div>
  )
}

export default Textarea