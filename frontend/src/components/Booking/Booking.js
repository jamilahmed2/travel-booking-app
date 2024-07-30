import './booking.css'
import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext.js'
import { useNavigate } from 'react-router'
import toast, { Toaster } from 'react-hot-toast'
import BASE_URL from '../../utlis/config.js'

const Booking = ({ tour, avgRating }) => {
    const { price, reviews, title } = tour
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    const [booking, setBookin] = useState({
        userId: user && user._id,
        userEmail: user && user.email,
        tourName: title,
        fullName: user && user.name,
        phone: user && user.phone,
        guestSize: user && user.guestSize,
        bookAt: user && user.bookAt,
    })


    const handleChange = e => {
        setBookin(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const serviceFee = 10
    const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee)

    const handleCLick = async e => {
        e.preventDefault();
        try {
            if (!user || user === undefined || user === null) {
                toast.error("please login")
            }

            const res = await fetch(`${BASE_URL}/booking`, {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(booking)
            })

            const result = await res.json()
            if (!res.ok) { toast.error(result.message) }

            if (res.ok) {
                toast.success(result.message)
                navigate('/thank-you')
            }
            // console.log(booking)

        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <>
            <Toaster position="top-center" />
            <section className="booking">
                <div className="price-rat">
                    <h4>${price}</h4><span>/per person</span>
                    <span class="star">
                        <i class="fas fa-star"></i>
                        {avgRating === 0 ? "null" : avgRating} ({reviews?.length})
                    </span>
                </div>
                <form className="info" onSubmit={handleCLick}>
                    <h5>Information</h5>
                    <input onChange={handleChange} type="email" placeholder="Email" id="email" required />
                    <input onChange={handleChange} type="text" placeholder="Tour Title" id="tourName" required />
                    <input onChange={handleChange} type="text" placeholder="fullName" id="fullName" required />
                    <input onChange={handleChange} type="number" placeholder="Phone" id="phone" required />
                    <input onChange={handleChange} type="date" name="" id="bookAt" required />
                    <input onChange={handleChange} type="number" placeholder="Number of guests" id="guestSize" required />
                </form>
                <div className="info-total">
                    <div className="price total"><h6>${price}x1person</h6> <span>${price}</span></div>
                    <div className="service-charges total"><span><h6>Service Fee</h6></span>${serviceFee}</div>
                    <div className="total">
                        <h6>Total</h6>
                        <span>${totalAmount}</span>
                    </div>
                </div>
                <button onClick={handleCLick} className="btn-normal t-c">Book Now</button>
            </section>
        </>
    )
}

export default Booking