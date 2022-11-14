import React from 'react'

const SongsLayout = ({children}) => {

  return (
    <div className='flex flex-col gap-1 text-white'>
      {children}
    </div>
  )
}

export default SongsLayout
