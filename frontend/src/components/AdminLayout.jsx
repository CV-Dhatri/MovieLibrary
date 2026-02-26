
import "./AdminLayout.css";
import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      
      <div className="sidebar">
        <h2 className="logo">🎬 Movie Admin</h2>

        <ul>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/movies">Manage Movies</Link></li>
          <li><Link to="/admin/members">Manage Members</Link></li>
          <li><Link to="/admin/borrows">Borrows</Link></li>
          <li><Link to="/admin/reports">Reports</Link></li>
        </ul>
      </div>

      <div className="main-content">
        {children}
      </div>

    </div>
  );
};

export default AdminLayout;