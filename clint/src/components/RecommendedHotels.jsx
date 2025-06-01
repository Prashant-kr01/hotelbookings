import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard'
import Tittle from './Title'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../Context/AppContext'


const RecommendedHotels = () => {

    const {rooms = [], searchedCities = [] } = useAppContext();
    const [recommended, setRecommended] = useState([]);

    const filterHotels = ()=>{
        if(searchedCities.length === 0){
           setRecommended(rooms);
        }
        const filteredHotels = rooms.slice().filter(room => searchedCities.includes(room.hotel.city));
        setRecommended(filteredHotels);
    }

    const allCities = [...new Set(rooms.map(room => room.hotel.city))];

    useEffect(()=>{
        filterHotels()
    },[rooms, searchedCities])

        // Only show when searchedCities is not empty and there are recommendations
    if (!Array.isArray(recommended) || recommended.length === 0 || searchedCities.length === 0) return null;

  return Array.isArray(recommended) && recommended.length > 0 && (
    <div className='flex flex-col items-center px-4 md:px-12 lg:px-8 bg-slate-50 py-20'>

        <Tittle title='Recommended Hotels' subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxery and unforgettable experiences.'/>

        <div className='flex flex-wrap items-center justify-center gap-3 mt-20'>
            {recommended.slice(0, 4).map((room, index) => (
                <HotelCard key={room._id} room={room} index={index} />
            ))}
        </div>
    </div>
  )
}

export default RecommendedHotels