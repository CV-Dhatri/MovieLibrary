import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageMovies from "./pages/admin/ManageMovies";
import ManageMembers from "./pages/admin/ManageMembers";
import BorrowingActivity from "./pages/admin/BorrowingActivity";
import Reports from "./pages/admin/Reports";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import BorrowHistory from './pages/BorrowHistory';
import Watchlist from './pages/Watchlist';
import Navbar from './components/Navbar';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/borrow-history" element={<BorrowHistory />} />
          <Route path="/watchlist" element={<Watchlist />} />
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/movies"
  element={
    <ProtectedRoute>
      <ManageMovies />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/members"
  element={
    <ProtectedRoute>
      <ManageMembers />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/borrows"
  element={
    <ProtectedRoute>
      <BorrowingActivity />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/reports"
  element={
    <ProtectedRoute>
      <Reports />
    </ProtectedRoute>
  }
/>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;