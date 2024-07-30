import React from 'react'
import SearchBar from '../components/search/SearchBar.js'
import FeaturedTourList from '../components/Featured/FeaturedTourList.js'
import Head from './Head.js'

const Home = () => {
  return (
    <>
    <section className="home-head">
      <Head/>
    </section>
      <section className="search-bar">
        <SearchBar />
      </section>
      <section className="featured-tours">
        <FeaturedTourList />
      </section>
    </>
  )
}

export default Home