import { Link } from "react-router-dom";
import "../styles/ReportCard.css";

const ReportCard = ({ report }) => {
  return (
    <div className="report-card">
      <h3>
        Report On{" "}
        <Link to={`/users/${report.reportedUser}`}>{report.reportedUser}</Link>
      </h3>
      <ul>
        <li>
          <b>Made by: </b>
          <Link to={`/users/${report.reporterUser}`}>
            {report.reporterUser}
          </Link>{" "}
        </li>
        <li>
          <b>Report Body: </b>
          {report.body}
        </li>
        <li>
          <b>Made at: </b>
          {report.madeAt}
        </li>
      </ul>
    </div>
  );
};

export default ReportCard;
