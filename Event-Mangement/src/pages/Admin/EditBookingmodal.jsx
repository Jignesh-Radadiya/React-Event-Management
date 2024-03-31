    import { useState } from 'react';
    import axios from 'axios';
    import PropTypes from 'prop-types'; // Import PropTypes

    const EditBookingModal = ({ booking, onClose, onSave }) => {
    const [updatedBooking, setUpdatedBooking] = useState({ ...booking });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBooking({ ...updatedBooking, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting updated booking:', updatedBooking); // Check if the correct data is being submitted
        try {
            await axios.put(`http://localhost:9000/bookings/${updatedBooking._id}`, updatedBooking);
            onSave(updatedBooking); // Pass the updated booking back to parent component
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };
    

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Booking</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="eventName" className="block font-medium">Event Name:</label>
                <input type="text" id="eventName" name="eventName" value={updatedBooking.eventName} onChange={handleChange} className="w-full border-gray-300 rounded-md mt-1" required />
            </div>
            <div className="mb-4">
                <label htmlFor="eventPlace" className="block font-medium">Event Place:</label>
                <input type="text" id="eventPlace" name="eventPlace" value={updatedBooking.eventPlace} onChange={handleChange} className="w-full border-gray-300 rounded-md mt-1" required />
            </div>
            <div className="mb-4">
                <label htmlFor="date" className="block font-medium">Date:</label>
                <input type="date" id="date" name="date" value={updatedBooking.date} onChange={handleChange} className="w-full border-gray-300 rounded-md mt-1" required />
            </div>
            <div className="mb-4">
                <label htmlFor="time" className="block font-medium">Time:</label>
                <input type="time" id="time" name="time" value={updatedBooking.time} onChange={handleChange} className="w-full border-gray-300 rounded-md mt-1" required />
            </div>
            <div className="flex justify-end">
                <button type="button" onClick={onClose} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2">Cancel</button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
            </div>
            </form>
        </div>
        </div>
    );
    };

    // Add prop types validation
    EditBookingModal.propTypes = {
        booking: PropTypes.object.isRequired, // Validate that 'booking' prop is provided and is an object
        onClose: PropTypes.func.isRequired, // Validate that 'onClose' prop is provided and is a function
        onSave: PropTypes.func.isRequired, // Validate that 'onSave' prop is provided and is a function
    };

    export default EditBookingModal;
