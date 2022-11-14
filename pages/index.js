import { getSession } from 'next-auth/react'
import AppLayout from '../Layouts/AppLayout'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSpotify from '../hooks/useSpotify'
import Track from '../components/Track'
import TopTracks from '../components/index/TopTracks'
import TopArtists from '../components/index/TopArtists'
import NewReleases from '../components/index/NewReleases'

export default function Home() {

  const spotifyApi = useSpotify()
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    if(spotifyApi.getAccessToken()){
      getMyTopArtists()
      getMyTopTracks()
      getNewReleases()
    }
  }, [spotifyApi])

  const getMyTopArtists = () => {
    spotifyApi.getMyTopArtists()
    .then(data => {
      setTopArtists(data.body.items)
    })
    .catch(error => console.log('error al cargar el top de artistas ',error))
  }

  const getMyTopTracks = () => {
    spotifyApi.getMyTopTracks()
    .then(data => {
      setTopTracks(data.body.items)
    })
    .catch(error => console.log('error al cargar el top de canciones ',error))
  }

  const getNewReleases = () => {
    spotifyApi.getNewReleases()
    .then(data => {
      console.log('getNewReleases',data.body)
      setNewReleases(data.body.albums.items)
    })
    .catch(error => console.log('error al cargar el top de canciones ',error))
  }



  return (
    <div className='flex-grow text-white bg-neutral-900 w-full min-h-screen'>
      <div className='pt-20 px-8 flex flex-col gap-10'>
        <TopTracks topTracks={topTracks}/>
        <TopArtists topArtists={topArtists}/>
        <NewReleases newReleases={newReleases}/>
      </div>


    </div>
  )
}

Home.PageLayout = AppLayout

export async function getServerSideProps(context){
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}
