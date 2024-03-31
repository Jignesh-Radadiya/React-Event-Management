import { useState, useEffect } from 'react';
import Navbar from "../../components/AdminNav/Navbar";
import axios from 'axios';

const Admin = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalBookings, setTotalBookings] = useState(0);
    const [totalContacts, setTotalContacts] = useState(0);
    const [totalEvents, setTotalEvents] = useState(0);

    useEffect(() => {
        const fetchTotalUsers = async () => {
            try {
                const response = await axios.get('http://localhost:9000/total-users');
                setTotalUsers(response.data.totalUsers);
            } catch (error) {
                console.error('Error fetching total users:', error);
            }
        };

        const fetchTotalBookings = async () => {
            try {
                const response = await axios.get('http://localhost:9000/total-bookings');
                setTotalBookings(response.data.totalBookings);
            } catch (error) {
                console.error('Error fetching total bookings:', error);
            }
        };

        const fetchTotalContacts = async () => {
            try {
                const response = await axios.get('http://localhost:9000/total-contacts');
                setTotalContacts(response.data.totalContacts);
            } catch (error) {
                console.error('Error fetching total contacts:', error);
            }
        };

        const fetchTotalEvents = async () => {
            try {
                const response = await axios.get('http://localhost:9000/total-events');
                setTotalEvents(response.data.totalEvents);
            } catch (error) {
                console.error('Error fetching total events:', error);
            }
        };

        fetchTotalUsers();
        fetchTotalBookings();
        fetchTotalContacts();
        fetchTotalEvents();
    }, []);

   
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center mt-2">
                <div className="bg-blue-200 w-4/5 md:w-3/4 lg:w-[1500px] p-10 rounded-lg mx-4 md:mx-0 mb-6">
                    <h1 className="text-center text-3xl font-bold">Admin</h1>
                </div>
                <div className="flex justify-center items-center gap-8 md:gap-16 mb-10">
                    <div className="w-full md:w-1/3 bg-green-200 p-[100px] rounded-lg">
                        <h2 className="text-center text-xl font-semibold mb-4">Total Events</h2>
                        <p className="text-center text-lg">{totalEvents}</p>
                    </div>
                    <div className="w-full md:w-1/3 bg-green-200 p-[100px] rounded-lg">
                        <h2 className="text-center text-xl font-semibold mb-4">Total Users</h2>
                        <p className="text-center text-lg">{totalUsers}</p>
                    </div>
                    <div className="w-full md:w-1/3 bg-green-200 p-[90px] rounded-lg">
                        <h2 className="text-center text-xl font-semibold mb-4">Total Bookings</h2>
                        <p className="text-center text-lg">{totalBookings}</p>
                    </div>
                    <div className="w-full md:w-1/3 bg-green-200 p-[90px] rounded-lg">
                        <h2 className="text-center text-xl font-semibold mb-4">Total Contacts</h2>
                        <p className="text-center text-lg">{totalContacts}</p>
                    </div>
                </div>
                
            </div>
        </>
    );
};

export default Admin;
