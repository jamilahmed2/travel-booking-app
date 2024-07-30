import React, { useRef } from 'react'
import './searchbar.css'
import toast, { Toaster } from 'react-hot-toast'
import BASE_URL  from '../../utlis/config.js'
import { useNavigate } from 'react-router'


const SearchBar = () => {
    const locationRef = useRef("");
    const distanceRef = useRef(0);
    const maxGroupSizeRef = useRef(0);
    const navigate = useNavigate('');

    const searchHandler = async () => {
        const location = locationRef.current.value;
        const distance = distanceRef.current.value;
        const maxGroupSize = maxGroupSizeRef.current.value;

        if (location === "" || distance === "" || maxGroupSize === "") {
            return toast.error("All fields are required!")
        }

        try {
            const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`)

            if (!res.ok) {
                toast.error("Something went wrong")
            }

            const result = await res.json();
            navigate(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`, { state: result.data }
            )
        } catch (error) {
            toast.error(error.message);
        }

    }
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <form className="search-form">
                <div className="search-form-group">
                    <span><i className="fa-solid fa-location-dot"></i></span>
                    <div>
                        <h4>Location</h4>
                        <input type="text"
                            placeholder='where are you?'
                            ref={locationRef}
                        />
                    </div>
                </div>
                <div className="search-form-group">
                    <span><i className="fa-solid fa-map"></i></span>
                    <div>
                        <h4>Distance</h4>
                        <input type="text"
                            placeholder='Distance k/m'
                            ref={distanceRef}
                        />
                    </div>
                </div>
                <div className="search-form-group">
                    <span><i className="fa-solid fa-people-group"></i></span>
                    <div>
                        <h4>Max People</h4>
                        <input type="number"
                            placeholder='0'
                            ref={maxGroupSizeRef}
                        />
                    </div>
                </div>

                <button onClick={searchHandler} className='btn-search-bar' type="button"><i className="fa-solid fa-magnifying-glass"></i></button>

            </form>
        </>
    )
}

export default SearchBar