import React, { Children } from 'react'

function Button({
    textColor='text-white',
    type='',
    bgColor='bg-blue-500',
    className='',
    children,
    ...props
}) {
  return (
    <button type={type} className={`px-4 py-2 ${textColor} ${bgColor} ${className} rounded-lg`} {...props}>
        {children}
    </button>
  )
}

export default Button
