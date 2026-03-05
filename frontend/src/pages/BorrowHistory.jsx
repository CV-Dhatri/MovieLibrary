import { useState, useEffect } from "react";
import API from "../api/axios";

export default function BorrowHistory() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [returningId, setReturningId] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await API.get("/borrows/my-history");
      setBorrows(data.data || []);
    } catch (err) {
      setError("Failed to fetch borrow history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const returnMovie = async (borrowId) => {
    setReturningId(borrowId);
    try {
      await API.put("/borrows/" + borrowId + "/return");
      await fetchHistory();
    } catch (err) {
      setError("Failed to return movie. Please try again.");
    } finally {
      setReturningId(null);
    }
  };

  const getStatusStyle = (status) => {
    if (status === "borrowed") return styles.statusBorrowed;
    if (status === "returned") return styles.statusReturned;
    if (status === "overdue") return styles.statusOverdue;
    return {};
  };

  const getStatusLabel = (status) => {
    if (status === "borrowed") return "Borrowed";
    if (status === "returned") return "Returned";
    if (status === "overdue") return "Overdue";
    return status;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatGenre = (genre) => {
    if (!genre) return "-";
    if (Array.isArray(genre)) return genre.join(", ") || "-";
    return genre;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Borrow History</h2>

      {error && <p style={styles.errorMessage}>{error}</p>}

      {loading ? (
        <p style={styles.message}>Loading...</p>
      ) : borrows.length === 0 ? (
        <p style={styles.message}>You have not borrowed any movies yet.</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Movie</th>
                <th style={styles.th}>Genre</th>
                <th style={styles.th}>Borrowed On</th>
                <th style={styles.th}>Due Date</th>
                <th style={styles.th}>Returned On</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {borrows.map((b, i) => (
                <tr key={b._id} style={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  <td style={styles.td}>{b.movie ? b.movie.title : "-"}</td>
                  <td style={styles.td}>{b.movie ? formatGenre(b.movie.genre) : "-"}</td>
                  <td style={styles.td}>{formatDate(b.borrowDate)}</td>
                  <td style={styles.td}>{formatDate(b.dueDate)}</td>
                  <td style={styles.td}>{formatDate(b.returnDate)}</td>
                  <td style={styles.td}>
                    <span style={getStatusStyle(b.status)}>
                      {getStatusLabel(b.status)}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {(b.status === "borrowed" || b.status === "overdue") ? (
                      <button
                        onClick={() => returnMovie(b._id)}
                        disabled={returningId === b._id}
                        style={returningId === b._id ? Object.assign({}, styles.returnBtn, styles.returnBtnDisabled) : styles.returnBtn}
                      >
                        {returningId === b._id ? "Returning..." : "Return"}
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "24px 32px",
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
  },
  heading: {
    color: "#1E3A5F",
    marginBottom: "24px",
  },
  message: {
    textAlign: "center",
    color: "#888",
    marginTop: "60px",
    fontSize: "16px",
  },
  errorMessage: {
    textAlign: "center",
    color: "#E74C3C",
    backgroundColor: "#FDEDEC",
    padding: "10px 16px",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "14px",
  },
  tableWrapper: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#1E3A5F",
  },
  th: {
    padding: "14px 16px",
    color: "#fff",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "bold",
  },
  td: {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#333",
  },
  rowEven: {
    backgroundColor: "#fff",
  },
  rowOdd: {
    backgroundColor: "#F8F9FA",
  },
  statusBorrowed: {
    backgroundColor: "#EAF4FB",
    color: "#2980B9",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "bold",
  },
  statusReturned: {
    backgroundColor: "#E8F8F5",
    color: "#1ABC9C",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "bold",
  },
  statusOverdue: {
    backgroundColor: "#FDEDEC",
    color: "#E74C3C",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "bold",
  },
  returnBtn: {
    backgroundColor: "#1E3A5F",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  returnBtnDisabled: {
    backgroundColor: "#7f8c8d",
    cursor: "not-allowed",
    opacity: 0.7,
  },
};