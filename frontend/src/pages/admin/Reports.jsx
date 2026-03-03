import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import API from "../../api/axios";
import "./Reports.css";
const Reports = () => {
  const [summary, setSummary] = useState({});
  const [mostBorrowed, setMostBorrowed] = useState([]);
  const [activeMembers, setActiveMembers] = useState([]);
  const [overdue, setOverdue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const summaryRes = await API.get("/reports/summary");
      const mostRes = await API.get("/reports/most-borrowed");
      const activeRes = await API.get("/reports/active-members");
      const overdueRes = await API.get("/reports/overdue");

      setSummary(summaryRes.data.data);
      setMostBorrowed(mostRes.data.data);
      setActiveMembers(activeRes.data.data);
      setOverdue(overdueRes.data.data);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading reports...</p>;

  return (
  <AdminLayout>
    <div className="reports-page">
      <div className="reports-card">

        <h2 className="reports-title">Reports</h2>

        {/* Summary */}
        <div className="summary-grid">
          <div className="summary-box">
            <h3>Total Movies</h3>
            <p>{summary.totalMovies || 0}</p>
          </div>

          <div className="summary-box">
            <h3>Total Users</h3>
            <p>{summary.totalUsers || 0}</p>
          </div>

          <div className="summary-box">
            <h3>Total Borrows</h3>
            <p>{summary.totalBorrows || 0}</p>
          </div>

          <div className="summary-box">
            <h3>Overdue</h3>
            <p style={{ color: "#dc2626" }}>
              {summary.overdueCount || 0}
            </p>
          </div>
        </div>

        {/* Most Borrowed */}
        <div className="section-card">
          <h3>Most Borrowed Movies</h3>
          {mostBorrowed.length === 0 ? (
            <p>No borrow data available.</p>
          ) : (
            mostBorrowed.map((movie) => (
              <p key={movie._id}>
                {movie.title} — {movie.borrowCount} borrows
              </p>
            ))
          )}
        </div>

        {/* Active Members */}
        <div className="section-card">
          <h3>Active Members</h3>
          {activeMembers.length === 0 ? (
            <p>No active members data.</p>
          ) : (
            activeMembers.map((user) => (
              <p key={user._id}>
                {user.name} — {user.borrowCount} borrows
              </p>
            ))
          )}
        </div>

        {/* Overdue */}
        <div className="section-card">
          <h3 className="overdue-title">Overdue Records</h3>
          {overdue.length === 0 ? (
            <p>No overdue records.</p>
          ) : (
            overdue.map((b) => (
              <p key={b._id}>
                {b.user?.name} — {b.movie?.title}
              </p>
            ))
          )}
        </div>

      </div>
    </div>
  </AdminLayout>
);
};

export default Reports;