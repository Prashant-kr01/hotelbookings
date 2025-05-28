import React from 'react'
import Navbar from './components/Navbar.jsx'
import {Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home.jsx';
import Footer from './components/Footer.jsx';
import AllRooms from './Pages/AllRooms.jsx';
import RoomDetails from './Pages/RoomDetails.jsx';
import MyBookings from './Pages/MyBookings.jsx';
import HotelReg from './components/HotelReg.jsx';
import Layout from './Pages/HotelOwner/Layout.jsx';
import DashBoard from './Pages/HotelOwner/DashBoard.jsx';
import AddRoom from './Pages/HotelOwner/AddRoom.jsx';
import ListRoom from './Pages/HotelOwner/ListRoom.jsx';

const App = () => {

  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
     {!isOwnerPath && <Navbar />}
     {false && <HotelReg />}
     <div className='min-h-[70vh]'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/rooms' element={<AllRooms />} />
        <Route path='/rooms/:id' element={<RoomDetails />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/owner' element={<Layout/>}>
             <Route index element={<DashBoard/>} />
             <Route path='add-room' element={<AddRoom/>} />
             <Route path='list-room' element={<ListRoom/>} />
        </Route>
      </Routes>
     </div>
     <Footer />
    </div>
  )
}

export default App