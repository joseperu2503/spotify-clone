import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AppLayout from '../../Layouts/AppLayout'
import useSpotify from '../../hooks/useSpotify'
import { getSession, useSession } from 'next-auth/react'
import Songs from '../../components/Songs'
import { shuffle } from 'lodash'
import { PlayCircleIcon,HeartIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import Songs2 from '../../components/Songs2'
import { ClockIcon } from '@heroicons/react/24/outline'

const colors = [
  'bg-indigo-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-red-500',
  'bg-yellow-500',
  'bg-pink-500',
  'bg-purple-500',
]

const Playlist = () => {
  const spotifyApi = useSpotify()
  const { query } = useRouter()
  const { data: session } = useSession()
  const [playlist, setPlaylist] = useState({});
  const [color, setColor] = useState(null);


  useEffect(() => {
    if (query.id) {
      const playlistId = query.id
      if(spotifyApi.getAccessToken()){
        spotifyApi.getPlaylist(playlistId)
        .then(data => {
          console.log('playlist actual', data.body)
          setPlaylist(data.body)
        })
        .catch(error => console.log('error al cargar la playlist ',error))
      }
    }
  }, [query.id, spotifyApi])

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [query.id]);

  return (
    <div className='flex-grow text-white h-screen overflow-y-scroll bg-zinc-900 w-full'>
      {/* <header className='absolute top-5 right-8'>
        <div
          className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'
          onClick={() => signOut()}
        >
          <img className='rounded-full w-10 h-10' src={session?.user.image} alt="" />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className='h-5 w-5'/>
        </div>
      </header> */}
      <section className={`flex items-end space-x-7 ${color} h-80 text-white p-8 w-full relative`}>
        <div className='absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-b to-black from-transparent opacity-50'>
        </div>
        <img src={playlist?.images?.[0]?.url} alt="" className='h-52 w-52 shadow-2xl z-0'/>
        <div className=' z-0'>
          <p className='text-xs font-semibold'>PLAYLIST</p>
          <h1 className='text-2xl md:text-3xl xl:text-6xl font-bold'>{playlist?.name}</h1>
          <p className='mt-8 text-gray-400 font-normal'>{playlist?.description}</p>
          <p className='font-semibold text-sm'>Spotify &bull; {playlist?.followers?.total } me gusta &bull; {playlist?.tracks?.total} canciones</p>
        </div>
      </section>

      <div className=''>
        <div className='flex items-center gap-6 px-8 py-4'>
          <PlayCircleIcon className='button w-16 h-16 text-green-400 hover:scale-105'/>
          <HeartIcon className='button w-8 h-8 text-green-400 hover:scale-100'/>
          <EllipsisHorizontalIcon className='button w-8 h-8 text-gray-300 hover:text-white hover:scale-100'/>
        </div>
        <div className='w-100 sticky top-16 px-8 mb-4 '>
          <div className='grid grid-cols-song gap-4 w-100 h-10 border-gray-600 border-b text-xs px-4'>
            <div className='flex items-center justify-end text-base'>#</div>
            <div className='flex items-center'>TÍTULO</div>
            <div className='flex items-center'>ÁLBUM</div>
            <div className='flex items-center'>AGREGADO EL</div>
            <div className='flex items-center'><ClockIcon className='w-5 h-5'/></div>
          </div>
        </div>
        <div className='px-8'>
          <Songs2 playlist={playlist}/>
        </div>
      </div>
    </div>
  )
}

Playlist.PageLayout = AppLayout

export default Playlist

export async function getServerSideProps(context){
  const session = await getSession(context)
  return {
    props: {
      session
    }
  }
}
