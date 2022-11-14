import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import Songs from '../../components/Album/Songs'
import Artist from '../../components/index/Artist'
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
        <section>
          <div className='mb-4'>
            <h2 className='text-2xl font-bold'>Songs</h2>
          </div>
          <Songs tracks={result?.tracks?.items} limit={4} widthImage/>
        </section>
        <section>
          <div className='mb-4'>
            <h2 className='text-2xl font-bold'>Artists</h2>
          </div>
          <div className='grid grid-cols-4 grid-rows-[1fr] overflow-y-hidden  gap-6'>
            {result?.artists?.items.map((artist, index) => {if(index<4)return(
              <Artist artist={artist} key={index}/>
            )})}
          </div>
        </section>

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
