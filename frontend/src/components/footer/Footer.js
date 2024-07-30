import React, { useContext } from 'react'
import NewsLetter from '../newsletter/NewsLetter'
import './footer.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext.js'
import { LOGOUT } from '../../contants/actionTypes.js'

const Footer = () => {
  const navigate = useNavigate()
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: LOGOUT });

    navigate('/')
  }

  return (
    <>
      <NewsLetter />
      <section className="footer">
        <div className="col">
          <i className="fa-solid fa-location-dot logo"></i>
          {/* <img className="logo" src="img/logo.png" alt="logo" /> */}
          <h4>Contact</h4>
          <p><strong>Address:</strong>ABCD</p>
          <p><strong>Phone:</strong>+92-123-456-789</p>
          <p><strong>Email:</strong>ABCD@gmail.com</p>
          <div className="follow">
            <h4>Follow Us</h4>
            <div className="footer-icons">
              <a href="/"><i className="fa-brands fa-instagram"></i></a>
              <a href="/"><i className="fa-brands fa-facebook"></i></a>
              <a href="/"><i className="fa-brands fa-twitter"></i></a>
            </div>
          </div>
        </div>
        <div className="col">
          <h4>About</h4>
          <a href="/">Information</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms &amp; Condition</a>
          <a href="/">ContactUs</a>
        </div>
        <div className="col">
          <h4>More</h4>
          {user ? (
            <Link onClick={handleLogout} to="/">Log Out</Link>
          ) : (
            <Link to="/login">Log in</Link>
          )}
          {user ? (
            <Link  to="/user-dashboard">My Profile</Link>
          ) : (
            <Link to="/signup">Sign Up</Link>

          )}
          <Link to="/tours">Tours</Link>
          <Link to="/">Help</Link>
        </div>
      </section >
    </>
  )
}

export default Footer