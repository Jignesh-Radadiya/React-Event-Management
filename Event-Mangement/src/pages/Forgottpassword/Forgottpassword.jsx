import Navigation from "../../components/Navigation/Navigation.jsx";
import { useState } from "react";
import axios from 'axios';

// import { useNavigate } from "react-router-dom";


const Forgottpassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:9000/forgot-password', {
        email,
        password,
      });

      if (response.status === 200) {
        setSuccessMessage('Password reset successful. Please log in with your new password.');
      }
    } catch (error) {
      setErrorMessage('Failed to reset password. Please try again later.');
    }
  };

    return (
      <div className="w-full h-auto flex flex-col">

      <Navigation />
        <div className="w-[700px] flex flex-col justify-center items-center mt-[140px] mb-[60px]">
          <div className="flex items-center">
            <div className="flex-1">
              <img src="./image/Logo1.png" alt="Side Image" className="w-full h-auto" />
            </div>
            <div className="absolute w-[400px] -translate-x-2/4 -translate-y-2/4 box-border py-[40px] px-[40px] rounded-[10px] bg-black bg-opacity-60 shadow-lg left-2/4 top-2/4 mt-[140px];">
              <h2 className="text-white text-center mt-0 mb-[30px] mx-0 text-[25px] ">Forgott Password</h2>
              <h3 className="text-white text-center">Don`t worry it happens. Please Enter an email associated with your account.</h3>
              <form onSubmit={handleResetPassword}>
                <div className="relative mb-[10px]">
                  <input placeholder="Email Id" type="email" name="email" required=""
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-[10px] mb-[30px] text-white border-b border-white bg-transparent outline-none" />
                  {/* <label className="absolute top-0 left-0 py-[10px] text-white pointer-events-none transition duration-500">Email Id</label> */}
                </div>
                <div className="relative mb-[10px]">
                  <input placeholder="Password" type="password" name="password" required="" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-[10px] mb-[30px] text-white border-b border-white bg-transparent outline-none" />
                  {/* <label className="absolute top-0 left-0 py-[10px] text-white pointer-events-none transition duration-500">Password</label> */}
                </div>
                <div className="relative">
                  <input placeholder="Confirm Password" type="re-password" name="re-password" required="" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full py-[10px] mb-[30px] text-white border-b border-white bg-transparent outline-none" />
                  {/* <label className="absolute top-0 left-0 py-[10px] text-white pointer-events-none transition duration-500">Confirm Password</label> */}
                </div>
                <button type="submit" onClick={() => { window.location.href = '/Login'; }} className="relative inline-block py-[10px] px-[20px] mt-[40px] text-blue-500 text-lg uppercase overflow-hidden 
                transition duration-500 ease-in-out bg-black tracking-[4px] shadow-[0_0_5px_#e8f403,0_0_25px_#03e9f4,0_0_50px_#03e9f4,0_0_100px_#03e9f4]
                hover:text-white rounded-md">
                  Submit
                </button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Forgottpassword;
  


 