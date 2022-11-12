import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

const Playlist = ({playlist}) => {

  const router = useRouter()
  const onClick = () => {
    router.push(`/playlist/${playlist.id}`,undefined, { scroll: true })
  }
  return (
    <div className='h-8 flex items-center px-6 text-sm cursor-pointer hover:text-white' onClick={onClick}>
      {playlist.name}
    </div>
  )
}

export default Playlist
