import { Routes, Route, Navigate } from "react-router-dom";
import ItemSearch from "./items/ItemSearch.jsx";
import ItemPage from "./items/ItemPage.jsx";
import Home from "./HomePage.jsx";
import Register from "./authentication/Register.jsx";
import NewMessage from "./messages/NewMessage.jsx";
import NewItem from "./items/NewItem.jsx";
import UserProfile from "./users/User.jsx";
import UserEdit from "./users/UserEdit.jsx";
import Reports from "./reports/Reports.jsx";
import MessageList from "./messages/MessageList.jsx";
import Conversation from "./messages/Conversation.jsx";
import NewReview from "./reviews/NewReview.jsx";
import ItemEdit from "./items/ItemEdit.jsx";
import NewReport from "./reports/NewReport.jsx";
import ReportMessages from "./reports/ReportMessages.jsx";
import ReportPage from "./reports/ReportPage.jsx";

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
      <Route path="/users/:username/report" exact element={<NewReport />} />
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
      <Route path="/reports/:id" exact element={<ReportPage />} />
      <Route
        path="/reports/messages/:username1/:username2"
        exact
        element={<ReportMessages />}
      />
      <Route path="/items/:id/edit" exact element={<ItemEdit />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RoutesList;
