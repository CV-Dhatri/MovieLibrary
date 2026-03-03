import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import API from "../../api/axios";
import "./ManageMembers.css";
const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await API.get("/users/all");
      setMembers(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // ✅ Toggle Block / Unblock (using status field)
  const toggleBlock = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "blocked" : "active";

      await API.patch(`/users/${id}/toggle-status`);

      fetchMembers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <AdminLayout>
    <div className="members-page">
      <div className="members-card">

        <h2 className="members-title">Manage Members</h2>

        {loading && <p>Loading members...</p>}

        <table className="members-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr key={member._id}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>

                <td>
                  <span
                    className={
                      member.status === "blocked"
                        ? "status-blocked"
                        : "status-active"
                    }
                  >
                    {member.status === "blocked"
                      ? "Blocked"
                      : "Active"}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() =>
                      toggleBlock(member._id, member.status)
                    }
                    className={
                      member.status === "blocked"
                        ? "unblock-btn"
                        : "block-btn"
                    }
                  >
                    {member.status === "blocked"
                      ? "Unblock"
                      : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  </AdminLayout>
);
};

export default ManageMembers;