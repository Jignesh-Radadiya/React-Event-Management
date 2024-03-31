import { useState, useEffect } from 'react';
import axios from 'axios';
import EditEventModal from '../Admin/EditEventModal';
import Navbar from "../../components/AdminNav/Navbar";

const Addeventdata = () => {
  const [events, setEvents] = useState([]);
  const [editedEvent, setEditedEvent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:9000/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleEditEvent = (eventId) => {
    const eventToEdit = events.find(event => event._id === eventId);
    setEditedEvent(eventToEdit);
    setIsEditModalOpen(true);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:9000/events/${eventId}`);
      setEvents(events.filter(event => event._id !== eventId)); // Remove the deleted event from the events array
      console.log('Event deleted successfully:', eventId);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleUpdateEvent = async (updatedEvent) => {
    try {
      await axios.put(`http://localhost:9000/events/${updatedEvent._id}`, updatedEvent);
      setEvents(events.map(event => (event._id === updatedEvent._id ? updatedEvent : event)));
      setIsEditModalOpen(false);
      console.log('Event updated successfully:', updatedEvent._id);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Events Data</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Event Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Package Details</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td className="border px-4 py-2">{event.id}</td>
              <td className="border px-4 py-2">
                <img src={`http://localhost:9000${event.imageUrl}`} alt={event.eventTitle} className="h-12 w-12 object-cover" />
              </td>
              <td className="border px-4 py-2">{event.eventTitle}</td>
              <td className="border px-4 py-2">{event.description}</td>
              <td className="border px-4 py-2">{event.packageDetails}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleEditEvent(event._id)}>Edit</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditModalOpen && <EditEventModal event={editedEvent} onUpdate={handleUpdateEvent} onClose={() => setIsEditModalOpen(false)} />}
    </div>
    </>
  );
};

export default Addeventdata;
