import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost:8000';
      let url;
      if (codespaceName === 'localhost:8000') {
        url = 'http://localhost:8000/api/leaderboard/';
      } else {
        url = `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`;
      }
      console.log('Leaderboard API URL:', url);
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('Leaderboard API Response:', data);
      
      // Handle both paginated (.results) and plain array responses
      const leaderboardList = data.results || data;
      setLeaderboard(Array.isArray(leaderboardList) ? leaderboardList : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return <span className="badge bg-warning text-dark">🥇 1st</span>;
    if (rank === 2) return <span className="badge bg-secondary">🥈 2nd</span>;
    if (rank === 3) return <span className="badge bg-danger">🥉 3rd</span>;
    return <span className="badge bg-primary">#{rank}</span>;
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-spinner">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-3">Loading leaderboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-md-12">
          <h2>🏆 Leaderboard</h2>
          <p className="text-muted">Compete with others and climb the rankings</p>
          <button className="btn btn-primary mb-3" onClick={fetchLeaderboard} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh Leaderboard'}
          </button>
        </div>
      </div>

      {leaderboard.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏆</div>
          <p className="empty-state-text">No leaderboard data available yet. Start competing!</p>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-12">
            <div className="card shadow-sm mb-4">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover table-striped align-middle mb-0">
                <thead>
                  <tr>
                    <th scope="col" className="text-center" style={{ width: '80px' }}>Rank</th>
                    <th scope="col" className="text-center" style={{ width: '60px' }}>ID</th>
                    <th scope="col">Username</th>
                    <th scope="col" className="text-center">Total Points</th>
                    <th scope="col" className="text-center">Workouts</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => {
                    const rank = index + 1;
                    return (
                      <tr key={entry.id || index} className={rank <= 3 ? 'table-info' : ''}>
                        <td className="text-center fw-bold">
                          {getRankBadge(rank)}
                        </td>
                        <td className="text-center">
                          <span className="badge bg-primary">{entry.id}</span>
                        </td>
                        <td>
                          <strong className="fs-5">
                            {entry.username || entry.user_name || 'N/A'}
                          </strong>
                        </td>
                        <td className="text-center">
                          <span className="badge bg-success fs-6">
                            {entry.total_points || entry.points || 0} pts
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="badge bg-info text-dark fs-6">
                            {entry.workouts_completed || entry.workout_count || 0}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <small className="text-muted">Competitors: <strong>{leaderboard.length}</strong></small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
