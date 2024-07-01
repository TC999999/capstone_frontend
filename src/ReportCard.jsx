import { Link } from "react-router-dom";

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
      <Link
        to={`/reports/messages/${report.reportedUser}/${report.reporterUser}`}
      >
        Check Messages
      </Link>
    </div>
  );
};

export default ReportCard;
