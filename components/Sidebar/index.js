import {
  HomeIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  HeartIcon,
  RssIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline'

import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../../atoms/playlistAtom'
import Playlist from './Playlist'
import { useRouter } from 'next/router'



function Sidebar() {

  const router = useRouter()
  const spotifyApi = useSpotify()
  const {data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  console.log('ypu picked playlist >> ', playlistId)

  useEffect(() => {
    if(spotifyApi.getAccessToken()){
      spotifyApi.getUserPlaylists()
      .then((data) => {
        setPlaylists(data.body.items)
      })
      .catch(error => console.log(error))
    }
  }, [session, spotifyApi]);

  console.log(playlists)

  return (
    <div className='text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen w-60 hidden md:inline-flex pb-36'>
      <div className='space-y-4'>
        <button className='flex items-center space-x-2 hover:text-white' onClick={() => router.push('/')}>
          <HomeIcon className="h-5 w-5"/>
          <p>Home</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <MagnifyingGlassIcon className="h-5 w-5"/>
          <p>Search</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <BuildingLibraryIcon className="h-5 w-5"/>
          <p>Your Library</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900'/>
        <button className='flex items-center space-x-2 hover:text-white'>
          <PlusCircleIcon className="h-5 w-5"/>
          <p>Create Playlist</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HeartIcon className="h-5 w-5"/>
          <p>Liked Songs</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <RssIcon className="h-5 w-5"/>
          <p>Your Episodes</p>
        </button>

        <hr className='border-t-[0.1px] border-gray-900'/>
        {/* Playlists */}
        { playlists.map( playlist => (
          // <p
          //  key={playlist.id}
          //  className='cursor-pointer hover:text-white'
          //  onClick={() => setPlaylistId(playlist.id)}
          // >
          //   {playlist.name}
          // </p>
          <Playlist key={playlist.id} playlist={playlist}/>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
