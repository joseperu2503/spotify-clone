import React from 'react'
import Artist from '../index/Artist'

const ArtistsSearch = ({artists}) => {
  return (
    <section>
      <div className='mb-4'>
        <h2 className='text-2xl font-bold'>Artists</h2>
      </div>
      <div className='grid grid-cols-4 grid-rows-[1fr] overflow-y-hidden  gap-6'>
        {artists?.map((artist, index) => {if(index<4)return(
          <Artist artist={artist} key={index}/>
        )})}
      </div>
    </section>
  )
}

export default ArtistsSearch
