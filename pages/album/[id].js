import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import AppLayout from '../../Layouts/AppLayout'
import useSpotify from '../../hooks/useSpotify'
import { getSession } from 'next-auth/react'
import { shuffle } from 'lodash'
import { PlayCircleIcon,HeartIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { ClockIcon } from '@heroicons/react/24/outline'
import { useRecoilState } from 'recoil'
import { scrollState } from '../../atoms/scrollAtom'
import { yearAlbum } from '../../lib/time'
import HeaderPlaylist from '../../components/HeaderPlaylist'
import HeaderAlbum from '../../components/Album/Header'
import Songs from '../../components/Album/Songs'

const colors = [
  'bg-indigo-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-red-500',
  'bg-yellow-500',
  'bg-pink-500',
  'bg-purple-500',
]

const Album = () => {
  const spotifyApi = useSpotify()
  const { query } = useRouter()
  const [album, setAlbum] = useState({});
  const [artist, setArtist] = useState({});
  const [color, setColor] = useState(null);
  const [headerTop, setHeaderTop] = useState(false);
  const [scroll, setScroll] = useRecoilState(scrollState);
  const albumId = useRef(query.id)

  useEffect(() => {
    if(albumId) {
      if(spotifyApi.getAccessToken()){
        getAlbum()
      }
    }
  }, [albumId, spotifyApi])

  useEffect(() => {
    if(album.artists?.[0].id){
      getArtistInfo()
    }
  }, [album]);

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [albumId]);

  useEffect(() => {
    setHeaderTop(scroll >= 417)
  }, [scroll]);

  const getAlbum = async () => {
    spotifyApi.getAlbum(albumId.current)
    .then(data => {
      setAlbum(data.body)
    })
    .catch(error => console.log('error al cargar el album ',error))
  }

  const getArtistInfo = async () => {
    spotifyApi.getArtist(album?.artists?.[0].id)
    .then(data => {
      setArtist(data.body)
    })
    .catch(error => console.log('error al cargar el artista ',error))
  }

  console.log('renderizando album')

  return (
    <div className='flex-grow text-white bg-zinc-900 w-full'>
      <HeaderAlbum album={album} artist={artist} color={color}/>

      <div className=''>
        <HeaderPlaylist/>
        <div className={`w-100 sticky top-16 px-8 mb-4 ${headerTop ? 'bg-black': ''}`}>
          <div className='grid grid-cols-[16px_4fr_minmax(120px,_1fr)] gap-4 w-100 h-10 border-gray-600 border-b text-xs px-4' >
            <div className='flex items-center justify-end text-base'>#</div>
            <div className='flex items-center'>TITLE</div>
            <div className='flex items-center justify-end'><ClockIcon className='w-5 h-5 mr-8'/></div>
          </div>
        </div>
        <div className='px-8'>
          <Songs tracks={album?.tracks?.items}/>
        </div>
      </div>
    </div>
  )
}

Album.PageLayout = AppLayout

export default Album

export async function getServerSideProps(context){
  const session = await getSession(context)
  return {
    props: {
      session
    }
  }
}
