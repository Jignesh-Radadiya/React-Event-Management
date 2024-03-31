

const Navbar = () => {
    return (
      <nav className="bg-gray-900 text-white">
        <div className="flex justify-between items-center py-4 ml-[50px] mr-[50px]  text-[20px]">
          <h1 className="text-[28px] font-bold ">Admin</h1>
          <ul className="flex gap-[60px]">
            <li>
              <a href="/Admin" className="hover:text-yellow-400">Home</a>
            </li>
            <li>
              <a href="/Addevents" className="hover:text-yellow-400">Add Events</a>
            </li>
            <li>
              <a href="/Userdata" className="hover:text-yellow-400">User Details</a>
            </li>
            <li>
              <a href="/Bookingdata" className="hover:text-yellow-400">Event Booking</a>
            </li>
            <li>
              <a href="/Contactdata" className="hover:text-yellow-400">Feedbacks</a>
            </li>
            <li>
              <a href="/" className="hover:text-yellow-400">Show Web</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  


















// const Sidebar = ()=>{
//   return (
//     <>
// <div className="flex h-screen">

//     <div className="w-64 bg-gray-900 text-white">
//         <h1 className="p-[20px] m-0 bg-gray-800 text-[50px]">Admin</h1>
//         <ul className="list-none p-0 m-0">
//             <li className="p-2 md:p-3 border-b border-gray-700">
//                 <a href="/Admin" className="text-white no-underline hover:text-yellow-400" >Home</a>
//             </li>
//             <li className="p-2 md:p-3 border-b border-gray-700">
//                 <a href="#" className="text-white no-underline hover:text-yellow-400">Add Events</a>
//             </li>
//             <li className="p-2 md:p-3 border-b border-gray-700">
//                 <a href="#" className="text-white no-underline hover:text-yellow-400">User Details</a>
//             </li>
//             <li className="p-2 md:p-3 border-b border-gray-700">
//                 <a href="#" className="text-white no-underline hover:text-yellow-400">Event Booking</a>
//             </li>
//             <li className="p-2 md:p-3 border-gray-700">
//                 <a href="#" className="text-white no-underline hover:text-yellow-400">Feedbacks</a>
//             </li>

//         </ul>
//     </div>
//     <div className="flex-1 p-20 bg-transparent">
//         <h1>Main Content</h1>
//         <p>This is the main content area. You can add your content here.</p>
//     </div>
// </div>




//    </>
    
  
    
//   )
// }
// export default Sidebar;