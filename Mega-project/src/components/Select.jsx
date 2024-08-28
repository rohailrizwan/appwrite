import React from 'react'

export default function Select({
    label,
    className,
    option,
    ...props
}) {
  return (
    <div className='w-full'>
            {label && (
                <label htmlFor=""> </label>
            )}
            <select name="" id="" className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duraton-200 border border-gray-200 w-full ${className}`}>
                 {option?.map((item)=>(
                    <option value={item}>{item}</option>
                 ))}   
            </select>
    </div>
  )
}
