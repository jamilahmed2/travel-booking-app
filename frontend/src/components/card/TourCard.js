import React from 'react'
import './tourCard.css'
import { Link } from 'react-router-dom'
import { calculateAvgRating } from '../../utlis/avgRating.js'

const TourCard = ({ tour }) => {

    const { _id, title, photo, city, price, featured, reviews } = tour;

    const { totalRating, avgRating } = calculateAvgRating(reviews)

    //  default image URL
    const defaultImage = 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg';
    return (
        <>
            <div class="tour">
                <Link to={`/tours/${_id}`}><img src={photo || defaultImage} alt={title || 'No Image'} /></Link>
                <div class="des">
                    <div className="loc-fea">
                        {featured && <span className='featured'>Featured</span>}

                        <span className='location'>
                            <i class="ri-map-pin-line"></i>
                            {city}
                        </span>
                    </div>

                    <div className="rat-rev">
                        <Link className='title' to={`/tours/${_id}`}>{title}</Link>
                        <div>
                            <span class="star">
                                <i class="fas fa-star"></i>
                                {avgRating === 0 ? "null" : avgRating}
                                {totalRating === 0 ? ('Not Rated') : (<span class="rev-length">{reviews.length} </span>)}
                            </span>
                        </div>

                    </div>
                    <div className="price-cart">
                        <div>
                            <h4>${price}</h4> <span>/per person</span>
                        </div>
                        <Link to={`/tours/${_id}`}><i class="fa-solid fa-shopping-cart cart"></i></Link>
                    </div>

                </div>

            </div >
        </>
    )
}

export default TourCard