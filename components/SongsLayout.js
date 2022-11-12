import React from 'react'

const SongsLayout = ({children}) => {

  return (
    <div className='flex flex-col space-y-1 pb-28 text-white'>
      {children}
    </div>
  )
}

export default SongsLayout
