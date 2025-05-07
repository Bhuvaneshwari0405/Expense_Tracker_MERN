import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axiosInstance  from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
    const { user, updateUser, cleanUser } = useContext(UserContext);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (user) return;
  
      let isMounted = true;
  
      const fetchUser = async () => {
        try {
          const response = await axiosInstance.get(API_PATHS.GET_USER_INFO);
          if (isMounted && response.data) {
            updateUser(response.data);
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          if (isMounted) {
            cleanUser();
            navigate("/login");
          }
        }
      };
  
      fetchUser();
  
      return () => {
        isMounted = false;
      };
    }, [user, updateUser, cleanUser, navigate]);
  };

  export default useUserAuth;