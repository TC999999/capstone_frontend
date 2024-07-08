import { useState, useEffect, useContext } from "react";
import UserListCard from "./UserListCard.jsx";
import marketAPI from "../../api.js";
import UserContext from "../UserContext.js";

const AllUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUsers() {
      try {
        let usersRes = await marketAPI.getAllUsers();
        console.log(usersRes);
        setUsers(usersRes);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    if (user && user.isAdmin) {
      getUsers();
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (!user) {
    return <h1>Please Log In First!</h1>;
  }

  if (!user.isAdmin) {
    return <h1 className="err-msg">Only Admins can see this page!</h1>;
  }

  return (
    <div className="users-list-page-div">
      <div className="users-list-div">
        {users.map((user) => {
          return <UserListCard user={user} />;
        })}
      </div>
    </div>
  );
};

export default AllUsers;
