// EventCard.js
import PropTypes from 'prop-types';
import imageUrl from '../../assets/image/Logo1.png'; // Adjust the path to your image


const EventCard = ({ booking }) => {
  const { eventName, date, time, eventPlace } = booking;


  return (
    <>
    <div className="bg-white p-4 rounded-md shadow-md border border-green-500 mb-[15px] flex items-center">
  <div>
    <h2 className="text-lg font-bold mb-2">{eventName}</h2>
    <p className="text-sm text-gray-700 mb-2">Date: {new Date(date).toLocaleDateString()}</p>
    <p className="text-sm text-gray-700 mb-2">Time: {time}</p>
    <p className="text-sm text-gray-700 mb-2">Place: {eventPlace}</p>
  </div>
  <div className="w-[200px] ml-[150px]">
    <img src={imageUrl} alt="Event" className="w-full h-full object-cover rounded-md" />
  </div>
</div>

  </>
  );
};

EventCard.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
    eventName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    eventPlace: PropTypes.string.isRequired,
  }).isRequired,
};
export default EventCard;



// import { Link } from "react-router-dom";
// const EventCard = ({ id, heading, date, location, img }) => {
//   const { year, month } = date;
//   return (
//      <Link to ={`/events/${id}`}>
//       <div className="bg-white w-[600px] flex justify-center items-center gap-[24px] p-[32px] rounded-[18px] border-[2px] border-green-400 hover:shadow-md">
//       <div className="w-[230px] h-[180px] flex flex-col justify-start items-start">
//       <h3 className="text-[24px] uppercase text-primary font-semibold mb-[40px]">{heading}</h3>
//       <p className="text-[18px]">
//             <span>Year: {year}</span>
//             <span>Month: {month}</span>
//           </p>
//           <p className="text-[18px]">{location}</p>
//         </div>

//         <div className="w-[450px]">
//         <img src={img} alt="image not found" className="w-full rounded-[14px]" />
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default EventCard;
