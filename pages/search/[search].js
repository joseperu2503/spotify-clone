import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import AlbumsSearch from '../../components/Search/Albums'
import ArtistsSearch from '../../components/Search/Artists'
import PlaylistsSearch from '../../components/Search/Playlists'
import SongsSearch from '../../components/Search/Songs'
import useSpotify from '../../hooks/useSpotify'
import AppLayout from '../../Layouts/AppLayout'

const Search = () => {

  const spotifyApi = useSpotify()
  const { query } = useRouter()
  const [result, setResult] = useState();

  useEffect(() => {
    if (query.search) {
      if(spotifyApi.getAccessToken()){
        search()
      }
    }
  }, [query, spotifyApi])

  const search = () => {
    spotifyApi.search(query.search,['artist','album','playlist','track'])
    .then(data => {
      console.log(data.body)
      setResult(data.body)
    })
    .catch(error => console.log('error al cargar busqueda ',error))
  }

  return (
    <div className='flex-grow text-white bg-neutral-900 w-full min-h-screen pt-16'>
      <div className='w-full h-12'></div>
      <div className='mt-4 px-8 flex flex-col gap-8'>
        <SongsSearch tracks={result?.tracks?.items}/>
        <ArtistsSearch artists={result?.artists?.items}/>
        <AlbumsSearch albums={result?.albums?.items}/>
        <PlaylistsSearch playlists={result?.playlists?.items}/>
      </div>
    </div>
  )
}

Search.PageLayout = AppLayout

export default Search

export async function getServerSideProps(context){
  const session = await getSession(context)
  return {
    props: {
      session
    }
  }
}
