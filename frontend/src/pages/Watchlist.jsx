import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchWatchlist = async () => {
    try {
      const { data } = await API.get('/watchlist');
      setWatchlist(data);
    } catch (err) {
      console.error('Failed to fetch watchlist');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const handleRemove = async (movieId) => {
    try {
      await API.delete(`/watchlist/${movieId}`);
      toast.success('Removed from watchlist');
      fetchWatchlist();
    } catch (err) {
      toast.error('Could not remove movie');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Watchlist</h2>

      {loading ? (
        <p style={styles.message}>Loading...</p>
      ) : watchlist.length === 0 ? (
        <div style={styles.emptyBox}>
          <p style={styles.emptyText}>Your watchlist is empty.</p>
          <button style={styles.browseBtn} onClick={() => navigate('/home')}>
            Browse Movies
          </button>
        </div>
      ) : (
        <div style={styles.grid}>
          {watchlist.map((item, i) => (
            <div key={i} style={styles.card}>
              <div style={styles.cardTop}>
                <span style={styles.genre}>
                  {item.movie?.genre?.[0] || 'General'}
                </span>
                <span style={styles.rating}>⭐ {item.movie?.rating}</span>
              </div>
              <h3 style={styles.title}>{item.movie?.title}</h3>
              <p style={styles.director}>🎬 {item.movie?.director}</p>
              <p style={styles.info}>
                {item.movie?.language} · {item.movie?.releaseYear}
              </p>
              <p style={item.movie?.stockQuantity > 0 ? styles.available : styles.unavailable}>
                {item.movie?.stockQuantity > 0 ? '✅ Available' : '❌ Not Available'}
              </p>
              <div style={styles.btnRow}>
                <button
                  style={styles.viewBtn}
                  onClick={() => navigate(`/movies/${item.movie?._id}`)}
                >
                  View Details
                </button>
                <button
                  style={styles.removeBtn}
                  onClick={() => handleRemove(item.movie?._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '24px 32px', backgroundColor: '#f0f2f5', minHeight: '100vh' },
  heading: { color: '#1E3A5F', marginBottom: '24px' },
  message: { textAlign: 'center', color: '#888', marginTop: '60px', fontSize: '16px' },
  emptyBox: { textAlign: 'center', marginTop: '80px' },
  emptyText: { color: '#888', fontSize: '16px', marginBottom: '16px' },
  browseBtn: {
    padding: '10px 24px', backgroundColor: '#2980B9',
    color: '#fff', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '15px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px'
  },
  card: {
    backgroundColor: '#fff', borderRadius: '10px', padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  cardTop: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' },
  genre: {
    fontSize: '12px', backgroundColor: '#EAF4FB',
    color: '#2980B9', padding: '2px 8px', borderRadius: '12px'
  },
  rating: { fontSize: '13px', color: '#F39C12' },
  title: { fontSize: '16px', color: '#1E3A5F', marginBottom: '6px' },
  director: { fontSize: '13px', color: '#555', marginBottom: '4px' },
  info: { fontSize: '12px', color: '#888', marginBottom: '8px' },
  available: { fontSize: '13px', color: '#1ABC9C', fontWeight: 'bold', marginBottom: '12px' },
  unavailable: { fontSize: '13px', color: '#E74C3C', fontWeight: 'bold', marginBottom: '12px' },
  btnRow: { display: 'flex', gap: '8px' },
  viewBtn: {
    flex: 1, padding: '8px', backgroundColor: '#2980B9',
    color: '#fff', border: 'none', borderRadius: '6px',
    cursor: 'pointer', fontSize: '13px'
  },
  removeBtn: {
    flex: 1, padding: '8px', backgroundColor: '#FDEDEC',
    color: '#E74C3C', border: '1px solid #E74C3C', borderRadius: '6px',
    cursor: 'pointer', fontSize: '13px'
  }
};