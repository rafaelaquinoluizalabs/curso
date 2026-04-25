import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost:8000';
      let url;
      if (codespaceName === 'localhost:8000') {
        url = 'http://localhost:8000/api/activities/';
      } else {
        url = `https://${codespaceName}-8000.app.github.dev/api/activities/`;
      }
      console.log('Activities API URL:', url);
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('Activities API Response:', data);
      
      // Handle both paginated (.results) and plain array responses
      const activityList = data.results || data;
      setActivities(Array.isArray(activityList) ? activityList : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching activities:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-spinner">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-3">Loading activities...</span>
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
          <h2>🏃 Activities</h2>
          <p className="text-muted">Browse and manage all available fitness activities</p>
          <button className="btn btn-primary mb-3" onClick={fetchActivities} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh Activities'}
          </button>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <p className="empty-state-text">No activities found. Start creating new activities!</p>
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
                    <th scope="col">Activity Name</th>
                    <th scope="col">Description</th>
                    <th scope="col" className="text-end">Calories Burned</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={activity.id}>
                      <td className="text-center">
                        <span className="badge bg-primary">{activity.id}</span>
                      </td>
                      <td>
                        <strong>{activity.name || 'N/A'}</strong>
                      </td>
                      <td>
                        <small className="text-muted">{activity.description || 'No description'}</small>
                      </td>
                      <td className="text-end">
                        <span className="badge bg-success fs-6">
                          {activity.calories_burned || 0}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <small className="text-muted">Total Activities: <strong>{activities.length}</strong></small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Activities;
