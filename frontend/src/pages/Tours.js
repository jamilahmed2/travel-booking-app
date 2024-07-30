import React, { useEffect, useState } from 'react'
import './tours.css'
import TourCard from '../components/card/TourCard.js'
import TourDetails from './TourDetails.js'
import useFetch from '../hooks/useFetch.js'
import BASE_URL from '../utlis/config.js'

const Tours = () => {

  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(0)

  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`)
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`)

  useEffect(() => {

    const pages = Math.ceil(tourCount / 10)
    setPageCount(pages)
    return () => {
      window.scrollTo(0, 0)
    }
  }, [page, tourCount, tours])


  return (
    <>
      <section className="tours-header">

        <h2>All Tours</h2>

        <p>Choose your desired location!</p>

      </section>

      {loading && <h4>Loading.....</h4>}

      {
        !loading && <div>
          <section className="tours featured">
            <div class="tour-container">
              {tours?.map(tour => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          </section>
          {/* <!-- pagination --> */}
          <section id="pagination">
            {[...Array(pageCount).keys()].map((number) => (
              <span
                id='non-active'
                key={number}
                onClick={() => setPage(number)}

              >
                <a className={page === number ? "active-page" : null}>
                  {number + 1}
                </a>
              </span>
            ))}
          </section >
        </div>
      }


    </>
  )
}

export default Tours