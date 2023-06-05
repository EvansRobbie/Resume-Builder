import React from 'react'
interface childrenProp{
    children: React.ReactNode
}

const TextError = ({children}:childrenProp) => {
  return (
    <div className='text-red-500 text-sm py-1'>
    {children}
</div>
  )
}

export default TextError