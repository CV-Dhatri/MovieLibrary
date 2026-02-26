import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import API from "../../api/axios";

const ManageMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newMovie, setNewMovie] = useState({
    title: "",
    genre: "",
    stockQuantity: "",
  });

  // Fetch Movies
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await API.get("/movies");
      setMovies(res.data.data); // IMPORTANT
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Delete Movie
  const deleteMovie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?"))
      return;

    try {
      await API.delete(`/movies/${id}`);
      fetchMovies();
    } catch (error) {
      console.error(error);
    }
  };

  // Add Movie
  const addMovie = async (e) => {
    e.preventDefault();

    try {
      await API.post("/movies", newMovie);
      fetchMovies();
      setNewMovie({ title: "", genre: "", stockQuantity: "" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Manage Movies</h2>

      {/* Add Movie Form */}
      <form
        onSubmit={addMovie}
        className="bg-white p-6 rounded-2xl shadow-lg mb-8 flex gap-4"
      >
        <input
          type="text"
          placeholder="Title"
          value={newMovie.title}
          onChange={(e) =>
            setNewMovie({ ...newMovie, title: e.target.value })
          }
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="text"
          placeholder="Genre"
          value={newMovie.genre}
          onChange={(e) =>
            setNewMovie({ ...newMovie, genre: e.target.value })
          }
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="number"
          placeholder="Stock Quantity"
          value={newMovie.stockQuantity}
          onChange={(e) =>
            setNewMovie({ ...newMovie, stockQuantity: e.target.value })
          }
          className="border p-2 rounded w-full"
          required
        />

        <button className="bg-indigo-600 text-white px-4 rounded">
          Add
        </button>
      </form>

      {loading && <p>Loading movies...</p>}

      {/* Movie Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Genre</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{movie.title}</td>
                <td className="px-6 py-4">{movie.genre}</td>
                <td className="px-6 py-4">{movie.stockQuantity}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteMovie(movie._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ManageMovies;