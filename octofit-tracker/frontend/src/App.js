import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg app-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/octofit-logo.png" alt="OctoFit logo" className="app-logo" />
            OctoFit Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  Workouts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <div className="jumbotron">
                <h1 className="display-4">💪 Welcome to OctoFit Tracker</h1>
                <p className="lead">
                  Track your fitness activities, join teams, and compete on the leaderboard
                </p>
                <hr className="my-4" />
                <p>Manage your fitness journey with ease. Start by exploring the sections below.</p>
              </div>

              <div className="row mt-5">
                <div className="col-md-6 col-lg-4 mb-4">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">🏃 Activities</h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text">Browse and manage all available fitness activities.</p>
                      <Link to="/activities" className="btn btn-primary mt-3">
                        View Activities
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4 mb-4">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">👥 Teams</h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text">Create teams and collaborate with other fitness enthusiasts.</p>
                      <Link to="/teams" className="btn btn-primary mt-3">
                        View Teams
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4 mb-4">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">👤 Users</h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text">Connect with other members in the OctoFit community.</p>
                      <Link to="/users" className="btn btn-primary mt-3">
                        View Users
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4 mb-4">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">💪 Workouts</h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text">Log and track all your fitness workouts and exercises.</p>
                      <Link to="/workouts" className="btn btn-primary mt-3">
                        View Workouts
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4 mb-4">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">🏆 Leaderboard</h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text">Compete with others and climb to the top of the rankings.</p>
                      <Link to="/leaderboard" className="btn btn-primary mt-3">
                        View Leaderboard
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4 mb-4">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">📊 Dashboard</h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text">View your personal fitness statistics and achievements.</p>
                      <button className="btn btn-secondary mt-3" disabled>
                        Coming Soon
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <footer className="mt-5 mb-5 text-center text-muted">
                <hr />
                <p>&copy; 2026 OctoFit Tracker. All rights reserved.</p>
              </footer>
            </div>
          }
        />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
