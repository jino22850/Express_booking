import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import Home from '../Pages/Home';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import Booking from '../Pages/Booking';
import Layout from '../Components/layouts/layout'
import AdminLayout from '../Components/layouts/adminLayout';
import Dashboard from '../Admin/Dashbord'
import AddUser from '../Admin/addUser'
import AdminBooking from  '../Admin/adminBooking'
import Feedback from '../Admin/feedback';
import Report from '../Admin/report';
import Login from '../Components/login/login';
import BusDetail from '../Pages/busDetail';
import SeatBooking from '../Pages/seatbooking';
import SignUp from '../Components/SignUp/SignUp';
import Paymentpassenger from '../Pages/Paymentpassenger';
import AddBus from '../Admin/addBus';
import Seat from '../Pages/seat';
import AdminSignup from '../Admin/adminSignup'
import ConDashboard from '../conductor/conDashboard';
import ConLogin from '../conductor/conLogin';
import Conductor from '../Admin/conductor';
import CheckSeatAvailability from '../Admin/checkSeatAvailability';
import PendingBooking from '../Admin/pendingBooking';
import ApprovedBookings from '../Admin/approvedBookings';
import CancelBooking from '../Admin/CancelBooking';
import ConBookings from '../conductor/ConBookings';
import Profile from '../conductor/profile';
import Conductorlayout from '../Components/layouts/Conductorlayout';
import UserProfile from '../Pages/userprofile';


const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path='/login'element={<Login/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/userprofile' element={<UserProfile/>}/>
        
        <Route path='/' element={<Layout/>}>
         <Route path='/' element={<Navigate to="/home"/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/booking' element={<Booking/>}/> 
            <Route path='/bus/:id' Component={BusDetail}/>
            <Route path='/SeatBooking' Component={SeatBooking}/>
            <Route path='/paymentpassenger' Component={Paymentpassenger}/>
            <Route path='/seat' Component={Seat}/>
           
           


        </Route> 

    
        <Route path='/admin/adminSignup' element= {<AdminSignup/>}/>

          <Route path='/admin' element={<AdminLayout/>}>
           <Route path='/admin' element={<Navigate to="/admin/dashboard"/>}/>
           <Route path='/admin/dashboard' element={<Dashboard/>}/>
           <Route path='/admin/addUser' element={<AddUser/>}/>
           <Route path='/admin/adminBooking' element={<AdminBooking/>}/>
           <Route path='/admin/addBus' element={<AddBus/>}/>
           <Route path='/admin/feedback' element={<Feedback/>}/>
           <Route path='/admin/report' element={<Report/>}/>
           <Route path='/admin/conductor' element={<Conductor/>}/>
           <Route path='/admin/checkSeatAvailability' element={<CheckSeatAvailability/>}/>   
           <Route path='/admin/pendingBooking' element={<PendingBooking/>}/>
           <Route path='/admin/approvedBookings' element={<ApprovedBookings/>}/>  
           <Route path='/admin/CancelBooking' element={<CancelBooking/>}/>
          
        </Route>

        <Route path='/conductor' element={<Conductorlayout/>}>
        <Route path='/conductor/conLogin' element={<ConLogin/>}/>
        <Route path='/conductor' element={<Navigate to="/conductor/conDashboard"/>}/>
        <Route path='/conductor/conDashboard'element={<ConDashboard/>}/>
        <Route path='/conductor/ConBookings' element={<ConBookings/>}/>
        <Route path='/conductor/profile' element={<Profile/>}/>
        </Route>

      </Routes>
    </div>
  )
}

export default Routers
