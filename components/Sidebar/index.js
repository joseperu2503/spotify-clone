import {
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  HeartIcon,
  RssIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline'

import { signOut, useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import useSpotify from '../../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../../atoms/playlistAtom'
import Playlist from './Playlist'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react';
import HomeIcon from './Icons/Home'
import SpotifyIcon from './Icons/Spotify'
import Link from 'next/link'
import SearchIcon from './Icons/Search'
import CollectionIcon from './Icons/Collection'
import PlusIcon from './Icons/Plus'
import HeartSolidIcon from './Icons/HeartSolid'
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";


const Li = () => {

}

function Sidebar() {

  const router = useRouter()
  const spotifyApi = useSpotify()
  const {data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistsHeigth, setPlaylistsHeigth] = useState(0)
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
  const myRef = useRef();

  console.log('ypu picked playlist >> ', playlistId)

  useEffect(() => {
    if(spotifyApi.getAccessToken()){
      spotifyApi.getUserPlaylists({ limit: 50 })
      .then((data) => {
        setPlaylists(data.body.items)
      })
      .catch(error => console.log(error))
    }
  }, [session, spotifyApi]);

  useEffect(() => {
    console.log('myRef',myRef);
    setPlaylistsHeigth(myRef.current._osTargetRef.current.clientHeight)
  }, []);

  console.log(playlists)

  return (
    <div className='fixed flex flex-col top-0 left-0 w-60 pb-36 text-sidebar-gray pt-6 text-xs lg:text-sm border-r border-gray-900 scrollbar-hide h-screen '>
      <div className='px-6 mb-[18px] min-h-[47.59px]'>
        <Link href={'/'} className="">
          <SpotifyIcon/>
        </Link>
      </div>
      <ul>
        <li className='px-2'>
          <Link href={'/hola'} className='flex items-center gap-4 px-4 h-10'>
            <HomeIcon/>
            <span className='text-sm font-bold'>Home</span>
          </Link>
        </li>
        <li className='px-2'>
          <Link href={'/hola'} className='flex items-center gap-4 px-4 h-10'>
            <SearchIcon/>
            <span className='text-sm font-bold'>Search</span>
          </Link>
        </li>
        <li className='px-2'>
          <Link href={'/hola'} className='flex items-center gap-4 px-4 h-10'>
            <CollectionIcon/>
            <span className='text-sm font-bold'>YourLibrary</span>
          </Link>
        </li>
      </ul>
      <div className='mt-6 flex'>
        <div className='flex flex-col w-full'>
          <div className='px-6 py-2 flex items-center cursor-pointer text-white opacity-70 hover:opacity-100 transition-all duration-200'>
            <div className='h-6 w-6 mr-4'>
              <div className='bg-sidebar-gray h-full w-full rounded-sm flex items-center justify-center'>
                <PlusIcon/>
              </div>
            </div>
            <span className='text-sm font-bold'>Create Playlist</span>
          </div>
          <div className='px-6 py-2 flex items-center cursor-pointer text-white opacity-70 hover:opacity-100 transition-all duration-200'>
            <div className='h-6 w-6 mr-4'>
              <div className='bg-gradient-liked-songs h-full w-full rounded-sm flex items-center justify-center'>
                <HeartSolidIcon/>
              </div>
            </div>
            <span className='text-sm font-bold'>Liked Songs</span>
          </div>
          <div>
            <hr className='h-[1px] mx-6 mt-2 border-none bg-[#282828]'/>
          </div>
          <div className='h-full'>
            <OverlayScrollbarsComponent ref={myRef} options={{
              className       : "os-theme-light",
              resize          : "both",
              sizeAutoCapable : true,
              paddingAbsolute : true,
              scrollbars : {
                clickScrolling : true
              },
              callbacks : {
                onScroll : null,
              }
            }}>
              <div className='h-[calc(100vh_-_350px)] pt-2' >
                { playlists.map( playlist => (
                  <Playlist key={playlist.id} playlist={playlist}/>
                ))}
              </div>


            </OverlayScrollbarsComponent>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Sidebar
