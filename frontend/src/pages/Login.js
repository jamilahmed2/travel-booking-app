import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext.js'
import BASE_URL from '../utlis/config.js'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router'
import './login.css'
import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS } from '../contants/actionTypes.js'

const Login = () => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
  })

  const { dispatch } = useContext(AuthContext)

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }
  const handleClick = async e => {
    e.preventDefault()

    dispatch({ type: LOGIN_START })
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      })

      const result = await res.json()
      if (!res.ok) {
        toast.error(result.message)
      }

      if (res.ok) {
        toast.success(result.message)
      }
      // console.log(result.data)

      dispatch({ type: LOGIN_SUCCESS, payload: result.data })

      navigate('/')
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message })
    }
  }

  return (
    <>
    <Toaster className="top-center" />
      <section>
        <div className="wrapper" style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg)' }}>


          <div class="inner">
            <form  className='form' onSubmit={handleClick}>
              <h3>Login Form</h3>
              <div class="form-wrapper">
                <label for>Email</label>
                <input onChange={handleChange} type="text" id='email' placeholder='Email' class="form-control" />
              </div>
              <div class="form-wrapper">
                <label for>Password</label>
                <input onChange={handleChange} type="password" id='password' placeholder='password' class="form-control" />
              </div>
              <button type='submit' onClick={handleClick} className='button'>Login</button>
            </form>
          </div>
        </div>
      </section >
    </>
  )
}

export default Login