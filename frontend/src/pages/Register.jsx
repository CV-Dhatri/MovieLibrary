import { useState } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    securityQuestion: '',
    securityAnswer: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/auth/register', { ...form, role: 'member' });
      toast.success('Account created! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error('Registration failed. Email may already be taken.');
    } finally {
      setLoading(false);
    }
  };

  const posters = [
    'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVlLTM5YTUtZmNhODY1NmM5YWFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BMTM2MTI3OTM5NV5BMl5BanBnXkFtZTcwOTM2OTM2Mw@@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODM2NDIyOQ@@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BNjg5YTQ0MDItZTFjZS00YTI5LWIwYTMtYWRlYzQzMmI2Y2Q0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BOTgwMzFiMWYtOGYzOS00OWVjLTkwZDMtMmNhNjA3OTg0MjQ4XkEyXkFqcGdeQXVyMjMwNDgzNjc@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BMTg4MDk1ODExN15BMl5BanBnXkFtZTgwNzY2MTMxMDE@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BMTQ0OTM4NTM1NF5BMl5BanBnXkFtZTgwMTExNzg3NTE@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BMTM2OTkzMTcyMV5BMl5BanBnXkFtZTcwNTM2NzYyMQ@@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BMjIyOTM5OTIzNV5BMl5BanBnXkFtZTcwNjAyMzQyMQ@@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BMjA5NTE4NTE5NV5BMl5BanBnXkFtZTcwMTcyOTY5Mw@@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BMjIzOTgxMTYtZDYyNS00OGQ0LWJlNjAtNjI2ZDIxMjIyNzYzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BMjMyOTE4NjItNTUwMS00ODQxLTllNTMtNTQ5NTM1OGZlOTYwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGM2NTg5XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtNzU1MGQ3NA@@._V1_SX300.jpg',
  ];

  return (
    <div style={styles.page}>
      {/* Poster Grid Background */}
      <div style={styles.posterGrid}>
        {posters.map((src, i) => (
          <div key={i} style={styles.posterWrapper}>
            <img
              src={src}
              alt=""
              style={styles.poster}
              onError={e => {
                e.target.style.display = 'none';
                e.target.parentNode.style.backgroundColor = [
                  '#1a1a2e','#16213e','#0f3460','#1b262c',
                  '#2c3e50','#1a252f','#212f3d','#1c2833'
                ][i % 8];
              }}
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div style={styles.overlay} />

      {/* Centered Content */}
      <div style={styles.center}>
        <div style={styles.logo}>🎬 Movie Library</div>
        <h1 style={styles.headline}>Start borrowing<br />movies today.</h1>
        <p style={styles.subheadline}>Create your free account in seconds.</p>

        {/* Register Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <input
              style={styles.input}
              type="text"
              placeholder="Full Name"
              required
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
              style={styles.input}
              type="email"
              placeholder="Email Address"
              required
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              required
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <select
              style={styles.input}
              required
              onChange={e => setForm({ ...form, securityQuestion: e.target.value })}
            >
              <option value="">-- Select a Security Question --</option>
              <option value="pet">What is your pet's name?</option>
              <option value="city">What city were you born in?</option>
              <option value="school">What was your first school's name?</option>
            </select>
            <input
              style={styles.input}
              type="text"
              placeholder="Your Answer"
              required
              onChange={e => setForm({ ...form, securityAnswer: e.target.value })}
            />
            <button
              style={loading ? styles.btnDisabled : styles.btn}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account →'}
            </button>
          </form>

          <p style={styles.loginText}>
            Already have an account?{' '}
            <Link to="/login" style={styles.loginLink}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: 'relative', minHeight: '100vh',
    width: '100%', overflow: 'hidden',
    fontFamily: "'Segoe UI', sans-serif",
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  posterGrid: {
    position: 'absolute', top: 0, left: 0,
    width: '100%', height: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    gap: '4px', transform: 'scale(1.05)', zIndex: 0,
  },
  posterWrapper: { width: '100%', height: '100%', overflow: 'hidden', backgroundColor: '#1a1a2e' },
  poster: { width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' },
  overlay: {
    position: 'absolute', top: 0, left: 0,
    width: '100%', height: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.92) 100%)',
    zIndex: 1,
  },
  center: {
    position: 'relative', zIndex: 2,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', padding: '40px 20px',
    width: '100%', maxWidth: '520px',
  },
  logo: {
    fontSize: '22px', fontWeight: '800',
    color: '#2980B9', letterSpacing: '1px',
    marginBottom: '24px', textTransform: 'uppercase',
  },
  headline: {
    fontSize: '38px', fontWeight: '800',
    color: '#fff', textAlign: 'center',
    lineHeight: '1.2', marginBottom: '10px',
    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
  },
  subheadline: {
    fontSize: '16px', color: '#ccc',
    textAlign: 'center', marginBottom: '28px',
  },
  card: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px', padding: '36px',
    width: '100%', marginBottom: '20px',
  },
  cardTitle: {
    color: '#fff', fontSize: '22px',
    fontWeight: '700', marginBottom: '20px',
  },
  input: {
    width: '100%', padding: '13px 16px',
    marginBottom: '12px', borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff', fontSize: '14px',
    outline: 'none', boxSizing: 'border-box',
  },
  btn: {
    width: '100%', padding: '13px',
    backgroundColor: '#2980B9', color: '#fff',
    border: 'none', borderRadius: '8px',
    fontSize: '15px', fontWeight: '700',
    cursor: 'pointer', marginTop: '4px',
  },
  btnDisabled: {
    width: '100%', padding: '13px',
    backgroundColor: '#1a5276', color: '#aaa',
    border: 'none', borderRadius: '8px',
    fontSize: '15px', fontWeight: '700',
    cursor: 'not-allowed', marginTop: '4px',
  },
  loginText: {
    color: '#aaa', fontSize: '14px',
    textAlign: 'center', marginTop: '16px',
  },
  loginLink: {
    color: '#2980B9', fontWeight: '600', textDecoration: 'none',
  },
};