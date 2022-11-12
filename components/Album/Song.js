import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { millisToMinutesAndSeconds } from '../../lib/time'
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';

const Song = ({track,index}) => {

  const [hover, setHover] = useState(false);
  const router = useRouter()

  return (
    <div
      className='h-14 px-4 rounded hover:bg-neutral-800 grid grid-cols-[16px_4fr_minmax(120px,_1fr)] gap-4'
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className='flex items-center'>{ hover ? (<Icon icon="clarity:play-solid" className='w-4 h-4'/>): index + 1}</div>
      <div className='flex justify-center flex-col'>
        <p className='text-white truncate'>{track.name}</p>
        <p
          className='text-sm text-gray-300 hover:underline cursor-pointer'
          onClick={() => router.push(`/artist/${track.artists[0].id}`)}
        >
            {track.artists[0].name}
          </p>
      </div>
      <div className='flex justify-end items-center'>
        <Icon icon="fluent:heart-20-regular" className={`w-5 h-5 text-gray-300 hover:text-white mr-4 ${!hover && 'opacity-0'}`}/>
        <p className='mr-4'>{millisToMinutesAndSeconds(track.duration_ms)}</p>
        <div>
        </div>
        <EllipsisHorizontalIcon className={`w-6 h-6 text-gray-300 ${!hover && 'opacity-0'}`}/>
      </div>
    </div>
  )
}

export default Song
