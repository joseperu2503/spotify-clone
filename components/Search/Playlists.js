import React from 'react'
import Album from '../Artist/Album'

const PlaylistsSearch = ({playlists}) => {
  return (
    <section>
      <div className='mb-4'>
        <h2 className='text-2xl font-bold'>Playlists</h2>
      </div>
      <div
        className='grid
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-6 '>
        {playlists?.map((playlist,index) => {
          if(index < 4){
            return ( <Album album={playlist} key={index} type='playlist'/> )
          }
      })}
      </div>
    </section>
  )
}

export default PlaylistsSearch
