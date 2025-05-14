import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("You've successfully logged out!", { autoClose: 1000 });

    setTimeout(() => {
      logoutUser(); 
      navigate("/login", { replace: true }); 
    }, 3000);
  }, [logoutUser, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;