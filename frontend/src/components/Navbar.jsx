import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>🎬 Movie Library</div>
      <div style={styles.links}>
        <Link style={styles.link} to="/home">Browse Movies</Link>
        <Link style={styles.link} to="/watchlist">Watchlist</Link>
        <Link style={styles.link} to="/borrow-history">My Borrows</Link>
      </div>
      <div style={styles.right}>
        <span style={styles.welcome}>Hi, {user.name} 👋</span>
        <button style={styles.button} onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 32px', backgroundColor: '#1E3A5F',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  },
  logo: {
    color: '#fff', fontWeight: 'bold', fontSize: '20px'
  },
  links: {
    display: 'flex', gap: '24px'
  },
  link: {
    color: '#AED6F1', textDecoration: 'none', fontSize: '15px'
  },
  right: {
    display: 'flex', alignItems: 'center', gap: '16px'
  },
  welcome: {
    color: '#fff', fontSize: '14px'
  },
  button: {
    padding: '8px 16px', backgroundColor: '#E74C3C',
    color: '#fff', border: 'none', borderRadius: '6px',
    cursor: 'pointer', fontSize: '14px'
  }
};