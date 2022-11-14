import React from 'react'
import Songs from '../Album/Songs'

const SongsSearch = ({tracks}) => {
  return (
    <section>
      <div className='mb-4'>
        <h2 className='text-2xl font-bold'>Songs</h2>
      </div>
      <Songs tracks={tracks} limit={4} widthImage/>
    </section>
  )
}

export default SongsSearch
