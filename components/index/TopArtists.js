import Link from 'next/link'
import React from 'react'
import Artist from './Artist'

const TopArtists = ({topArtists}) => {
  return (
    <section className='flex flex-col'>
      <div className='flex mb-4 items-center'>
        <div className='grow'>
          <h2 className='text-2xl font-bold'>Your Top Artists</h2>
        </div>
        <Link href={'/hola'} className="ml-2 text-xs font-bold text-[#b3b3b3] hover:underline">SEE ALL</Link>
      </div>
      <div className='grid grid-cols-4 grid-rows-[1fr] overflow-y-hidden  gap-6'>
        {topArtists.map((artist, index) => {if(index<4)return(
          <Artist artist={artist} key={index}/>
        )})}
      </div>
    </section>
  )
}

export default TopArtists
