import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserDataContext } from "./userDataContext";
import { AuthDataContext } from "./AuthDataContext";

function UserContext({ children }) {
  const { serverUrl } = useContext(AuthDataContext);
  const [userData, setUserData] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/user/currentuser`,
        { withCredentials: true }
      );
      console.log(res.data);
      setUserData(res.data);
    } catch (err) {
      setUserData(null);
      console.log(err);
    } 
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const value = {
    userData,
    setUserData,
    fetchCurrentUser
  }

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContext;
