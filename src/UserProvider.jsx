import UserContext from "./UserContext.js";
import { useState, useEffect } from "react";
import marketAPI from "../api.js";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //sets context for user for entire app
  const currentUser = (user) => {
    setUser(user);
  };

  // //On initial render, get user token from local storage, gets the current user from the api, and set as context
  useEffect(() => {
    async function getToken() {
      let token = localStorage.getItem("market-token");
      if (token) {
        let userInfo = await marketAPI.getCurrentUser();
        currentUser(userInfo);
      }
    }
    getToken();
  }, []);

  //These functions and user state will be used in context
  //Set the token in local storage, retrives the current user from the api, and sets the user as context on login
  const logIn = async (username, token) => {
    localStorage.setItem("market-token", token);
    let userInfo = await marketAPI.getUserInfo(username);
    currentUser(userInfo);
  };

  //remove token and user from local storage and set user context to null on logout
  const logOut = () => {
    localStorage.removeItem("market-token");
    currentUser(null);
  };

  //update current user in local storage and context
  const updateUser = async (username) => {
    let userInfo = await marketAPI.getUserInfo(username);
    currentUser(userInfo);
  };

  return (
    <UserContext.Provider
      value={{ user, currentUser, logIn, logOut, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
