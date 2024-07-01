import { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import marketAPI from "../api";
import ReportList from "./ReportList.jsx";

const Reports = () => {
  const { user } = useContext(UserContext);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getReports = async () => {
      setIsLoading(true);
      if (user.isAdmin) {
        let reports = await marketAPI.getAllReports();
        setReports(reports);
      }
    };
    try {
      if (user) {
        getReports();
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <p className="loading-message">Loading...</p>;
  }

  //Can only see the page if user is logged in
  if (!user) {
    return <h1>Please Log In First!</h1>;
  }

  if (!user.isAdmin) {
    return <h1>Only admins can see this page!</h1>;
  }

  return (
    <div className="reports-page-div">
      <ReportList reports={reports} currentUser={user} />
    </div>
  );
};

export default Reports;