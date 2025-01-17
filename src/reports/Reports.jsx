import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext.js";
import marketAPI from "../../api.js";
import ReportList from "./ReportList.jsx";

const Reports = () => {
  const { user } = useContext(UserContext);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getReports = async () => {
      if (user.isAdmin) {
        let usernameData = { username: user.username };
        let reports = await marketAPI.getAllReports(usernameData);
        setReports(reports);
        setIsLoading(false);
      }
    };
    try {
      setIsLoading(true);
      if (user) {
        getReports();
      } else {
        setIsLoading(false);
      }
    } catch (err) {
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
    return <h1>Only admins can see this page!</h1>;
  }

  return (
    <div className="reports-page-div">
      <h1>All Reports</h1>
      <ReportList reports={reports} />
    </div>
  );
};

export default Reports;
