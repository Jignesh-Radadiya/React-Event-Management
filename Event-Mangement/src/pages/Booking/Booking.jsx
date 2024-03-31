import Navigation from "../../components/Navigation/Navigation.jsx";

import { useState } from "react";

const Booking = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(""); 
  const [eventPlace, setEventPlace] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, mobile, eventName, date, time, eventPlace }),
      });
      const data = await response.json();
      console.log("Server response:", data);
      setSuccessMessage("Booking Successful!");
      setTimeout(() => {
        setSuccessMessage("");
        // Clear form fields after successful submission
        setName("");
        setEmail("");
        setMobile("");
        setEventName("");
        setDate("");
        setTime(""); 
        setEventPlace("");
      }, );
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };
    
    return (
      <div>
        <Navigation/>
        
        <div className="flex flex-col items-center justify-end pt-[11px] mb-[100px] bg-white w-full">
        <div className="flex flex-col justify-start w-full">
        <div className="mt-[70px] flex flex-col ml-[8px]">
        <p className="text-[45px] text-black tracking-widest uppercase ">Booking</p>
          </div>
        </div>
        <form>

        <div className="flex flex-col items-center w-4/5">
          <input className="w-[340px] py-3 px-4 mt-6 bg-yellow-100 border border-green-500 rounded-md" type="text" name="Name" placeholder="Name"
           autoComplete="name"
           value={name} onChange={(e)=>setName(e.target.value)} required="" />
          <input className="w-[340px] py-3 px-4 mt-6 bg-yellow-100 border border-green-500 rounded-md" type="email" name="Email" placeholder="Email"  
           autoComplete="email"
           value={email} onChange={(e)=>setEmail(e.target.value)} required=""/>
          <input className="w-[340px] py-3 px-4 mt-6 bg-yellow-100 border border-green-500 rounded-md" type="text" name="Mobile" placeholder="Mobile No."
         autoComplete="tel"  
         maxLength={10} 
         pattern="[0-9]{10}"
         value={mobile} 
         onChange={(e)=>{    
             const input = e.target.value.replace(/\D/g, '').slice(0, 10);
           setMobile(input)}} required="" />
          <input className="w-[340px] py-3 px-4 mt-6 bg-yellow-100 border border-green-500 rounded-md" type="text" name="Event Name" placeholder="Event Name" 
            autoComplete="eventName"
            value={eventName} onChange={(e)=>setEventName(e.target.value)} required="" />
          <input className="w-[340px] py-3 px-4 mt-6 bg-yellow-100 border border-green-500 rounded-md" type="date" name="Date" placeholder="Date" 
           autoComplete="date"
           value={date} onChange={(e)=>setDate(e.target.value)} required="" />
            <input
              className="w-[340px] py-3 px-4 mt-6 bg-yellow-100 border border-green-500 rounded-md"
              type="time"
              name="Time" // Name for time input field
              placeholder="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required=""
            />
          <input className="w-[340px] py-3 px-4 mt-6 bg-yellow-100 border border-green-500 rounded-md" type="text" name="Event Place" placeholder="Event Place"
            autoComplete="eventPlace"
            value={eventPlace} onChange={(e)=>setEventPlace(e.target.value)} required="" />
          <button className="cursor-pointer w-40 mt-3 py-3 lg:mb-12 font-semibold text-lg md:text-xl text-center text-white bg-black border-none rounded-lg" type="submit"  onClick={handleSubmit}>
            Submit
           </button>
           
          </div>
          </form>
          {successMessage && <div className="text-green-500">{successMessage}</div>}

          </div>
          </div>

 
          
    );
  };
  export default Booking;
  