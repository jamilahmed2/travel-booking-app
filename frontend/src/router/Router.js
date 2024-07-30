import React, { useContext } from 'react'
import Home from '../pages/Home.js'
import Login from '../pages/Login.js'
import Signup from '../pages/Signup.js'
import Tours from '../pages/Tours.js'
import ThankYou from '../pages/ThankYou.js'
import TourDetails from '../pages/TourDetails.js'
import SearchResultList from '../pages/SearchResultList.js'
import About from '../pages/About.js'
import NotFound from '../pages/NotFound.js'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.js'
import UserProfile from '../pages/UserProfile.js'

const Router = () => {
    const { user, } = useContext(AuthContext);
    return (
        <>
            <Routes>
                <Route path='/' element={<Navigate to="/home" />} />
                <Route path='/home' element={<Home />} />
                {user ? (
                    <Route path='/login' element={<Navigate to="/user-dashboard" />} />
                )
                    : (
                        <Route path='/login' element={<Login />} />
                    )}
                {user ? (
                    <Route path='/user-dashboard' element={<UserProfile />} />
                )
                    : (
                        <Route path='/user-dashboard' element={<Navigate to="/login" />} />
                    )}
                {user ? (
                    <Route path='/signup' element={<Navigate to="/user-dashboard" />} />
                )
                    : (
                        <Route path='/signup' element={<Signup />} />

                    )}

                <Route path='/tours' element={<Tours />} />
                <Route path='/about' element={<About />} />
                <Route path='/thank-you' element={<ThankYou />} />
                <Route path='/tours/:id' element={<TourDetails />} />
                <Route path='/tours/search' element={<SearchResultList />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    )
}

export default Router