import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function BorrowHistory() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await API.get('/borrows/my-history');
        setBorrows(data);
      } catch (err) {
        console.error('Failed to fetch borrow history');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const getStatusStyle = (status) => {
    if (status === 'borrowed') return styles.statusBorrowed;
    if (status === 'returned') return styles.statusReturned;
    if (status === 'overdue') return styles.statusOverdue;
  };

  const getStatusLabel = (status) => {
    if (status === 'borrowed') return '📦 Borrowed';
    if (status === 'returned') return '✅ Returned';
    if (status === 'overdue') return '⚠️ Overdue';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Borrow History</h2>

      {loading ? (
        <p style={styles.message}>Loading...</p>
      ) : borrows.length === 0 ? (
        <p style={styles.message}>You haven't borrowed any movies yet.</p>
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
              </tr>
            </thead>
            <tbody>
              {borrows.map((b, i) => (
                <tr key={i} style={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  <td style={styles.td}>{b.movie?.title || '—'}</td>
                  <td style={styles.td}>{b.movie?.genre?.[0] || '—'}</td>
                  <td style={styles.td}>{formatDate(b.borrowDate)}</td>
                  <td style={styles.td}>{formatDate(b.dueDate)}</td>
                  <td style={styles.td}>{formatDate(b.returnDate)}</td>
                  <td style={styles.td}>
                    <span style={getStatusStyle(b.status)}>
                      {getStatusLabel(b.status)}
                    </span>
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
  container: { padding: '24px 32px', backgroundColor: '#f0f2f5', minHeight: '100vh' },
  heading: { color: '#1E3A5F', marginBottom: '24px' },
  message: { textAlign: 'center', color: '#888', marginTop: '60px', fontSize: '16px' },
  tableWrapper: {
    backgroundColor: '#fff', borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden'
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { backgroundColor: '#1E3A5F' },
  th: {
    padding: '14px 16px', color: '#fff',
    textAlign: 'left', fontSize: '14px', fontWeight: 'bold'
  },
  td: { padding: '12px 16px', fontSize: '14px', color: '#333' },
  rowEven: { backgroundColor: '#fff' },
  rowOdd: { backgroundColor: '#F8F9FA' },
  statusBorrowed: {
    backgroundColor: '#EAF4FB', color: '#2980B9',
    padding: '4px 10px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold'
  },
  statusReturned: {
    backgroundColor: '#E8F8F5', color: '#1ABC9C',
    padding: '4px 10px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold'
  },
  statusOverdue: {
    backgroundColor: '#FDEDEC', color: '#E74C3C',
    padding: '4px 10px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold'
  }
};