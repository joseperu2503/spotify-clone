import React from 'react'
import Album from './Album'

const Discography = ({albums}) => {
  return (
    <section className='flex flex-col'>
      <div className='flex items-center justify-between mb-5'>
        <div>
          <h2 className='text-2xl font-bold'>Discography</h2>
        </div>
        <span className='ml-2 text-xs font-bold text-gray-300 hover:underline cursor-pointer'>SEE ALL</span>
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
        {albums.map(album => (
          <Album album={album} key={album.id}/>
        ))}
      </div>
    </section>
  )
}

export default Discography
