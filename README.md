# 🎬 Movie Library Management System

## 📌 Project Description
A MERN stack application that allows users to browse, borrow, and review movies. Admins can manage movies, members, and view reports.

## 🛠 Tech Stack
- MongoDB
- Express.js
- React.js
- Node.js

## 👥 Team Members
- Member 1: Backend Lead
- Member 2: Member Frontend
- Member 3: Feature Backend
- Member 4: Admin Frontend
- Member 5: Notifications, Profile, QA

## ⚙️ Setup Instructions

### Backend
1. Clone the repository
2. Navigate to backend folder
3. Run `npm install`
4. Create a `.env` file with:
   - MONGO_URI
   - JWT_SECRET
   - PORT
5. Run backend using `npm run dev`

### Frontend
1. Navigate to frontend folder
2. Run `npm install`

3. Start frontend using `npm run dev`

   
# ADMIN DASHBOARD
The Admin Dashboard provides a centralized control panel for managing the entire Movie Library system. It displays real-time system insights and allows administrators to monitor activity efficiently.

# Key Features

# Live Statistics Cards

Total Movies

Total Registered Users

Total Borrows

Overdue Records Count

# Movie Management

Add new movies

Edit existing movie details

Delete movies

Real-time list updates

# Member Management

View all users

Block / Unblock members

Monitor member roles & status

# Borrowing Activity

View all borrow records

Filter overdue borrows

See member name, movie title, status

# Reports Section

Most Borrowed Movies

Most Active Members

Overdue Summary

## API Documentation

The Movie Library API is built with Node.js and Express. All endpoints are prefixed with `/api`.

### Base URL
`http://localhost:5000/api`

---

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login and receive an auth token |

### Movies
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/movies` | Get all movies |
| `GET` | `/movies/:id` | Get details of a specific movie |
| `POST` | `/movies` | Add a new movie (Admin only) |
| `PUT` | `/movies/:id` | Update movie details (Admin only) |
| `DELETE` | `/movies/:id` | Delete a movie (Admin only) |

### Borrowing System
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/borrows` | Borrow a movie |
| `GET` | `/borrows` | Get all borrowing records (Admin only) |
| `GET` | `/borrows/user/:userId` | Get borrowing history for a specific user |
| `PUT` | `/borrows/:id/return` | Mark a borrowed movie as returned |

### User Watchlist
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/watchlist` | Add a movie to watchlist |
| `GET` | `/watchlist/:userId` | Get a user's watchlist |
| `DELETE` | `/watchlist/:watchlistId` | Remove a movie from watchlist |

### Reviews
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/reviews` | Add a review for a movie |
| `GET` | `/reviews/movie/:movieId` | Get all reviews for a specific movie |

### Notifications
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/notifications/:userId` | Get notifications for a user |
| `PUT` | `/notifications/:id/read` | Mark a notification as read |

### Admin & User Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/users` | Get all users (Admin only) |
| `DELETE` | `/users/:id` | Delete a user (Admin only) |
| `GET` | `/reports` | Get system borrowing reports (Admin only) |
