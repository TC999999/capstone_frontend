import { Link } from "react-router-dom";

const ReportList = ({ reports }) => {
  return (
    <div className="report-list-div">
      {!reports.length ? (
        <p>All reports cleared!</p>
      ) : (
        <ul>
          {reports.map((report) => {
            return (
              <li key={`report-${report.id}`}>
                <Link to={`/reports/${report.id}`}>
                  Report on {report.reportedUser} by {report.reporterUser}
                </Link>
                <p>
                  <small>Made At: {report.madeAt}</small>
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ReportList;
