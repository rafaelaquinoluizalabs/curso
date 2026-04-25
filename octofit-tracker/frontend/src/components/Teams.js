import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost:8000';
      let url;
      if (codespaceName === 'localhost:8000') {
        url = 'http://localhost:8000/api/teams/';
      } else {
        url = `https://${codespaceName}-8000.app.github.dev/api/teams/`;
      }
      console.log('Teams API URL:', url);
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('Teams API Response:', data);
      
      // Handle both paginated (.results) and plain array responses
      const teamList = data.results || data;
      setTeams(Array.isArray(teamList) ? teamList : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching teams:', err);
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
          <span className="ms-3">Loading teams...</span>
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
          <h2>👥 Teams</h2>
          <p className="text-muted">Manage and view all teams in the system</p>
          <button className="btn btn-primary mb-3" onClick={fetchTeams} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh Teams'}
          </button>
        </div>
      </div>

      {teams.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <p className="empty-state-text">No teams found. Create a team to get started!</p>
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
                    <th scope="col">Team Name</th>
                    <th scope="col">Description</th>
                    <th scope="col" className="text-center">Members</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team.id}>
                      <td className="text-center">
                        <span className="badge bg-primary">{team.id}</span>
                      </td>
                      <td>
                        <strong>{team.name || 'N/A'}</strong>
                      </td>
                      <td>
                        <small className="text-muted">{team.description || 'No description'}</small>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-info text-dark fs-6">
                          {team.members_count || 0}
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
              <small className="text-muted">Total Teams: <strong>{teams.length}</strong></small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Teams;
