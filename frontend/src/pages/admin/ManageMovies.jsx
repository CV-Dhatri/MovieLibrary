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
      <div className="p-10">
      <div className="bg-white rounded-3xl shadow-xl p-8">

        <h2 style={{ color: "red", fontSize: "50px" }}>
  Manage Movies
</h2>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <form onSubmit={handleSubmit} className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
            className="border p-3 rounded-lg w-full md:w-1/4"
          />

          <input
            type="text"
            placeholder="Genre"
            value={form.genre}
            onChange={(e) =>
              setForm({ ...form, genre: e.target.value })
            }
            required
            className="border p-3 rounded-lg w-full md:w-1/4"
          />

          <input
            type="number"
            placeholder="Stock"
            value={form.stockQuantity}
            onChange={(e) =>
              setForm({ ...form, stockQuantity: e.target.value })
            }
            required
            className="border p-3 rounded-lg w-full md:w-1/4"
          />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition"
          >
            {editingId ? "Update Movie" : "Add Movie"}
          </button>
        </form>
      </div>

      {/* Movies Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {movies.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <div className="text-5xl mb-4">🎬</div>
            <p className="text-lg font-medium">
              No movies available
            </p>
            <p className="text-sm">
              Add movies to see them listed here.
            </p>
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-indigo-50 text-indigo-700 uppercase text-sm">
              <tr>
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-left">Genre</th>
                <th className="px-6 py-4 text-left">Stock</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {movies.map((movie) => (
                <tr
                  key={movie._id}
                  className="border-t hover:bg-indigo-50 transition"
                >
                  <td className="px-6 py-4">{movie.title}</td>
                  <td className="px-6 py-4">{movie.genre}</td>
                  <td className="px-6 py-4">{movie.stockQuantity}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(movie)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteMovie(movie._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
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
      </div>
    </AdminLayout>
  );
};

export default ManageMovies;