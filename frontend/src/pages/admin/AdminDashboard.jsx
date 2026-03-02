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
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Overview of your movie management system</p>
        </div>

        <div className="card-grid">
          <DashboardCard title="Total Movies" value={summary.totalMovies} icon="🎬" />
          <DashboardCard title="Total Users" value={summary.totalUsers} icon="👥" />
          <DashboardCard title="Total Borrows" value={summary.totalBorrows} icon="📦" />
          <DashboardCard title="Overdue" value={summary.overdueCount} icon="⚠️" />
        </div>
      </div>
    </AdminLayout>
  );
};

const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="dashboard-card">
      <div>
        <p className="card-title">{title}</p>
        <h2 className="card-value">{value || 0}</h2>
      </div>
      <div className="card-icon">{icon}</div>
    </div>
  );
};

export default AdminDashboard;