import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get tokens from localStorage
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    // Check if there's a valid access token
    const checkUserLogin = async () => {
      if (accessToken) {
        try {
          //   const url = "http://localhost:8848/api/isLoggedIn";
          const url = "https://storeapi.up.railway.app/api/isLoggedIn";
          // Try to get user details with the access token
          const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          dispatch(setUser(response.data)); // Update Redux state with user data
        } catch (error) {
          if (error.response?.status === 401) {
            // If access token is expired or invalid, attempt to refresh it
            await refreshAccessToken();
          } else {
            setError("Error checking user status");
            setLoading(false);
          }
        }
      } else {
        setLoading(false); // No token, skip checking user
      }
    };

    // Function to refresh access token using refresh token
    const refreshAccessToken = async () => {
      if (refreshToken) {
        try {
          const url = "https://storeapi.up.railway.app/api/refreshToken";
          // const url = "http://localhost:8848/api/refreshToken";
          const response = await axios.post(url, {}, { withCredentials: true });

          // Update the user data and access token
          dispatch(setUser(response.data.user));
          localStorage.setItem("accessToken", response.data.accessToken);
          setLoading(false);
        } catch (error) {
          setError("Unable to refresh token");
          setLoading(false);
        }
      } else {
        setError("No refresh token available");
        setLoading(false);
      }
    };

    checkUserLogin();
  }, [accessToken, dispatch]);

  return { loading, error };
};

export default useAuth;
