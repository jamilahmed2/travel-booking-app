import './userDashboard.css'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.js'

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const avatar = <i class="fa-regular fa-user"></i>

    return (
        <>
            <section className="user-dashbaord">
                <div className="user-image">
                    {user.photo || avatar}
                </div>
                <h2>{user.name}</h2>
                <h2>{user.email}</h2>

                <div className="my-booking">
                </div>
            </section>
        </>
    )
}

export default UserProfile