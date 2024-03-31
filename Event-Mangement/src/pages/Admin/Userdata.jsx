// UserTable.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../../components/AdminNav/Navbar";

const Userdata = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center mt-[50px]">
  <div>
    <h1 className="text-3xl font-bold mb-4">User Data</h1>
  </div>
  <div className="overflow-x-auto">
    <table className="table-auto border-collapse border border-gray-400">
      <thead>
        <tr>
          <th className="px-4 py-2 bg-gray-200 border border-gray-400">Name</th>
          <th className="px-4 py-2 bg-gray-200 border border-gray-400">Email</th>
          <th className="px-4 py-2 bg-gray-200 border border-gray-400">Mobile</th>
          <th className="px-4 py-2 bg-gray-200 border border-gray-400">Password</th>
          <th className="px-4 py-2 bg-gray-200 border border-gray-400">Password Reset Count</th>


        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id} className="hover:bg-gray-100">
            <td className="px-4 py-2 border border-gray-400">{user.name}</td>
            <td className="px-4 py-2 border border-gray-400">{user.email}</td>
            <td className="px-4 py-2 border border-gray-400">{user.mobile}</td>
            <td className="px-4 py-2 border border-gray-400">{user.password}</td>
            <td className="px-4 py-2 border border-gray-400">{user.passwordResetCount}</td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
</>
  );
};

export default Userdata;
