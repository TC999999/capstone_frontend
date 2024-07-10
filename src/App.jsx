import RoutesList from "./RoutesList.jsx";
import NavBar from "./Navbar.jsx";
import Header from "./Header.jsx";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./UserProvider.jsx";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <Header />
          <NavBar />
          <RoutesList />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
