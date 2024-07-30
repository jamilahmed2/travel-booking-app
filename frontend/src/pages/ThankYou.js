import React from 'react'
import { Link } from 'react-router-dom'
import './thank-you.css'

const ThankYou = () => {
  return (
    <>
      <section className="thank-you">
        <h3>Thank You</h3>
        <h5>Your Tour Is Booked Now</h5>
        <Link className='btn-normal' to='/'>Back to home</Link>
      </section>
    </>
  )
}

export default ThankYou