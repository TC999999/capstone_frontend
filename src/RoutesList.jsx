import { Routes, Route, Navigate } from "react-router-dom";
// import Items from "./Items";
import ItemSearch from "./ItemSearch.jsx";
import ItemPage from "./ItemPage.jsx";
import Home from "./HomePage.jsx";
import Register from "./Register.jsx";
import NewMessage from "./NewMessage.jsx";
import NewItem from "./NewItem.jsx";
import UserProfile from "./User.jsx";
// import UserEdit from "./UserEdit.jsx";
import Reports from "./Reports.jsx";

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/items/search/all" exact element={<ItemSearch />} />
      <Route path="/items/:id" exact element={<ItemPage />} />
      <Route path="/users/:username" exact element={<UserProfile />} />
      {/* <Route path="/users/:username/edit" exact element={<UserEdit />} /> */}
      <Route
        path="/messages/:toUser/id/:itemID"
        exact
        element={<NewMessage />}
      />
      <Route path="/items/new/add" exact element={<NewItem />} />
      <Route path="/reports" exact element={<Reports />} />
    </Routes>
  );
};

export default RoutesList;
