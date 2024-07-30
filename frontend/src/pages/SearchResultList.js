import React, { useState } from 'react'
import TourCard from '../components/card/TourCard.js'
import { useLocation } from 'react-router'
import './searchResultList.css'

const SearchResultList = () => {

  const location = useLocation()
  const [data] = useState(location.state)
  console.log(data)

  return (
    <>
      <section className="searchResult-header">
        <h2>Search Results List</h2>
      </section>
      {data.length === 0 ? (
        <h4>no tour found</h4>
      ) : (
        data?.map(tour => (
          <section className="t">
            <div key={tour._id} className="tour-container">
              <TourCard  tour={tour}/>
            </div>
          </section>
          ))
      )
      }

    </>
  )
}

export default SearchResultList