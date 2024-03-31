import { useState, useEffect } from 'react';
import axios from 'axios';
import BookingCard from "../../components/EventCard/EventCard.jsx";
import Navigation from "../../components/Navigation/Navigation.jsx";

const EventList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all booking data from backend
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:9000/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to fetch bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []); // Empty dependency array to run effect only once on component mount

  const renderBookingCards = () => {
    return bookings.map(booking => (
      <BookingCard
        key={booking._id} // Assuming the booking object has an _id field
        booking={booking}
      />
    ));
  };

  return (
    <div>
      <Navigation />
      <div className="max-w-screen-md mx-auto ">
        <div className="flex flex-col items-center">
          <div className="mt-[100px] mb-[150px] w-[500px]">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : bookings.length > 0 ? (
            renderBookingCards()
          ) : (
            <p className="text-center">No bookings available</p>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
















// import EventCard from "../../components/EventCard/EventCard.jsx";
// import { eventList } from "../../utils/EventDatabase.jsx";
// import Navigation from "../../components/Navigation/Navigation.jsx";
// // import "./EventList.css";
// const EventList = () => {
//   const renderEventCards = () => {
//     return eventList.map(({ id, date, heading, location, img }) => {
//       return (
//         <EventCard
//           key={id}
//           id={id}
//           date={date}
//           heading={heading}
//           location={location}
//           img={img}
//         />
//       );
//     });
//   };
//   return (
//     <div>
//       <Navigation/>
      
//       <div className="w-full max-w-screen-md h-auto flex flex-col justify-center items-center mb-12 ml-[350px]">
//         <div className="w-[500px] mt-[120px] flex flex-wrap gap-[24px]">
//         <button className="cursor-pointer w-[800px] p-[5px] ml-[800px] font-cormorant-garamond font-semibold text-white bg-black rounded-md" type="button" onClick={() => { window.location.href = '/Booking'; }}>Book Events</button>
//           {eventList.length > 0 ? (
//             renderEventCards()
//           ) : (
//             <p className="text-center">No events available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default EventList;
