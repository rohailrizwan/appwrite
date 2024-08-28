import React from 'react'

function Container({children}) {
  return (
    <div className='mx-auto max-w-7xl px-4 w-full'>
        {children}
    </div>
  )
}

export default Container
