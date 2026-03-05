import { useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const { data } = await API.post('/auth/login', form);

    login(data.user, data.token);
    toast.success('Welcome back!');

    if (data.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/home");
    }

  } catch (err) {
    toast.error('Invalid email or password');
  } finally {
    setLoading(false);
  }
};

  // Movie posters grid (using public poster images)
  const posters = [
    'https://image.tmdb.org/t/p/w300/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    'https://image.tmdb.org/t/p/w300/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    'https://image.tmdb.org/t/p/w300/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
    'https://image.tmdb.org/t/p/w300/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    'https://image.tmdb.org/t/p/w300/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    'https://image.tmdb.org/t/p/w300/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg',
    'https://image.tmdb.org/t/p/w300/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    'https://image.tmdb.org/t/p/w300/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    'https://image.tmdb.org/t/p/w300/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    'https://image.tmdb.org/t/p/w300/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
    'https://image.tmdb.org/t/p/w300/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    'https://image.tmdb.org/t/p/w300/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    'https://image.tmdb.org/t/p/w300/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg',
    'https://image.tmdb.org/t/p/w300/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
  ];

  return (
    <div style={styles.page}>

      {/* ── Poster Grid Background ── */}
      <div style={styles.posterGrid}>
        {posters.map((src, i) => (
          <img key={i} src={src} alt="" style={styles.poster}
            onError={e => { e.target.style.backgroundColor = '#1a1a2e'; e.target.src = ''; }}
          />
        ))}
      </div>

      {/* ── Dark Overlay ── */}
      <div style={styles.overlay} />

      {/* ── Centered Content ── */}
      <div style={styles.center}>

        {/* Logo */}
        <div style={styles.logo}>🎬 Movie Library</div>

        {/* Headline */}
        <h1 style={styles.headline}>
          Unlimited movies,<br />borrow anytime.
        </h1>
        <p style={styles.subheadline}>
          Join thousands of members borrowing movies every day.
        </p>

        {/* Login Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Sign In</h2>

          <form onSubmit={handleSubmit}>
            <input
              style={styles.input}
              type="email"
              placeholder="Email address"
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
            <button
  style={loading ? styles.btnDisabled : styles.btn}
  onMouseEnter={(e)=>{
    if(!loading){
      e.target.style.transform="translateY(-2px)";
      e.target.style.boxShadow="0 8px 18px rgba(0,0,0,0.45)";
    }
  }}
  onMouseLeave={(e)=>{
    if(!loading){
      e.target.style.transform="translateY(0)";
      e.target.style.boxShadow="0 4px 14px rgba(0,0,0,0.35)";
    }
  }}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <p style={styles.registerText}>
            New to Movie Library?{' '}
            <Link to="/register" style={styles.registerLink}>
              Create an account
            </Link>
          </p>
        </div>

        {/* Feature Pills */}
        <div style={styles.pills}>
          <span style={styles.pill}>🎥 1000+ Movies</span>
          <span style={styles.pill}>📦 Borrow up to 3</span>
          <span style={styles.pill}>⭐ Rate & Review</span>
          <span style={styles.pill}>🔔 Due Reminders</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
    overflow: 'hidden',
    fontFamily: "'Segoe UI', sans-serif",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Poster Grid ──
  posterGrid: {
    position: 'absolute',
    top: 0, left: 0,
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    gap: '4px',
    transform: 'scale(1.05)',
    zIndex: 0,
  },
  posterWrapper: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: '#1a1a2e',
  },
  poster: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.6)',
  },
  // ── Overlay ──
  overlay: {
    position: 'absolute',
    top: 0, left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.92) 100%)',
    zIndex: 1,
  },

  // ── Center Content ──
  center: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
    width: '100%',
    maxWidth: '560px',
  },

  logo: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#2980B9',
    letterSpacing: '1px',
    marginBottom: '32px',
    textTransform: 'uppercase',
  },

  headline: {
    fontSize: '42px',
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    lineHeight: '1.2',
    marginBottom: '12px',
    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
  },

  subheadline: {
    fontSize: '16px',
    color: '#ccc',
    textAlign: 'center',
    marginBottom: '32px',
  },

  // ── Card ──
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    padding: '40px 36px',
    width: '100%',
    marginBottom: '28px',
  },

  cardTitle: {
    color: '#fff',
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '24px',
  },

  input: {
    width: '100%',
    padding: '14px 16px',
    marginBottom: '14px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  },

  btn:{
  width:"100%",
  padding:"13px",
  background:"linear-gradient(135deg,#2980B9,#3498DB)",
  color:"#fff",
  border:"none",
  borderRadius:"8px",
  fontSize:"15px",
  fontWeight:"700",
  cursor:"pointer",
  marginTop:"4px",
  transition:"all 0.25s ease",
  boxShadow:"0 4px 14px rgba(0,0,0,0.35)"
},

  btnDisabled:{
    width: '100%',
    padding: '14px',
    backgroundColor: '#1a5276',
    color: '#aaa',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'not-allowed',
    marginTop: '4px',
  },

  registerText: {
    color: '#aaa',
    fontSize: '14px',
    textAlign: 'center',
    marginTop: '20px',
  },

  registerLink: {
    color: '#2980B9',
    fontWeight: '600',
    textDecoration: 'none',
  },

  // ── Pills ──
  pills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
  },

  pill: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '13px',
  },
};