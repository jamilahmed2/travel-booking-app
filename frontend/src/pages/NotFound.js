import React from 'react'
import './notfound.css'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    <section className="not-found">
        <h3>404</h3>
        <h5>Nothing Found!</h5>
        <Link className='btn-normal' to='/'>Back to home</Link>
      </section>
    </>
  )
}

export default NotFound