import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from "../../components/Navigation/Navigation.jsx";
import { Link, useNavigate } from 'react-router-dom';

const Services = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:9000/service/events');
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleBooking = () => {
    const auth = localStorage.getItem('token');
    if (auth) {
      navigate('/Booking');
    } else {
      navigate('/Login');
    }
  };

  return (
    <>
      <Navigation />
      <div className="py-8 mb-[100px] container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center mt-[100px] mb-6">
          <label className="text-lg font-semibold text-gray-700 mb-4 md:mb-0 mr-0 md:mr-4">
            If you want to book any event directly, click the button below:
          </label>
          {/* <Link to="/Booking"> */}
          <button onClick={handleBooking} className="w-full md:w-auto py-2 px-4 font-semibold text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800">
            Book Events
          </button>
          {/* </Link> */}
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event._id} className="bg-gray-200 rounded-lg overflow-hidden">
                <Link to={`/events/${event._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="bg-cover bg-center h-64" style={{ backgroundImage: `url(http://localhost:9000${event.imageUrl})` }}></div>
                  <div className="p-4">
                    <p className="text-xl font-semibold">{event.eventTitle}</p>
                    {/* Add more event details here if needed */}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Services;







{/* <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 ease-in-out">
    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 fade-in-out"></div> */}

{/* <button className="w-[250px] p-[10px] ml-[1250px] mt-[100px] font-cormorant-garamond font-semibold text-white bg-black rounded-md" type="button" onClick={() => { window.location.href = '/Booking'; }}>
   Book Events</button> */}

//     <div className="grid grid-cols-3 gap-4 mt-3 mb-[150px]"> 
//     <div className="w-full bg-transparent bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('./image/Rectangle 14.png')" }}>
//               <p className="mt-[300px] text-white text-[35px] ml-[130px]"><a href="#">Explore More</a></p>
//     </div>
//     <div className="w-full bg-transparent bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('./image/Rectangle 15.png')" }}>
//               <p className="mt-[300px] text-white text-[35px] ml-[130px]"><a href="#">Explore More</a></p>
//     </div>
//     <div className="w-full bg-transparent bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('./image/Rectangle 22.png')" }}>
//               <p className="mt-[300px] text-white text-[35px] ml-[130px]"><a href="#">Explore More</a></p>
//     </div>
//     <div className="w-full bg-transparent bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('./image/Rectangle 14.png')" }}>
//               <p className="mt-[300px] text-white text-[35px] ml-[130px]"><a href="#">Explore More</a></p>
//     </div>
//     <div className="w-full bg-transparent bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('./image/Rectangle 15.png')" }}>
//               <p className="mt-[300px] text-white text-[35px] ml-[130px]"><a href="#">Explore More</a></p>
//     </div>
//     <div className="w-full bg-transparent bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('./image/Rectangle 22.png')" }}>
//               <p className="mt-[300px] text-white text-[35px] ml-[130px]"><a href="#">Explore More</a></p>
//     </div>
//     <div className="w-full bg-transparent bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('./image/Rectangle 14.png')" }}>
//               <p className="mt-[300px] text-white text-[35px] ml-[130px]"><a href="#">Explore More</a></p>
//     </div>
//     <div className="w-full bg-transparent bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('./image/Rectangle 15.png')" }}>
//               <p className="mt-[300px] text-white text-[35px] ml-[130px]"><a href="#">Explore More</a></p>
//     </div>
  
//     <div className="w-full bg-transparent bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('./image/Rectangle 22.png')" }}>
//               <p className="mt-[300px] text-white text-[35px] ml-[160px]"><a href="#">Explore More</a></p>
//     </div>
// </div>