import Home from "../pages/Home/Home"
import EventList from "../pages/EventList/EventList"
import FilterEvents from "../pages/FilterEvents/FilterEvents"
import EventDetail from "../pages/EventDetails/EventDetails"
import About from "../pages/About/About"
import Contactus from "../pages/Contactus/Contactus"
import Login from "../pages/Login/Login"
import Signup from "../pages/Signup/Signup"
import Forgottpassword from "../pages/Forgottpassword/Forgottpassword"
import Booking from "../pages/Booking/Booking"
import Services from "../pages/Services/Services"
import Admin from "../pages/Admin/Home"
import Addevents from "../pages/Admin/Addevents"
import Logout from "../pages/Logout/Logout"
import Addeventdata from "../pages/Admin/Addeventdata"
import Userdata from "../pages/Admin/Userdata"
import Bookingdata from "../pages/Admin/Bookingdata"
import Contactdata from "../pages/Admin/Contactdata"
import EventDetails from "../pages/EventDetails/EventDetails"

export const routes = [
  {path:'/',element:<Home/>},
  {path:'/EventList',element:<EventList/>},
  {path:'/find-events',element:<FilterEvents/>},
  {path:'/events/:id',element:<EventDetail/>},
  {path:'/About',element:<About/>},
  {path:'/Contactus',element:<Contactus/>},
  {path:'/Login',element:<Login/>},
  {path:'/Signup',element:<Signup/>},
  {path:'/Forgottpassword',element:<Forgottpassword/>},
  {path:'/Booking',element:<Booking/>},
  {path:'/Services',element:<Services/>},
  {path:'/Admin',element:<Admin/>},
  {path:'/Addevents',element:<Addevents/>},
  {path:'/Logout' ,element:<Logout/>},
  {path:'/Addeventdata', element : <Addeventdata />},
  {path:'/UserData', element : <Userdata />},
  {path:'/Bookingdata', element : <Bookingdata />},
  {path:'/Contactdata', element: <Contactdata />},
  { path: '/events/:id', element: <EventDetails /> }


]