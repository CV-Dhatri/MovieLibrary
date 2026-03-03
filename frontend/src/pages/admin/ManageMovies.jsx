import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import API from "../../api/axios";
import "./ManageMovies.css";

const ManageMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    genre: "",
    stockQuantity: "",
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await API.get("/movies");
      setMovies(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/movies/${editingId}`, form);
      } else {
        await API.post("/movies", form);
      }

      setForm({ title: "", genre: "", stockQuantity: "" });
      setEditingId(null);
      fetchMovies();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (movie) => {
    setForm({
      title: movie.title,
      genre: movie.genre,
      stockQuantity: movie.stockQuantity,
    });
    setEditingId(movie._id);
  };

  const deleteMovie = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/movies/${id}`);
      fetchMovies();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg font-semibold text-indigo-600 animate-pulse">
            Loading movies...
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
  <AdminLayout>
    <div className="manage-page">
      <div className="manage-card">

        <h2 className="manage-title">Manage Movies</h2>

        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              required
            />

            <input
              type="text"
              placeholder="Genre"
              value={form.genre}
              onChange={(e) =>
                setForm({ ...form, genre: e.target.value })
              }
              required
            />

            <input
              type="number"
              placeholder="Stock"
              value={form.stockQuantity}
              onChange={(e) =>
                setForm({ ...form, stockQuantity: e.target.value })
              }
              required
            />

            <button type="submit">
              {editingId ? "Update Movie" : "Add Movie"}
            </button>
          </form>
        </div>

        {movies.length === 0 ? (
          <p>No movies available</p>
        ) : (
          <table className="movies-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.stockQuantity}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(movie)}
                      className="edit-btn"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteMovie(movie._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  </AdminLayout>
);
};

export default ManageMovies;