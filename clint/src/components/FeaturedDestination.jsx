import React from 'react'
import HotelCard from './HotelCard'
import Tittle from './Title'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../Context/AppContext'

const FeaturedDestination = () => {

    const {rooms, navigate} = useAppContext();


  return rooms.length > 0 && (
    <div className='flex flex-col items-center px-4 md:px-12 lg:px-8 bg-slate-50 py-20'>

        <Tittle title='Featured Destination' subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxery and unforgettable experiences.'/>

        <div className='flex flex-wrap items-center justify-center gap-3 mt-20'>
            {rooms.slice(0, 4).map((room, index) => (
                <HotelCard key={room._id} room={room} index={index} />
            ))}
        </div>
        <button 
         onClick={() => {navigate('/rooms'); scrollTo(0,0)}}
        className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer '>
            View All Destinations
        </button>
    </div>
  )
}

export default FeaturedDestination