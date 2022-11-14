import { PlayCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Artist = ({artist}) => {

  const [hover, setHover] = useState(false);
  const router = useRouter()

  return (
    <Link
      href={`/artist/${artist.id}`}
      className='p-4 bg-neutral-800 rounded-md hover:bg-neutral-700 transition-all cursor-pointer'
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className='mb-4 relative'>
        <img src={artist.images[0].url} alt="" className='rounded-full'/>
        <PlayCircleIcon
          className={`button w-12 h-12 text-green-400 hover:scale-105 absolute right-2  transition-all ease-in-out duration-300  ${hover ? 'bottom-2 opacity-100' : '-bottom-2 opacity-0'}`}
        />
      </div>
      <div className='flex flex-col'>
        <span className='truncate font-bold mb-1'>{artist.name}</span>
        <span className='text-sm text-gray-300'>Artist</span>
      </div>
    </Link>
  )
}

export default Artist
