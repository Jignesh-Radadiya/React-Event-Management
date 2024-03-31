import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../../components/AdminNav/Navbar";
import EditBookingModal from './EditBookingmodal'; // Import EditBookingModal component


const Bookingdata = () => {
    const [bookings, setBookings] = useState([]);
    const [editBooking, setEditBooking] = useState(null);

    useEffect(() => {
        fetchBookingData();
    }, []);

    const fetchBookingData = async () => {
        try {
            const response = await axios.get('http://localhost:9000/bookings');
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching booking data:', error);
        }
    };

    const handleEdit = (id) => {
        // Find the booking to edit
        const bookingToEdit = bookings.find(booking => booking._id === id);
        if (bookingToEdit) {
            setEditBooking(bookingToEdit);
        }
    };

    const handleSave = (updatedBooking) => {
        // Update the booking in the bookings state array
        setBookings(bookings.map(booking => (booking._id === updatedBooking._id ? updatedBooking : booking)));
        // Close the modal
        setEditBooking(null);
    };

    const handleCloseModal = () => {
        setEditBooking(null);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/bookings/${id}`);
            // Refresh booking data after deletion
            fetchBookingData();
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-[50px]">
                <div className="overflow-x-auto">
                    <h1 className="text-3xl font-bold mb-4">Booking Data</h1>
                    <table className="table-auto border-collapse border border-gray-400">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 bg-gray-200 border border-gray-400">Name</th>
                                <th className="px-4 py-2 bg-gray-200 border border-gray-400">Email</th>
                                <th className="px-4 py-2 bg-gray-200 border border-gray-400">Mobile</th>
                                <th className="px-4 py-2 bg-gray-200 border border-gray-400">Event Name</th>
                                <th className="px-4 py-2 bg-gray-200 border border-gray-400">Event Place</th>
                                <th className="px-4 py-2 bg-gray-200 border border-gray-400">Date</th>
                                <th className="px-4 py-2 bg-gray-200 border border-gray-400">Time</th>
                                <th className="px-4 py-2 bg-gray-200 border border-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking._id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border border-gray-400">{booking.name}</td>
                                    <td className="px-4 py-2 border border-gray-400">{booking.email}</td>
                                    <td className="px-4 py-2 border border-gray-400">{booking.mobile}</td>
                                    <td className="px-4 py-2 border border-gray-400">{booking.eventName}</td>
                                    <td className="px-4 py-2 border border-gray-400">{booking.eventPlace}</td>
                                    <td className="px-4 py-2 border border-gray-400">{booking.date}</td>
                                    <td className="px-4 py-2 border border-gray-400">{booking.time}</td>

                                    <td className="px-4 py-2 border border-gray-400">
                                        <button onClick={() => handleEdit(booking._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
                                        <button onClick={() => handleDelete(booking._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {editBooking && (
                    <EditBookingModal
                        booking={editBooking}
                        onClose={handleCloseModal}
                        onSave={handleSave}
                    />
                )}
            </div>
        </>
    );
};

export default Bookingdata;
