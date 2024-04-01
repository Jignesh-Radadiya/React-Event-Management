import Navigation from "../../components/Navigation/Navigation.jsx";
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';


// import {Link} from "react-router-dom"
// import "./login.css";

const Login = () =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  useEffect(() => {
    const auth = localStorage.getItem('token');
    if (auth) {
      navigate('/');
    }
  }); // Run only once when component mounts

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/login', {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true); // Set isLoggedIn to true upon successful login


        if (response.data.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      
      } else {
        console.error('Login failed:', response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in. Please try again.');
    }
  };



    return (
      <div className="w-full h-auto flex flex-col ">

<Navigation isLoggedIn={isLoggedIn} /> 
        <div className="w-[700px] flex flex-col justify-center items-center mt-[110px] mb-[60px]">
          <div className="flex items-center">
            <div className="flex-1">
              <img src="./image/Logo1.png" alt="Side Image" className="w-full h-auto flex-1" />
            </div>
            <div className="absolute w-[400px] -translate-x-2/4 -translate-y-2/4 box-border py-[40px] px-[40px] rounded-[10px] bg-black bg-opacity-60 shadow-lg left-2/4 top-2/4 mt-[140px];">
              <h2 className="text-white text-center mt-0 mb-[30px] mx-0 text-[25px] ">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="relative mb-[30px]">
                  <input placeholder="Email Id" type="email" name="" required=""
                  autoComplete="email"
                   value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-[10px] mb-[30px] text-white border-b border-white bg-transparent outline-none" />
                  {/* <label className="absolute top-0 left-0 py-[10px] text-white pointer-events-none transition duration-500">Username</label> */}
                </div>
                <div className="relative ">
                  <input placeholder="Password" type="password" name="" required=""
                  autoComplete="password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-[10px] mb-[30px] text-white border-b border-white bg-transparent outline-none" />
                  {/* <label className="absolute top-0 left-0 py-[10px] text-white pointer-events-none transition duration-500">Password</label> */}
                </div>
                <div className="text-right mb-[20px] hover:underline">
                  <a href="/Forgottpassword" className="text-blue-500 hover:bg-white">Forgot Password?</a>
                </div>
                <div className="text-center mb-[20px]">
                  <label className="text-white hover:underline" >New to us? <a href="/Signup" className="text-blue-500 hover:bg-white">Sign Up</a></label>
                </div>
                <button type="submit" className="inline-block py-[10px] px-[20px] mt-[40px] text-blue-500 text-lg uppercase overflow-hidden 
                transition duration-500 ease-in-out bg-black tracking-[4px] shadow-[0_0_5px_#e8f403,0_0_25px_#03e9f4,0_0_50px_#03e9f4,0_0_100px_#03e9f4]
                hover:text-white rounded-md">
                 
                  Submit
                </button>

              </form>
         

            </div>
          </div>
        </div>
      </div>
    
    );
  };
  
  export default Login;
  


 
   // <span className="absolute block -left-full top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-btn-1"></span>
     //             <span className="absolute block -top-full right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-btn-2 animate-delay-300"></span>
       //           <span className="absolute block -right-full bottom-0 w-full h-[2px] bg-gradient-to-l from-transparent via-blue-500 to-transparent animate-btn-3 animate-delay-600"></span>
         //         <span className="absolute block -bottom-full left-0 w-[2px] h-full bg-gradient-to-t from-transparent via-blue-500 to-transparent animate-btn-4 animate-delay-900 animate-ping"></span> */}