import React, { useRef, useEffect, useContext } from 'react'
import './header.css';
import { AuthContext } from '../../context/AuthContext.js'

import { Link, useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../contants/actionTypes.js';
import Cookies from 'js-cookie';

const Header = () => {
  const headerRef = useRef()
  const navigate = useNavigate()
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: LOGOUT });

    navigate('/')
  }

  const avatar = <i  class="fa-regular fa-user"></i>
  return (
    <>
      <div className="navbar" ref={headerRef} >

        <div className="brand">
          <a href="#"><i className="fa-solid fa-location-dot"></i></a>
        </div>

        <ul className="navbar nav">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/tours" className="navbar-link">Tours</Link></li>
          <li><Link to="/about" className="navbar-link">About</Link></li>
        </ul>

        {user ? (
          <div className='lged-user-details'>
            <li><Link to="/user-dashboard" className="h-avatar">{user.photo || avatar}</Link></li>
            <li><Link to="/user-dashboard" className="h-username">{user.name}</Link></li>
            <li><Link to="" type='submit' onClick={handleLogout} className="btn-outline">Log Out</Link></li>
          </div>
        ) : (
          <>
            <div className="auth">
              <li><a href="/login" className="login btn-outline">Login</a></li>
              <li><a href="/signup" className="signup btn-normal">SignUp</a></li>
            </div>
          </>
        )}

      </div>
    </>
  )
}

export default Header