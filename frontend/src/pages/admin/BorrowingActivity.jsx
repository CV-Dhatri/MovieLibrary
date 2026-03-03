import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import "./BorrowingActivity.css";
import API from "../../api/axios";

const BorrowingActivity = () => {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOverdueOnly, setShowOverdueOnly] = useState(false);

  useEffect(() => {
    fetchBorrows();
  }, []);

  const fetchBorrows = async () => {
    try {
      const res = await API.get("/borrows/all");
      setBorrows(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const filteredBorrows = showOverdueOnly
    ? borrows.filter((b) => b.status === "overdue")
    : borrows;

  return (
    <AdminLayout>
      <div className="borrow-page">
        <div className="borrow-card">
          <h2 className="borrow-title">Borrowing Activity</h2>

          <button
            onClick={() => setShowOverdueOnly(!showOverdueOnly)}
            className="borrow-btn"
          >
            {showOverdueOnly ? "Show All Records" : "Show Overdue Only"}
          </button>

          {loading && <p className="loading-text">Loading borrow records...</p>}

          {!loading && (
            <div className="table-wrapper">
              <table className="borrow-table">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Movie</th>
                    <th>Borrow Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBorrows.map((borrow) => (
                    <tr key={borrow._id}>
                      <td>{borrow.user?.name}</td>
                      <td>{borrow.movie?.title}</td>
                      <td>
                        {new Date(borrow.borrowDate).toLocaleDateString()}
                      </td>
                      <td>
                        {new Date(borrow.dueDate).toLocaleDateString()}
                      </td>
                      <td className={`status ${borrow.status}`}>
                        {borrow.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default BorrowingActivity;