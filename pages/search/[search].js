import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import useSpotify from '../../hooks/useSpotify'
import AppLayout from '../../Layouts/AppLayout'

const Search = () => {

  const spotifyApi = useSpotify()
  const { query } = useRouter()
  const searchValue = useRef(query.search)

  return (
    <div>{query.search}</div>
  )
}

Search.PageLayout = AppLayout


export default Search
