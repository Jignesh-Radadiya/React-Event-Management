import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation.jsx";


const Logout = () => {
  const [logoutMessage, setLogoutMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      // If user is not logged in, redirect to login page
      navigate("/Login");
    } else {
      // If user is logged in, proceed with logout
      // Clear user data from local storage
      localStorage.removeItem("users");
      localStorage.removeItem("token");

      // Set logout message
      setLogoutMessage("Logout successful!!");

      // Delay the redirect to show the message
      const timeout = setTimeout(() => {
        // Redirect to login page after delay
        navigate("/Login");
      }, 1000); // Delay of 2000 milliseconds (2 seconds)

      // Cleanup function to clear the timeout
      return () => clearTimeout(timeout);
    }
  }, [navigate]);

  return (
    <div>
      <Navigation />
      <div className="py-8 mb-10 container mx-auto">
        <div className="flex flex-col items-center justify-center mt-[100px]">
          <p className="text-center text-[50px]">{logoutMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default Logout;
