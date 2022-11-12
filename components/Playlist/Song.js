import React, { useState } from 'react'
import Link from 'next/link';
import { millisToMinutesAndSeconds } from '../../lib/time';

import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';


const Song = ({index, track}) => {

  const [hover, setHover] = useState(false);
  const router = useRouter()

  return (
    <div
      className='h-14 px-4 rounded hover:bg-neutral-800 grid grid-cols-song gap-4'
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className='flex items-center'>{ hover ? (<Icon icon="clarity:play-solid" className='w-4 h-4'/>): index + 1}</div>
      <div className='flex items-center gap-4'>
        <img className='h-10 w-10' src={track.track?.album.images[0].url} alt="" />
        <div className='grid'>
          <p className='text-white truncate'>{track.track.name}</p>
          <p className='text-sm hover:underline '>
            <Link href={`/artist/${track.track.artists[0].id}`}>
              {track.track.artists[0].name}
            </Link>
          </p>
        </div>
      </div>

      <p className='hidden md:flex items-center'>{track.track.album.name}</p>
      <p className='hidden md:flex items-center'>3 ene 2020</p>
      <div className='flex justify-end items-center'>
        <Icon icon="fluent:heart-20-regular" className={`w-5 h-5 text-gray-300 hover:text-white mr-4 ${!hover && 'opacity-0'}`}/>
        <p className='mr-4'>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
        <EllipsisHorizontalIcon className={`w-6 h-6 text-gray-300 ${!hover && 'opacity-0'}`}/>
      </div>
    </div>
  )
}

export default Song
