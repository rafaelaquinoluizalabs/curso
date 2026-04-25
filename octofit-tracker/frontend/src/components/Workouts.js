import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost:8000';
      let url;
      if (codespaceName === 'localhost:8000') {
        url = 'http://localhost:8000/api/workouts/';
      } else {
        url = `https://${codespaceName}-8000.app.github.dev/api/workouts/`;
      }
      console.log('Workouts API URL:', url);
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('Workouts API Response:', data);
      
      // Handle both paginated (.results) and plain array responses
      const workoutList = data.results || data;
      setWorkouts(Array.isArray(workoutList) ? workoutList : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching workouts:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const getIntensityBadge = (intensity) => {
    const intensityMap = {
      'high': 'bg-danger',
      'medium': 'bg-warning',
      'low': 'bg-success',
      'intense': 'bg-danger',
      'moderate': 'bg-warning',
      'light': 'bg-success'
    };
    const badgeClass = intensityMap[intensity?.toLowerCase()] || 'bg-secondary';
    return <span className={`badge ${badgeClass} text-${intensity?.toLowerCase() === 'medium' || intensity?.toLowerCase() === 'moderate' ? 'dark' : 'white'}`}>{intensity || 'N/A'}</span>;
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-spinner">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-3">Loading workouts...</span>
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
          <h2>💪 Workouts</h2>
          <p className="text-muted">Track and manage your fitness workouts</p>
          <button className="btn btn-primary mb-3" onClick={fetchWorkouts} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh Workouts'}
          </button>
        </div>
      </div>

      {workouts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏋️</div>
          <p className="empty-state-text">No workouts found. Start logging your workouts!</p>
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
                    <th scope="col" className="text-center">ID</th>
                    <th scope="col">Workout Name</th>
                    <th scope="col" className="text-center">Duration</th>
                    <th scope="col" className="text-center">Intensity</th>
                    <th scope="col" className="text-center">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout) => (
                    <tr key={workout.id}>
                      <td className="text-center">
                        <span className="badge bg-primary">{workout.id}</span>
                      </td>
                      <td>
                        <strong>{workout.name || 'N/A'}</strong>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-light text-dark">
                          {workout.duration || 'N/A'} min
                        </span>
                      </td>
                      <td className="text-center">
                        {getIntensityBadge(workout.intensity)}
                      </td>
                      <td className="text-center">
                        <small>{workout.date ? new Date(workout.date).toLocaleDateString() : 'N/A'}</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <small className="text-muted">Total Workouts: <strong>{workouts.length}</strong></small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Workouts;
