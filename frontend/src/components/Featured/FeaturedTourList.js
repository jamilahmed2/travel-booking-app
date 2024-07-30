import React from 'react'
import './featured.css'
import TourCard from '../card/TourCard'
import toast, { Toaster } from 'react-hot-toast'

import BASE_URL from '../../utlis/config.js'
import useFetch from '../../hooks/useFetch.js'



const FeaturedTourList = () => {

    const { data: featuredTours, loading, error } = useFetch(`${BASE_URL}/tours/search/getFeaturedTours`)



    if (error || !featuredTours) {
        toast((t) => (
            <span className='toast-err-msg'>
                Failed To Fetch Data
                <button onClick={() => toast.dismiss(t.id)}>
                    <i className="fa-solid fa-circle-xmark"></i>
                </button>
            </span>
        ))
    }


    return (
        <>

            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <section id='featured' className="featured">
                <h2>Featured Tours</h2>
                <div className="tour-container">

                    {
                        loading && <h4>loading....</h4>
                    }
                    {!loading && featuredTours?.map(tour => (
                        <TourCard key={tour._id} tour={tour} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default FeaturedTourList