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

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎬 Movie Library</h2>
        <p style={styles.subtitle}>Create a new account</p>
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
            placeholder="Email"
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
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p style={styles.link}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex', justifyContent: 'center',
    alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5'
  },
  card: {
    backgroundColor: '#fff', padding: '40px', borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px'
  },
  title: { textAlign: 'center', marginBottom: '4px', color: '#1E3A5F' },
  subtitle: { textAlign: 'center', color: '#888', marginBottom: '24px' },
  input: {
    width: '100%', padding: '12px', marginBottom: '16px',
    borderRadius: '8px', border: '1px solid #ddd',
    fontSize: '14px', boxSizing: 'border-box'
  },
  button: {
    width: '100%', padding: '12px', backgroundColor: '#2980B9',
    color: '#fff', border: 'none', borderRadius: '8px',
    fontSize: '16px', cursor: 'pointer'
  },
  link: { textAlign: 'center', marginTop: '16px', fontSize: '14px' }
};