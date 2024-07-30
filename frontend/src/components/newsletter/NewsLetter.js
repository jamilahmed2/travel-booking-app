import React from 'react'
import './newsletter.css'
const NewsLetter = () => {
    return (
        <>
            <section className="newsletter">
                <div className="newsletter-text">
                    <h4>Sign Up </h4>
                    <p>Get E-mail updates about our latest Tours and <span>special offers.</span></p>
                </div>
                <div className="newsletter-form">
                    <input type="text" placeholder="Your Email Address" />
                    <button className="btn-nltr">Sign Up</button>
                </div>
            </section>

        </>
    )
}

export default NewsLetter