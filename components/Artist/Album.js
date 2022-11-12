import { PlayCircleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { yearAlbum } from '../../lib/time';

const Album = ({album}) => {

  const [hover, setHover] = useState(false);
  const router = useRouter()
  return (
    <div
      className='p-4 bg-neutral-800 rounded-md hover:bg-neutral-700 transition-all cursor-pointer'
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => router.push(`/album/${album.id}`)}
    >
      <div className='mb-4 relative'>
        <img src={album.images[0].url} alt="" />
        <PlayCircleIcon
          className={`button w-12 h-12 text-green-400 hover:scale-105 absolute right-2  transition-all ease-in-out duration-300  ${hover ? 'bottom-2 opacity-100' : '-bottom-2 opacity-0'}`}
        />
      </div>
      <div className='flex flex-col'>
        <span className='truncate font-bold mb-1'>{album.name}</span>
        <span className='text-sm text-gray-300'>{yearAlbum(album)} &bull; Album</span>
      </div>
    </div>
  )
}

export default Album
