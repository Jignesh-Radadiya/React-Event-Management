import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../../components/AdminNav/Navbar";

const Contactdata = () => {
    const [contacts, setContacts] = useState([]);
  
    useEffect(() => {
      fetchContactData();
    }, []);
  
    const fetchContactData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };
  
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:9000/contacts/${id}`);
        fetchContactData(); // Refresh contact data after deletion
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    };

  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center mt-[50px]">

    <div className="overflow-x-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Data</h1>
      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-200 border border-gray-400">Name</th>
            <th className="px-4 py-2 bg-gray-200 border border-gray-400">Email</th>
            <th className="px-4 py-2 bg-gray-200 border border-gray-400">Subject</th>
            <th className="px-4 py-2 bg-gray-200 border border-gray-400">Message</th>
            <th className="px-4 py-2 bg-gray-200 border border-gray-400">Actions</th>

            {/* Add more table headings as needed */}
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact._id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border border-gray-400">{contact.name}</td>
              <td className="px-4 py-2 border border-gray-400">{contact.email}</td>
              <td className="px-4 py-2 border border-gray-400">{contact.subject}</td>
              <td className="px-4 py-2 border border-gray-400">{contact.message}</td>
              <td className="px-4 py-2 border border-gray-400">
                <button onClick={() => handleDelete(contact._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
              </td>
              {/* Add more table data cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </>

  );
};

export default Contactdata;
