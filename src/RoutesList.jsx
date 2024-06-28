import { Routes, Route, Navigate } from "react-router-dom";
import ItemSearch from "./ItemSearch.jsx";
import ItemPage from "./ItemPage.jsx";
import Home from "./HomePage.jsx";
import Register from "./Register.jsx";
import NewMessage from "./NewMessage.jsx";
import NewItem from "./NewItem.jsx";
import UserProfile from "./User.jsx";
import UserEdit from "./UserEdit.jsx";
import Reports from "./Reports.jsx";
import MessageList from "./MessageList.jsx";
import Conversation from "./Conversation.jsx";
import NewReview from "./NewReview.jsx";
import ItemEdit from "./ItemEdit.jsx";
// import ItemSale from "./ItemSale.jsx";

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/items/search/all" exact element={<ItemSearch />} />
      <Route path="/items/:id" exact element={<ItemPage />} />
      <Route path="/users/:username" exact element={<UserProfile />} />
      <Route path="/users/:username/edit" exact element={<UserEdit />} />
      <Route path="/users/:username/messages" exact element={<MessageList />} />
      <Route path="/users/:username/review" exact element={<NewReview />} />
      <Route
        path="/messages/conversation/item/:itemID/users/:username1/and/:username2"
        exact
        element={<Conversation />}
      />
      <Route
        path="/messages/:toUser/item/:itemID"
        exact
        element={<NewMessage />}
      />
      <Route path="/items/new/add" exact element={<NewItem />} />

      <Route path="/reports" exact element={<Reports />} />
      <Route path="/items/:id/edit" exact element={<ItemEdit />} />
      {/* <Route path="/items/:id/sale" exact element={<ItemSale />} /> */}
    </Routes>
  );
};

export default RoutesList;
