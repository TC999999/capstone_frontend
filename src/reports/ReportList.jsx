import { Link } from "react-router-dom";
import "../styles/ReportList.css";

const ReportList = ({ reports }) => {
  return (
    <div className="report-list-page-div">
      {!reports.length ? (
        <p>All reports cleared!</p>
      ) : (
        <div className="report-list-div">
          {reports.map((report) => {
            return (
              <div className="report-list-item" key={`report-${report.id}`}>
                <Link to={`/reports/${report.id}`}>
                  Report on {report.reportedUser} by {report.reporterUser}
                </Link>
                <p>
                  <small>Made At: {report.madeAt}</small>
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReportList;
