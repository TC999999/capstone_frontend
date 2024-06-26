import RoutesList from "./RoutesList.jsx";
import NavBar from "./Navbar.jsx";
import { useState, useEffect } from "react";
import UserContext from "./UserContext.js";
import { BrowserRouter } from "react-router-dom";
import marketAPI from "../api.js";
// import './App.css'

function App() {
  const [user, setUser] = useState(null);

  //sets context for user for entire app
  const currentUser = (user) => {
    setUser(user);
  };

  //On initial render, get user information from local storage and set as context
  useEffect(() => {
    async function getToken() {
      currentUser(JSON.parse(localStorage.getItem("market-user")));
    }
    getToken();
  }, []);

  //These functions and user state will be used in context
  //Set the token and current user in local storage, also set the user as context on login
  const logIn = async (username, token) => {
    let userInfo = await marketAPI.getUserInfo(username);
    localStorage.setItem("market-token", token);
    localStorage.setItem("market-user", JSON.stringify(userInfo));
    currentUser(userInfo);
  };

  //remove token and user from local storage and set user context to null on logout
  const logOut = () => {
    localStorage.removeItem("market-token");
    localStorage.removeItem("market-user");
    currentUser(null);
  };

  //update current user in local storage and context
  const updateUser = (user) => {
    localStorage.setItem("market-user", JSON.stringify(user));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ user, logIn, logOut, updateUser }}>
          <NavBar logOut={logOut} />
          <RoutesList />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
