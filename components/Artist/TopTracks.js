import React, { useState } from 'react'
import TopTrack from './TopTrack'

const TopTracks = ({topTracks}) => {
  console.log('topTracks',topTracks)

  const [seeMore, setSeeMore] = useState(false);
  return (
    <div>
      <h2 className='text-2xl font-bold mb-5'>Popular</h2>
      <div>
        {topTracks.map( (track, index) => {
          if(!seeMore && index < 5){
            return <TopTrack track={track} index={index}/>
          }if(seeMore){
            return <TopTrack track={track} index={index}/>
          }
        })}
      </div>
      <div className='p-4'>
        <div
          className='text-xs font-bold text-gray-300 hover:text-white cursor-pointer'
          onClick={() => setSeeMore(!seeMore)}
        >
          {!seeMore ? 'SEE MORE' : 'SHOW LESS'}
        </div>
      </div>
    </div>

  )
}

export default TopTracks
