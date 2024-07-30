import React, { useRef, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import './tourdetails.css'
import Booking from '../components/Booking/Booking.js'
import { calculateAvgRating } from '../utlis/avgRating.js'
import toast, { Toaster } from 'react-hot-toast'
import BASE_URL from '../utlis/config.js'
import useFetch from '../hooks/useFetch.js'
import { AuthContext } from '../context/AuthContext.js'



const TourDetails = () => {
  const { id } = useParams()
  const reviewMsgRef = useRef("")
  const [tourRating, setTourRating] = useState(null)
  const { user } = useContext(AuthContext)

  // fetching data
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`)
  const { photo, title, desc, price, city, address, distance, maxGroupSize, reviews } = tour

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  // form data
  const options = { day: "numeric", month: "long", year: "numeric" };
  const defaultImage = 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg';



  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;


    try {
      if (!user || user === undefined || user === null) {
        toast.error("please login")
      }

      const reviewObj = {
        name: user?.name,
        reviewText,
        rating: tourRating
      }

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(reviewObj)
      })
      const result = await res.json()
      if (!res.ok) { toast.error("Something went wrong") }

      if (res.ok) {
        toast.success("Review Submitted")
      }
    } catch (error) {
      toast.error("Something went wrong");
    }

  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tour])

  const handleStarClick = (rating) => {
    // If the same star is clicked again, deselect it
    if (tourRating === rating) {
      setTourRating();
    } else {
      setTourRating(rating);
    }
  };

  if (error) {
    toast.error("Something went wrong")
  }
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      {
        loading && <h4>Loading...</h4>
      }
      {!loading && <section className="t-details-booking">
        <div className="tour-details">

          <img src={photo || defaultImage} alt="" />

          <div className='info'>
            <h4>{title}</h4>
            <div className="loc-rat">
              <div className='loc'>
                <i class="ri-map-pin-line"></i>
                {city}
                {address}
              </div>
              <div className='rat'>
                <span class="star">
                  <i class="fas fa-star"></i>
                  {avgRating === 0 ? "null" : avgRating}
                  {/* <span class="rev-length">11 </span> */}
                  {totalRating === 0 ? ('Not Rated') : (<span class="rev-length">{reviews?.length} </span>)}
                </span>
              </div>
            </div>
            <div className="price">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h4>${price}</h4><span>/per person</span>
                {/* <h4>$78</h4><span>/per person</span> */}
              </div>
            </div>

            <div className="distance-peoples">

              <h4><i class="ri-map-pin-time-line"></i>{distance}k/m</h4>

              <h4><i class="fa-solid fa-people-group"></i>{maxGroupSize}</h4>

            </div>

            <div className="desc">
              <h5>Description</h5>
              <p>{desc}</p>
            </div>
          </div>
        </div>

        <div>
          <Booking tour={tour} avgRating={avgRating} />
        </div>
      </section >}

      <div className="reviews-form">
        <h4>Rreviews ({reviews?.length} review)</h4>
        <form onSubmit={submitHandler}>
          <div className="rev-rating">
            <i onClick={() => handleStarClick(1)} className={`fas fa-star ${tourRating === "" || tourRating >= 1 ? 'active-star' : ''}`}></i>
            <i onClick={() => handleStarClick(2)} className={`fas fa-star ${tourRating === "" || tourRating >= 2 ? 'active-star' : ''}`}></i>
            <i onClick={() => handleStarClick(3)} className={`fas fa-star ${tourRating === "" || tourRating >= 3 ? 'active-star' : ''}`}></i>
            <i onClick={() => handleStarClick(4)} className={`fas fa-star ${tourRating === "" || tourRating >= 4 ? 'active-star' : ''}`}></i>
            <i onClick={() => handleStarClick(5)} className={`fas fa-star ${tourRating === "" || tourRating === 5 ? 'active-star' : ''}`}></i>
          </div>
          <div className="inputs">
            <input
              ref={reviewMsgRef}
              type="text"
              placeholder='share you thougts'
              required
            />
            <button className="btn-normal" type="submit">Submit</button>
          </div>
        </form>

      </div >
      <div className="reviews">
        <div className="user-reviews">
          {reviews?.map(review => (
            <div className="rev-item">
              <i class="fa-solid fa-user-tie"></i>
              <div className="user">
                <h4>{review.name}</h4>
                {new Date(review.createdAt).toLocaleDateString(
                  "en-us",
                  options
                )}
              </div>
              {review.rating}
              <i class="fas fa-star"></i>
              <p>{review.reviewText}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default TourDetails