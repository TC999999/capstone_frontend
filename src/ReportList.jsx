import ReportCard from "./ReportCard.jsx";

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
                <ReportCard report={report} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ReportList;
