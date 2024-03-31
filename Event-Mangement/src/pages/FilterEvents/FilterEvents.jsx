import { useState } from 'react';
import axios from 'axios';
import Navigation from "../../components/Navigation/Navigation";
import EventCard from '../../components/EventCard/EventCard'; // Import EventCard component


const FilterEvents = () => {
  const [bookings, setBookings] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/filter?start=${startDate}&end=${endDate}`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error filtering bookings:', error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="max-w-lg mx-auto mb-[150px]">
        <h1 className="text-2xl font-bold mb-">Filter Events</h1>
        <div className="bg-green-200 p-4 rounded-md shadow-md mb-4 mt-[100px]">
          <h2 className="text-lg font-bold mb-2">Filter Event</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <button
            onClick={handleFilter}
            className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Show
          </button>
        </div>

        <h2 className="text-lg font-bold mt-8">Filtered Events</h2>
        {bookings.map((booking) => (
          <EventCard key={booking.id} booking={booking} /> // Render EventCard for each booking
        ))}
      </div>
    </>
  );
};

export default FilterEvents;









// import { useCallback, useState } from "react";
// import FilterBox from "../../components/FilterBox/FilterBox";
// import SearchEventList from "../../components/SerachEventList/SearchEventList";
// import Navigation from "../../components/Navigation/Navigation"
// const FilterEvents = ()=>{
//    const [monthYear,setMonthYear]=useState({
//     selectedMonth:null,
//     selectedYear:null
//    })
//    const getMonthYear = useCallback((selectedMonth,selectedYear)=>{
//       setMonthYear({selectedYear,selectedMonth})
//    },[])
   
//     return(
//       <div>
//          <Navigation />
//          <div className="bg-white h-screen flex flex-col justify-start items-center pt-32">
//          <FilterBox getMonthYear={getMonthYear}/>
//          <SearchEventList monthYear={monthYear}/>
//   </div>
// </div>
//     )
//   }
//   export default FilterEvents;