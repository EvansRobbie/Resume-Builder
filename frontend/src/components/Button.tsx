const Button = ({isEdit}:{isEdit?:boolean}) => {
  
  return (
    <div className=' button'>
    <button className='text-slate-200 font-blod uppercase text-sm ' type='submit'>{isEdit? 'update' : 'save'}</button>
</div>
  )
}

export default Button