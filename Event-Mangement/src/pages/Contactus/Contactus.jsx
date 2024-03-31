import Navigation from "../../components/Navigation/Navigation.jsx";

import { useState } from "react";

const Contactus = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const collectData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        // Clear form fields after successful submission
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        console.error('Failed to send message:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
    return (
      <div>
        <Navigation/>
        <div className="flex flex-col items-center justify-end pt-[11px] bg-white w-full">
        <div className="flex flex-col justify-start w-full">
        <div className="mt-[70px] flex flex-col ml-[8px]">
        <p className="text-[45px] text-black tracking-widest uppercase ">Contact</p>
          </div>
        </div>
        <div className="flex flex-row justify-end items-center ml-[174px] mt-[0.5px] w-full sm:flex-col sm:ml-0">
        <div className="flex flex-row items-center border border-solid border-gray-400 p-[15px]  justify-between gap-[30px]">
        <div className="mb-[1px] bg-yellow-100 border border-green-500 rounded-md p-[50px]">
            <p className="font-nunito-sans text-[25px] text-black">Address</p>
              <p className="text-base leading-8">Tramba,Rajkot,360020</p>
          </div>
            <div className="mb-[1px] bg-yellow-100 border border-green-500 rounded-md p-[50px]">
            <p className="font-nunito-sans text-[25px] text-black">Call Us</p>
              <p className="text-base leading-8">+917574992569</p>
            </div>
            <div className="mb-[1px] bg-yellow-100 border border-green-500 rounded-md p-[50px]">
            <p className="font-nunito-sans text-[25px] text-black">Mail Us</p>
              <p className="text-base leading-8">info@JPevents.com</p>
            </div>
          </div>
          <form>

          <div className="flex flex-row justify-start mb-[100px] ">
          {/* <p className="text-[25px] text-black opacity-90 uppercase tracking-widest ml-4">contact</p> */}
          <div className="flex flex-col items-center justify-start ml-[160px] w-4/5">

          <div className="flex flex-row gap-[10px] w-1/2">

                <input className="w-[680px] py-3 px-4 mt-6 bg-yellow-100 border border-green-500 rounded-md" type="text" placeholder="Name" 
               autoComplete="name"
               value={name} onChange={(e)=>setName(e.target.value)} required />
                <input className="w-[680px] py-3 px-4 mt-6 bg-yellow-100 border border-green-500 rounded-md" type="email" placeholder="Email" 
                autoComplete="email"
                value={email} onChange={(e)=>setEmail(e.target.value)} required />
              </div>
              <div className="flex flex-col w-auto">
                <input className="w-[600px] py-3 px-4 mt-6 bg-yellow-100 border border-green-500 rounded-md" type="text" placeholder="Subject" 
                autoComplete="subject"
                value={subject} onChange={(e)=>setSubject(e.target.value)} required />
                <textarea className="w-[600px] h-[200px] py-3 px-4 mt-6 bg-yellow-100 border border-green-500 rounded-md" placeholder="Message" 
                autoComplete="message"
                value={message} onChange={(e)=>setMessage(e.target.value)} required />
              </div>
              <button type="submit" onClick={collectData} className="cursor-pointer w-52 mt-[10px] px-4 py-2 font-cormorant-garamond font-semibold text-lg text-center text-white bg-black rounded-md">Send</button>
              {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
            </div>
          </div>
          </form>

        </div>
        
      </div>
    </div>

          
    );
  };
  export default Contactus;
  



  // const [email,setEmail]=useState("");
  // const [name,setName]=useState("");
  // const [subject,setSubject]=useState(""); 
  // const [message,setMessage]=useState("");
  // const [successMessage, setSuccessMessage] = useState(false); // State for success message
  // const navigate=useNavigate();

  // useEffect(()=>{
  //     const auth=localStorage.getItem('users');
  //     if(auth){
  //         navigate('/');
  //     }
  // })

  // const collectData=async (e)=>{
  //   e.preventDefault(); // Prevent default form submission behavior

  //     let result=await fetch('http://localhost:9000/contactus',{
  //         method: 'POST',
  //         body: JSON.stringify({name,email,subject,message}),
  //         headers:{
  //             'Content-Type': 'application/json'
  //         }
  //     });
  //     result=await result.json();
  //     console.log(result);
  //     localStorage.setItem("users",JSON.stringify(result));
  //     if(result){
  //       setSuccessMessage("Send Successfull"); 
  //     setTimeout(() => {
  //       setSuccessMessage(""); 
  //         navigate('/');  
  //       },3000);
        
  //     }
  // }

    















  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   subject: '',
  //   message: ''
  // });

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post('/api/contact', formData);
  //     alert('Contact form submitted successfully');
  //   } catch (error) {
  //     console.error('Error:', error);
  //     alert('Error submitting contact form');
  //   }
  // };