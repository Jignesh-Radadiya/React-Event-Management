import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data from local storage
    localStorage.removeItem("users");
    localStorage.removeItem("token");

    // Redirect to login page
    navigate("/Login");
  }, [navigate]);

  return null; // Since this component only performs side effects, it doesn't render anything
};

export default Logout;
