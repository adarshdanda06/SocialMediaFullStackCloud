// UserContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import url from "./serverURL";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const api = axios.create({
    baseURL: url, 
    withCredentials: true
  });

  useEffect(() => {
    fetchSessionData();
  }, []);

  const fetchSessionData = async () => {
    try {
      const response = await api.get(`/loginActions/getUsername`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching session data:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
