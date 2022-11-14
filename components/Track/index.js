import { PlayCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { yearAlbum } from '../../lib/time';

const Track = ({track}) => {

  const [hover, setHover] = useState(false);
  const router = useRouter()

  const onClickArtist = (event) => {
    event.preventDefault();
    router.push(`/artist/${track.artists[0].id}`)
  }

  return (
    <Link
      href={`/track/${track.id}`}
      className='p-4 bg-neutral-800 rounded-md hover:bg-neutral-700 transition-all cursor-pointer'
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className='mb-4 relative'>
        <img src={track.album.images[0].url} alt="" />
        <PlayCircleIcon
          className={`button w-12 h-12 text-green-400 hover:scale-105 absolute right-2  transition-all ease-in-out duration-300  ${hover ? 'bottom-2 opacity-100' : '-bottom-2 opacity-0'}`}
        />
      </div>
      <div className='flex flex-col'>
        <span className='truncate font-bold mb-1'>{track.name}</span>
        <span onClick={onClickArtist} className='text-sm text-gray-300 hover:underline'>{track.artists[0].name}</span>
      </div>
    </Link>
  )
}

export default Track
