import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import "./AdminDashboard.css";
import API from "../../api/axios";

const AdminDashboard = () => {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await API.get("/reports/summary");
      setSummary(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="dashboard-container center">
          <h2 className="loading">Loading dashboard...</h2>
        </div>
      </AdminLayout>
    );
  }

  return (
  <AdminLayout>
    <div className="dashboard-page">
      <div className="dashboard-card">

        <h2 className="dashboard-title">Admin Dashboard</h2>

        <div className="dashboard-grid">

          <div className="stat-box">
            <div className="stat-icon">🎬</div>
            <div className="stat-label">Total Movies</div>
            <div className="stat-value">
              {summary.totalMovies || 0}
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon">👥</div>
            <div className="stat-label">Total Users</div>
            <div className="stat-value">
              {summary.totalUsers || 0}
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon">📦</div>
            <div className="stat-label">Total Borrows</div>
            <div className="stat-value">
              {summary.totalBorrows || 0}
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon">⚠️</div>
            <div className="stat-label">Overdue</div>
            <div className="stat-value" style={{ color: "#dc2626" }}>
              {summary.overdueCount || 0}
            </div>
          </div>

        </div>

      </div>
    </div>
  </AdminLayout>
);
};

export default AdminDashboard;