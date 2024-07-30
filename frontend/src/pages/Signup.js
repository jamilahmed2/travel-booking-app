import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext.js'
import BASE_URL from '../utlis/config.js'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router'
import './signup.css'
import { SIGNUP_SUCCESS } from '../contants/actionTypes.js'

const Signup = () => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    name: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined
  })

  const { dispatch } = useContext(AuthContext)

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async e => {
    e.preventDefault()

    try {
      const res = await fetch(`${BASE_URL}/auth/signUp`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      const result = await res.json()
      // console.log(result.data)
      if (!res.ok) {
        toast.error(result.message)
      }

      if (res.ok) {
        toast.success(result.message)
      }

      dispatch({ type: SIGNUP_SUCCESS })
      navigate('/login')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <section>
        <Toaster className="top-center" />
        <div className="wrapper" style={{ backgroundImage: 'url(https://static.vecteezy.com/system/resources/thumbnails/003/689/224/small/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg)' }}>


          <div class="inner">
            <form onSubmit={handleClick} className='form'>
              <h3>Registration Form</h3>
              <div class="form-group">
                <div class="form-wrapper">
                  <label for>Name</label>
                  <input onChange={handleChange}id="name"  type="text" class="form-control" />
                </div>
              </div>
              <div class="form-wrapper">
                <label for>Email</label>
                <input onChange={handleChange}id="email"  type="text" class="form-control" />
              </div>
              <div class="form-wrapper">
                <label for>Password</label>
                <input onChange={handleChange} id="password" type="password" class="form-control" />
              </div>
              <div class="form-wrapper">
                <label for>Confirm Password</label>
                <input onChange={handleChange} id="confirmPassword" type="password" class="form-control" />
              </div>
              <button type='submit' onClick={handleClick} className='button'>Sign Up</button>
            </form>
          </div>
        </div>
      </section >
    </>
  )
}

export default Signup