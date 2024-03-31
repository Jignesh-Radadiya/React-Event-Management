import { useState } from 'react';
import axios from 'axios';
import Navbar from "../../components/AdminNav/Navbar";

const Addevents = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [eventId, setEventId] = useState('');
    const [eventTitle, setEventTitle] = useState('');
    const [description, setDescription] = useState('');
    const [packageDetails, setPackageDetails] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file to upload');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await axios.post('http://localhost:9000/upload', formData);
            return response.data.imageUrl;
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file');
        }
    };

    const handleAddEvent = async () => {
        if (!eventId || !eventTitle || !description || !packageDetails) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            const imageUrl = await handleUpload();

            await axios.post('http://localhost:9000/events', {
                id: eventId,
                imageUrl,
                eventTitle,
                description,
                packageDetails
            });

            alert('Event added successfully');
            setEventTitle('');
            setDescription('');
            setPackageDetails('');
        } catch (error) {
            console.error('Error adding event:', error);
            alert('Failed to add event');
        }
    };
  

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-end pt-[11px] mb-[100px] bg-white w-full">
                <div className="flex flex-col justify-start w-full">
                    <div className="flex flex-col ml-[8px]">
                        <p className="text-[45px] text-black tracking-widest uppercase ">Add Events description</p>
                    </div>
                </div>
                <form className="flex flex-col items-center w-4/5 ml-10">
                    <input className="w-[400px] py-3 px-4 mt-6 bg-yellow-100 border border-green-500 rounded-md" type="number" name="id" placeholder="ID" min="0" required=""  value={eventId} onChange={(e) => setEventId(e.target.value)}/>
                    <div className="flex items-center mt-6">
                        <input className="w-[400px] py-3 px-4 ml-[140px] bg-yellow-100 border border-green-500 rounded-md" type="file" name="file" placeholder='Upload Image' accept=".jpg, .jpeg, .png" required onChange={handleFileChange} />
                        <button className="cursor-pointer ml-4 p-[5px] font-[11px] text-[10px] md:text-xl text-center text-white bg-black border-none rounded-lg" type="button" onClick={handleUpload}>
                            Upload File
                        </button>
                    </div>
                    <input className="w-[400px] py-3 px-4 mt-6 bg-yellow-100 border border-green-500 rounded-md" type="text" name="" placeholder="Event Title" required="" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
                    <textarea className="w-[400px] h-[100px] py-3 px-4 mt-6 bg-yellow-100 border border-green-500 rounded-md" placeholder="Description" required value={description} onChange={(e) => setDescription(e.target.value)} />
                    <textarea className="w-[400px] h-[100px] py-3 px-4 mt-6 bg-yellow-100 border border-green-500 rounded-md" placeholder="Package Details" required value={packageDetails} onChange={(e) => setPackageDetails(e.target.value)} />
                    <div className="flex justify-center w-full mt-6 gap-[65px] ml-[100px]">
                        <button className="cursor-pointer w-40 mt-3 py-3 lg:mb-12 font-semibold text-lg md:text-xl text-center text-white bg-black border-none rounded-lg" type="submit" onClick={handleAddEvent}>
                            Submit
                        </button>
                        <button className="cursor-pointer w-[250px] mt-3 py-3 lg:mb-12 font-semibold text-lg md:text-xl text-center text-white bg-blue-900 border-none rounded-lg" type="submit" onClick={() => { window.location.href = '/Addeventdata'; }}>
                            Show Addevent Data
                        </button>
                       
                    </div>
                </form>
                
            </div>
        </div>
    );
};
export default Addevents;
