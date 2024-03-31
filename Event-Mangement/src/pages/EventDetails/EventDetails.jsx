import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navigation from "../../components/Navigation/Navigation";


const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/service/events/${id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError('Error fetching event details. Please try again later.');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  return (
    <>
    <Navigation />
      <div className="container mx-auto px-4 py-8 mb-[100px]">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center">{error}</div>
        ) : (
          <div>
            <div className="mb-8">
              <img src={`http://localhost:9000${event.imageUrl}`} alt={event.eventTitle} className="w-full h-[450px] mt-[70px] object-cover rounded-lg" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">{event.eventTitle}</h2>
              <p className="text-lg mb-4">{event.description}</p>
              <p className="text-lg mb-4">{event.packageDetails}</p>

              {/* Display more event details as needed */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventDetails;





// import { useParams } from "react-router-dom";
// import { eventList } from "../../utils/EventDatabase";
// import Navigation from "../../components/Navigation/Navigation";
// import {MdCalendarMonth} from "react-icons/md";
// import {IoLocationSharp} from "react-icons/io5"
// import { AiOutlineInfoCircle } from "react-icons/ai";

// // import "./EventDetails.css";
// const EventDetails = ()=>{
//   const {id}=useParams()
//   const numId = Number(id)

//   const filteredEvent = eventList.find(
//     eventDetail=>eventDetail.id===numId)

//   return(
//     <div className="w-full h-screen">
//       <Navigation />
//       <div className="px-[80px] py-[40px] md:py-[80px] ">
//         <img
//           src={filteredEvent.img}
//           alt="Event"
//           className="w-full h-[50vh] bg-cover bg-center bg-no-repeat object-cover block mt-[60px]"
//         />
//         <div className="event-details-content mt-[40px]  mb-[50px] ">
//           <h3 className="text-xl uppercase font-semibold text-gray-800 mb-[20px]">
//             Event Name : {filteredEvent.heading}
//           </h3>
//           <div className="small-details">
//             <p className="date flex justify-start items-center gap-[8px]">
//               <MdCalendarMonth className="w-9 h-9" />
//               <span className="font-medium text-base">{filteredEvent.date.month}</span>
//               <span className="font-medium text-base">{filteredEvent.date.year}</span>
//             </p>
//             <p className="location font-medium text-base flex justify-start items-center gap-[8px]">
//               <IoLocationSharp className="w-9 h-9"/>
//               {filteredEvent.location}
//             </p>
//           </div>
//           <p className="description flex flex-col items-start gap-[8px] text-base mt-[20px]">
//             {/* <span className="description-heading text-lg font-medium text-primary-color mt-[20px]">
//               Event Description:
//             </span> */}
//             <span className="description-heading-para text-base">
//             <AiOutlineInfoCircle className="w-9 h-9"/>
//               {filteredEvent.description}</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default EventDetails;