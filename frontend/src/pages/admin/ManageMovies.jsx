import AdminLayout from "../../components/AdminLayout";
import "./ManageMovies.css";

const ManageMovies = () => {
  return (
    <AdminLayout>
      <div className="top-bar">
        <h1>Manage Movies</h1>
        <button className="add-btn">+ Add Movie</button>
      </div>

      <table className="movie-table">
        ...
      </table>
    </AdminLayout>
  );
};

export default ManageMovies;