import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify'
import AppLayout from '../../Layouts/AppLayout'
import Categories from '../../components/Search/Categories'

const SearchPage = () => {

  const spotifyApi = useSpotify()
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    if(spotifyApi.getAccessToken()){
      getCategories()

    }
  }, [spotifyApi])

  const getCategories = () => {
    spotifyApi.getCategories({limit: 50})
    .then(data => {
      console.log(data.body)
      setCategories(data.body.categories.items)
    })
    .catch(error => console.log('error al cargar las categorias ',error))
  }

  return (
    <div className='flex-grow text-white bg-neutral-900 w-full min-h-screen pt-16'>
      <Categories categories={categories}/>
    </div>
  )
}

SearchPage.PageLayout = AppLayout

export default SearchPage

export async function getServerSideProps(context){
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}
