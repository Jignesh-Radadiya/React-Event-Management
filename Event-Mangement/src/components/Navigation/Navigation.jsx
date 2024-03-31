import {Link} from "react-router-dom"
// import "./Navigation.css"
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/alex-brush";
import "@fontsource/bad-script";
import "@fontsource/inter";
const Navigation = ()=>{
  return (
    <>
    <div>
    <nav className="w-full h-20 bg-gradient-to-b from-white to-green-200 fixed">
    <ul className="h-full flex justify-end items-center gap-[36px] list-none p-0 mr-7 border-b-0.4 border-black">
    <li>
    <img className="rounded-md p-1 h-24 absolute left-5 top-2/4 transform -translate-y-2/4" src="./image/Logo1.png"/>
    </li>
    <li>
      <Link to="/" className="text-lg font-semibold">Home</Link>
    </li>
    <li>
      <Link to="/Services" className="text-lg font-semibold">Services</Link>
    </li>
    
    <li>
      <Link to="/find-events" className="text-lg font-semibold">Find Events</Link>
    </li>
    <li>
      <Link to="/EventList" className="text-lg font-semibold">Event List</Link>
    </li>
    <li>
      <Link to="/About" className="text-lg font-semibold">About</Link>
    </li>
    <li>
      <Link to="/Contactus" className="text-lg font-semibold">Contact us</Link>
    </li>
    <li>
      <Link to="/Login" className="button1 bg-green-500 border-none rounded-[10px] text-white py-4 px-8 text-center text-base inline-block cursor-pointer">Login</Link>
    </li>
    <li>
      <Link to="/Logout" className="button1 bg-red-500 border-none rounded-[10px] text-white py-4 px-8 text-center text-base inline-block cursor-pointer">Logout</Link>
    </li>
    <li>
      <Link to="/Admin" className="text-lg font-semibold">Admin</Link>
    </li>
  </ul>
</nav>

<div className="fixed bottom-0 w-full bg-black text-white text-left h-26">  
<ul className="h-full flex justify-end items-center gap-36 list-none border-black">
    <li>
    <p className="text-gray-200 mr-32 font-cormorant-garamond text-2xl">JP’s</p>
    <p className="text-orange-600 font-alex-brush text-lg">Events</p>
    </li>
    <li>
    <p className="text-yellow-400 mr-32 font-bad-script text-lg">Memorable  events don’t just happen. They happen to be our business.</p>
    <p className="text-gray-300 ml-28 font-inter text-base">Copyright©2024 JP Events. All rights reserved.</p>
    </li>
    <li>
    <p className="text-gray-200 mr-24">
        CONTACT US<br />
        Tramba, Rajkot, 360020<br />
        Call Us: +917574992569<br />
        info@JPevents.com
      </p>
    </li>
  </ul>
</div>
</div>
    </>
    
    
  
    
  )
}
export default Navigation;