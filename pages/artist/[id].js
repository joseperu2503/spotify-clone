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
import { Icon } from '@iconify/react';
import TopTracks from '../../components/Artist/TopTracks'

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
  const [topTracks, setTopTracks] = useState([]);
  const [color, setColor] = useState(null);
  const [headerTop, setHeaderTop] = useState(false);
  const [scroll, setScroll] = useRecoilState(scrollState);
  const artistId = useRef(query.id)

  useEffect(() => {
    if (query.id) {
      const artistId = query.id
      if(spotifyApi.getAccessToken()){
        getArtistInfo()
        getTopTracks()
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

  const getArtistInfo = () => {
    spotifyApi.getArtist(artistId.current)
    .then(data => {
      setArtist(data.body)
    })
    .catch(error => console.log('error al cargar el artista ',error))
  }

  const getTopTracks = () => {
    spotifyApi.getArtistTopTracks(artistId.current,'GB')
    .then(data => {
      console.log(data.body.tracks)
      setTopTracks(data.body.tracks)
    })
    .catch(error => console.log('error al cargar el top del artista ',error))
  }


  return (
    <div className='flex-grow text-white bg-zinc-900 w-full min-h-screen'>
      <section className={`flex ${color} h-header-artist min-h-[340px] px-8 pb-6 w-full relative bg-no-repeat bg-cover bg-center`} style={{backgroundImage: `url(${artist?.images?.[0].url})`}}>
        <div className='flex flex-col justify-end w-full'>
          <span className='flex gap-2 items-center'>
            <div className='relative'>
              <Icon icon="bxs:badge" className='text-blue-500 h-7 w-7'/>
              <Icon icon="entypo:check" className='absolute h-3 w-3 top-2 left-2 mx-auto'/>
            </div>

            <span>Artista verificado</span>
          </span>
          <span className='mb-2'>
            <h1 className='text-8xl font-bold mb-3'>{artist.name}</h1>
          </span>
          <span className='mt-1 text-base'>21,380,282 oyentes mensuales</span>
          {/* <img src={artist?.images?.[0].url} alt="" /> */}
        </div>
      </section>

      <div className=''>
        <div className='flex items-center gap-6 px-8 py-6'>
          <PlayCircleIcon className='button w-16 h-16 text-green-400 hover:scale-105'/>
          <div className='border border-gray-500 hover:border-white px-[15px] py-[7px] rounded text-sm cursor-pointer'>SEGUIR</div>
          <EllipsisHorizontalIcon className='button w-8 h-8 text-gray-300 hover:text-white hover:scale-100'/>
        </div>
      </div>
      <div className='px-8'>
        <TopTracks topTracks={topTracks}/>
      </div>
      <div className='h-40'>

      </div>
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
