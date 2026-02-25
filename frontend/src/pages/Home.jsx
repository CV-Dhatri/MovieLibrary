import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    title: '', genre: '', language: '', releaseYear: '', rating: ''
  });
  const navigate = useNavigate();

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '')
      );
      const { data } = await API.get('/movies', { params });
      setMovies(data);
    } catch (err) {
      console.error('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Browse Movies</h2>

      {/* Search & Filter Bar */}
      <form onSubmit={handleSearch} style={styles.filterBar}>
        <input
          style={styles.input}
          placeholder="Search by title..."
          onChange={e => setFilters({ ...filters, title: e.target.value })}
        />
        <select
          style={styles.input}
          onChange={e => setFilters({ ...filters, genre: e.target.value })}
        >
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Horror">Horror</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Romance">Romance</option>
        </select>
        <select
          style={styles.input}
          onChange={e => setFilters({ ...filters, language: e.target.value })}
        >
          <option value="">All Languages</option>
          <option value="English">English</option>
          <option value="Tamil">Tamil</option>
          <option value="Hindi">Hindi</option>
          <option value="French">French</option>
        </select>
        <input
          style={styles.input}
          placeholder="Year e.g. 2023"
          onChange={e => setFilters({ ...filters, releaseYear: e.target.value })}
        />
        <select
          style={styles.input}
          onChange={e => setFilters({ ...filters, rating: e.target.value })}
        >
          <option value="">Any Rating</option>
          <option value="3">3+ ⭐</option>
          <option value="4">4+ ⭐</option>
          <option value="5">5 ⭐</option>
        </select>
        <button style={styles.button} type="submit">Search</button>
      </form>

      {/* Movie Grid */}
      {loading ? (
        <p style={styles.message}>Loading movies...</p>
      ) : movies.length === 0 ? (
        <p style={styles.message}>No movies found.</p>
      ) : (
        <div style={styles.grid}>
          {movies.map(movie => (
            <div
              key={movie._id}
              style={styles.card}
              onClick={() => navigate(`/movies/${movie._id}`)}
            >
              <div style={styles.cardTop}>
                <span style={styles.genre}>{movie.genre?.[0] || 'General'}</span>
                <span style={styles.rating}>⭐ {movie.rating}</span>
              </div>
              <h3 style={styles.title}>{movie.title}</h3>
              <p style={styles.director}>🎬 {movie.director}</p>
              <p style={styles.info}>{movie.language} · {movie.releaseYear}</p>
              <p style={movie.stockQuantity > 0 ? styles.available : styles.unavailable}>
                {movie.stockQuantity > 0 ? `✅ Available (${movie.stockQuantity})` : '❌ Not Available'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '24px 32px', backgroundColor: '#f0f2f5', minHeight: '100vh' },
  heading: { color: '#1E3A5F', marginBottom: '20px' },
  filterBar: {
    display: 'flex', flexWrap: 'wrap', gap: '12px',
    marginBottom: '28px', backgroundColor: '#fff',
    padding: '16px', borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  input: {
    padding: '10px', borderRadius: '6px', border: '1px solid #ddd',
    fontSize: '14px', flex: '1', minWidth: '140px'
  },
  button: {
    padding: '10px 24px', backgroundColor: '#2980B9',
    color: '#fff', border: 'none', borderRadius: '6px',
    cursor: 'pointer', fontSize: '14px'
  },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px'
  },
  card: {
    backgroundColor: '#fff', borderRadius: '10px', padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  cardTop: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' },
  genre: { fontSize: '12px', backgroundColor: '#EAF4FB', color: '#2980B9', padding: '2px 8px', borderRadius: '12px' },
  rating: { fontSize: '13px', color: '#F39C12' },
  title: { fontSize: '16px', color: '#1E3A5F', marginBottom: '6px' },
  director: { fontSize: '13px', color: '#555', marginBottom: '4px' },
  info: { fontSize: '12px', color: '#888', marginBottom: '8px' },
  available: { fontSize: '13px', color: '#1ABC9C', fontWeight: 'bold' },
  unavailable: { fontSize: '13px', color: '#E74C3C', fontWeight: 'bold' },
  message: { textAlign: 'center', color: '#888', marginTop: '60px', fontSize: '16px' }
};