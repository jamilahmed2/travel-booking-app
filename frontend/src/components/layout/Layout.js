import React from 'react'
import Header from '../header/Header.js'
import Footer from '../footer/Footer.js'
import Router from '../../router/Router.js'

const Layout = () => {
    return (
        <>
            <Header />
            <Router />
            <Footer />
        </>
    )
}

export default Layout