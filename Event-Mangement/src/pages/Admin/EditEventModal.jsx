import { useState } from 'react';
import axios from 'axios'; // Import axios here
import PropTypes from 'prop-types';

const EditEventModal = ({ event, onUpdate, onClose }) => {
  const [editedEvent, setEditedEvent] = useState(event);
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent(prevEvent => ({
      ...prevEvent,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // If a new image file is selected, upload it first
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        const response = await axios.post('http://localhost:9000/upload', formData);
        editedEvent.imageUrl = response.data.imageUrl;
      }
      await onUpdate(editedEvent);
    } catch (error) {
      console.error('Error updating event:', error);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
  <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
    <span className="close absolute top-0 right-0 m-4 text-gray-600 cursor-pointer" onClick={onClose}>&times;</span>
    <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="eventTitle" className="font-semibold">Title:</label>
        <input
          id="eventTitle"
          type="text"
          name="eventTitle"
          value={editedEvent.eventTitle}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="image" className="font-semibold">Image:</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="font-semibold">Description:</label>
        <textarea
          id="description"
          name="description"
          value={editedEvent.description}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="packageDetails" className="font-semibold">Package Details:</label>
        <textarea
          id="packageDetails"
          name="packageDetails"
          value={editedEvent.packageDetails}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
      
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>
    </form>
  </div>
</div>

  );
};

EditEventModal.propTypes = {
  event: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default EditEventModal;
