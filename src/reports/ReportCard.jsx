import { Link } from "react-router-dom";
import "../styles/ReportCard.css";

const ReportCard = ({ report }) => {
  return (
    <div className="report">
      <h3>
        Report On{" "}
        <Link to={`/users/${report.reportedUser}`}>{report.reportedUser}</Link>
      </h3>
      <ul>
        <li>
          Made By:{" "}
          <Link to={`/users/${report.reporterUser}`}>
            {report.reporterUser}
          </Link>{" "}
        </li>
        <li>Report Body: {report.body}</li>
        <li>Made at: {report.madeAt}</li>
      </ul>
    </div>
  );
};

export default ReportCard;
