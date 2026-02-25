import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [borrowLoading, setBorrowLoading] = useState(false);
  const [review, setReview] = useState({ rating: 5, comment: '' });

  const fetchMovie = async () => {
    try {
      const { data } = await API.get(`/movies/${id}`);
      setMovie(data);
    } catch (err) {
      toast.error('Failed to load movie');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await API.get(`/reviews/movie/${id}`);
      setReviews(data);
    } catch (err) {
      console.error('Failed to load reviews');
    }
  };

  useEffect(() => {
    fetchMovie();
    fetchReviews();
  }, [id]);

  const handleBorrow = async () => {
    setBorrowLoading(true);
    try {
      await API.post('/borrows', { movieId: id });
      toast.success('Movie borrowed successfully! Due in 7 days.');
      fetchMovie();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not borrow movie');
    } finally {
      setBorrowLoading(false);
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      await API.post('/reviews', { movieId: id, ...review });
      toast.success('Review submitted!');
      setReview({ rating: 5, comment: '' });
      fetchReviews();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not submit review');
    }
  };

  if (loading) return <p style={styles.message}>Loading...</p>;
  if (!movie) return <p style={styles.message}>Movie not found.</p>;

  return (
    <div style={styles.container}>

      {/* Movie Info */}
      <div style={styles.card}>
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>{movie.title}</h2>
            <p style={styles.sub}>🎬 Directed by {movie.director}</p>
          </div>
          <div style={styles.ratingBadge}>⭐ {movie.rating}</div>
        </div>

        <div style={styles.tagRow}>
          {movie.genre?.map((g, i) => (
            <span key={i} style={styles.tag}>{g}</span>
          ))}
          <span style={styles.tag}>{movie.language}</span>
          <span style={styles.tag}>{movie.releaseYear}</span>
          <span style={styles.tag}>{movie.duration} mins</span>
        </div>

        <p style={styles.synopsis}>{movie.synopsis}</p>

        <p style={styles.cast}>
          <strong>Cast:</strong> {movie.cast?.join(', ')}
        </p>

        <div style={styles.stockRow}>
          <p style={movie.stockQuantity > 0 ? styles.available : styles.unavailable}>
            {movie.stockQuantity > 0
              ? `✅ Available — ${movie.stockQuantity} copies left`
              : '❌ Not Available'}
          </p>
          <button
            style={movie.stockQuantity > 0 ? styles.borrowBtn : styles.disabledBtn}
            onClick={handleBorrow}
            disabled={movie.stockQuantity < 1 || borrowLoading}
          >
            {borrowLoading ? 'Processing...' : '📦 Borrow Movie'}
          </button>
        </div>
      </div>

      {/* Write a Review */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Write a Review</h3>
        <form onSubmit={handleReview}>
          <label style={styles.label}>Rating</label>
          <select
            style={styles.input}
            value={review.rating}
            onChange={e => setReview({ ...review, rating: Number(e.target.value) })}
          >
            <option value={5}>⭐⭐⭐⭐⭐ — 5</option>
            <option value={4}>⭐⭐⭐⭐ — 4</option>
            <option value={3}>⭐⭐⭐ — 3</option>
            <option value={2}>⭐⭐ — 2</option>
            <option value={1}>⭐ — 1</option>
          </select>
          <label style={styles.label}>Comment</label>
          <textarea
            style={styles.textarea}
            placeholder="Share your thoughts about this movie..."
            value={review.comment}
            onChange={e => setReview({ ...review, comment: e.target.value })}
            required
          />
          <button style={styles.borrowBtn} type="submit">Submit Review</button>
        </form>
      </div>

      {/* Reviews List */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>
          Reviews {reviews.length > 0 && `(${reviews.length})`}
        </h3>
        {reviews.length === 0 ? (
          <p style={styles.message}>No reviews yet. Be the first!</p>
        ) : (
          reviews.map((r, i) => (
            <div key={i} style={styles.reviewCard}>
              <div style={styles.reviewTop}>
                <span style={styles.reviewer}>👤 {r.user?.name || 'Member'}</span>
                <span style={styles.reviewRating}>{'⭐'.repeat(r.rating)}</span>
              </div>
              <p style={styles.reviewComment}>{r.comment}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

const styles = {
  container: { padding: '24px 32px', backgroundColor: '#f0f2f5', minHeight: '100vh' },
  card: {
    backgroundColor: '#fff', borderRadius: '12px', padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '24px'
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' },
  title: { fontSize: '24px', color: '#1E3A5F', marginBottom: '4px' },
  sub: { color: '#555', fontSize: '15px' },
  ratingBadge: {
    backgroundColor: '#FEF9E7', color: '#F39C12', fontWeight: 'bold',
    fontSize: '18px', padding: '8px 14px', borderRadius: '8px'
  },
  tagRow: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' },
  tag: {
    backgroundColor: '#EAF4FB', color: '#2980B9',
    padding: '4px 10px', borderRadius: '12px', fontSize: '13px'
  },
  synopsis: { color: '#444', lineHeight: '1.7', marginBottom: '12px' },
  cast: { color: '#555', fontSize: '14px', marginBottom: '16px' },
  stockRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  available: { color: '#1ABC9C', fontWeight: 'bold' },
  unavailable: { color: '#E74C3C', fontWeight: 'bold' },
  borrowBtn: {
    padding: '10px 24px', backgroundColor: '#2980B9',
    color: '#fff', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '15px'
  },
  disabledBtn: {
    padding: '10px 24px', backgroundColor: '#BDC3C7',
    color: '#fff', border: 'none', borderRadius: '8px',
    cursor: 'not-allowed', fontSize: '15px'
  },
  sectionTitle: { color: '#1E3A5F', marginBottom: '16px' },
  label: { display: 'block', fontSize: '14px', color: '#555', marginBottom: '6px' },
  input: {
    width: '100%', padding: '10px', borderRadius: '6px',
    border: '1px solid #ddd', fontSize: '14px',
    marginBottom: '14px', boxSizing: 'border-box'
  },
  textarea: {
    width: '100%', padding: '10px', borderRadius: '6px',
    border: '1px solid #ddd', fontSize: '14px', height: '100px',
    marginBottom: '14px', boxSizing: 'border-box', resize: 'vertical'
  },
  reviewCard: {
    borderBottom: '1px solid #eee', paddingBottom: '14px', marginBottom: '14px'
  },
  reviewTop: { display: 'flex', justifyContent: 'space-between', marginBottom: '6px' },
  reviewer: { fontWeight: 'bold', color: '#1E3A5F', fontSize: '14px' },
  reviewRating: { fontSize: '14px' },
  reviewComment: { color: '#555', fontSize: '14px', lineHeight: '1.6' },
  message: { color: '#888', textAlign: 'center', padding: '20px' }
};