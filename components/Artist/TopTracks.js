import React from 'react'
import TopTrack from './TopTrack'

const TopTracks = ({topTracks}) => {
  console.log('topTracks',topTracks)
  return (
    <div>
      {topTracks.map( (track, index) => (
        <TopTrack track={track} index={index}/>
      ))}
    </div>
  )
}

export default TopTracks
