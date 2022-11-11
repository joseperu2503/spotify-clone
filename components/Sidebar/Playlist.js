import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

const Playlist = ({playlist}) => {

  const router = useRouter()
  const onClick = () => {
    router.push(`/playlist/${playlist.id}`,undefined, { scroll: true })
  }


  return (
    <p

      className='cursor-pointer hover:text-white'
      onClick={onClick}
    >
      {playlist.name}

    </p>
  )
}

export default Playlist
