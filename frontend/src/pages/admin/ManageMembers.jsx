import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import API from "../../api/axios";

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
      <h2 className="text-2xl font-bold mb-6">Manage Members</h2>

      {loading && <p>Loading members...</p>}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr key={member._id} className="border-t">
                <td className="px-6 py-4">{member.name}</td>
                <td className="px-6 py-4">{member.email}</td>
                <td className="px-6 py-4">{member.role}</td>

                <td className="px-6 py-4">
                  {member.status === "blocked" ? "Blocked" : "Active"}
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      toggleBlock(member._id, member.status)
                    }
                    className={`px-3 py-1 rounded text-white ${
                      member.status === "blocked"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
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
    </AdminLayout>
  );
};

export default ManageMembers;