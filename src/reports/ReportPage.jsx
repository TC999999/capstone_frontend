import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReportCard from "./ReportCard.jsx";
import marketAPI from "../../api.js";
import UserContext from "../UserContext.js";
import "../styles/ReportPage.css";

const ReportPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isCleared, setIsCleared] = useState(false);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const navigate = useNavigate();
  const [report, setReport] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const getReport = async () => {
      try {
        let reportRes = await marketAPI.getReportByID(id);
        if (!reportRes.isCleared) {
          setReport(reportRes);
        } else {
          setIsCleared(true);
        }
        setIsLoading(false);
      } catch (err) {
        setErr(true);
        setMessage(err[0]);
        setIsLoading(false);
      }
    };
    if (user && user.isAdmin) {
      getReport();
    } else if (user && !user.isAdmin) {
      setIsAdmin(false);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const handleClear = async () => {
    setIsLoading(true);
    try {
      await marketAPI.clearReport(id);
      navigate("/reports");
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  if (isLoading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (err) {
    return <h1>{message}</h1>;
  }

  if (!user) {
    return <h1>Please Log In First!</h1>;
  }

  if (!isAdmin) {
    return <h1>Only admins can access this page!</h1>;
  }

  if (isCleared) {
    return <h1>This report has already been cleared by an admin!</h1>;
  }

  return (
    <div className="report-page-div">
      <div className="report-div">
        <ReportCard report={report} />
        <button className="clear-report-button" onClick={() => handleClear()}>
          Clear Report
        </button>

        <Link
          to={`/reports/messages/${report.reportedUser}/${report.reporterUser}`}
        >
          <button className="check-messages-button">Check Messages</button>
        </Link>
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  );
};

export default ReportPage;
