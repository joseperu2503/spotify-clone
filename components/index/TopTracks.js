import Link from 'next/link'
import React from 'react'
import Track from '../Track'

const TopTracks = ({topTracks}) => {
  return (
    <section className='flex flex-col'>
      <div className='flex mb-4 items-center'>
        <div className='grow'>
          <h2 className='text-2xl font-bold'>Your Top Tracks</h2>
        </div>
        <Link href={'/hola'} className="ml-2 text-xs font-bold text-[#b3b3b3] hover:underline">SEE ALL</Link>
      </div>
      <div className='grid grid-cols-4 grid-rows-[1fr] overflow-y-hidden  gap-6'>
        {topTracks.map((track, index) => {if(index<4)return(
          <Track track={track} key={index}/>
        )})}
      </div>
    </section>
  )
}

export default TopTracks
