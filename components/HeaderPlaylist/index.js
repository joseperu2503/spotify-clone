import { EllipsisHorizontalIcon, HeartIcon,PlayCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'

const HeaderPlaylist = () => {
  return (
    <div className='flex items-center gap-6 px-8 py-4'>
      <PlayCircleIcon className='button w-16 h-16 text-green-400 hover:scale-105'/>
      <HeartIcon className='button w-8 h-8 text-green-400 hover:scale-100'/>
      <EllipsisHorizontalIcon className='button w-8 h-8 text-gray-300 hover:text-white hover:scale-100'/>
    </div>
  )
}

export default HeaderPlaylist
