import AdminLayout from "../../components/AdminLayout";
import { FaFilm, FaUsers, FaExchangeAlt } from "react-icons/fa";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="card-container">
        <div className="card">
          <FaFilm className="card-icon" />
          <h3>Total Movies</h3>
          <p>0</p>
        </div>

        <div className="card">
          <FaUsers className="card-icon" />
          <h3>Total Members</h3>
          <p>0</p>
        </div>

        <div className="card">
          <FaExchangeAlt className="card-icon" />
          <h3>Active Borrows</h3>
          <p>0</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;