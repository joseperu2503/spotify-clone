import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import AppLayout from '../../Layouts/AppLayout'
import useSpotify from '../../hooks/useSpotify'
import { getSession } from 'next-auth/react'
import { shuffle } from 'lodash'
import { PlayCircleIcon,HeartIcon, EllipsisHorizontalIcon, CheckBadgeIcon, CheckIcon } from '@heroicons/react/24/solid'
import Songs2 from '../../components/Songs2'
import { ClockIcon } from '@heroicons/react/24/outline'
import { useRecoilState } from 'recoil'
import { scrollState } from '../../atoms/scrollAtom'

const colors = [
  'bg-indigo-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-red-500',
  'bg-yellow-500',
  'bg-pink-500',
  'bg-purple-500',
]

const Artist = () => {
  const spotifyApi = useSpotify()
  const { query } = useRouter()
  const [artist, setArtist] = useState({});
  const [color, setColor] = useState(null);
  const [headerTop, setHeaderTop] = useState(false);
  const [scroll, setScroll] = useRecoilState(scrollState);

  useEffect(() => {
    if (query.id) {
      const artistId = query.id
      if(spotifyApi.getAccessToken()){
        spotifyApi.getArtist(artistId)
        .then(data => {
          console.log('artista actual', data.body)
          setArtist(data.body)
        })
        .catch(error => console.log('error al cargar el artista ',error))
      }
    }
  }, [query.id, spotifyApi])

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [query.id]);

  useEffect(() => {
    setHeaderTop(scroll >= 417)
  }, [scroll]);

  console.log('renderizando artista')

  return (
    <div className='flex-grow text-white bg-zinc-900 w-full'>
      <section className={`flex ${color} h-header-artist min-h-[340px] px-8 pb-6 w-full relative`}>
        <div className='flex flex-col justify-end w-full'>
          <span className='flex gap-2 items-center relative'>
            <CheckBadgeIcon className='h-6 text-blue-700'/>
            <CheckIcon className='h-[10px] text-white absolute left-[6.9px] font-bold'/>
            <span>Artista verificado</span>
          </span>
          <span className='mb-2'>
            <h1 className='text-8xl font-bold mb-3'>{artist.name}</h1>
          </span>
          <span className='mt-1 text-base'>21,380,282 oyentes mensuales</span>
        </div>
      </section>

      {/* <div className=''>
        <div className='flex items-center gap-6 px-8 py-4'>
          <PlayCircleIcon className='button w-16 h-16 text-green-400 hover:scale-105'/>
          <HeartIcon className='button w-8 h-8 text-green-400 hover:scale-100'/>
          <EllipsisHorizontalIcon className='button w-8 h-8 text-gray-300 hover:text-white hover:scale-100'/>
        </div>
        <div className={`w-100 sticky top-16 px-8 mb-4 ${headerTop ? 'bg-black': ''}`}>
          <div className='grid grid-cols-song gap-4 w-100 h-10 border-gray-600 border-b text-xs px-4' >
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
      </div> */}
    </div>
  )
}

Artist.PageLayout = AppLayout

export default Artist

export async function getServerSideProps(context){
  const session = await getSession(context)
  return {
    props: {
      session
    }
  }
}
