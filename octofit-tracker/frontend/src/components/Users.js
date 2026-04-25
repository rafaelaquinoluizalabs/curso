import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost:8000';
      let url;
      if (codespaceName === 'localhost:8000') {
        url = 'http://localhost:8000/api/users/';
      } else {
        url = `https://${codespaceName}-8000.app.github.dev/api/users/`;
      }
      console.log('Users API URL:', url);
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('Users API Response:', data);
      
      // Handle both paginated (.results) and plain array responses
      const userList = data.results || data;
      setUsers(Array.isArray(userList) ? userList : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
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
          <span className="ms-3">Loading users...</span>
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
          <h2>👤 Users</h2>
          <p className="text-muted">View all registered users in the system</p>
          <button className="btn btn-primary mb-3" onClick={fetchUsers} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh Users'}
          </button>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <p className="empty-state-text">No users found. Register your first user!</p>
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
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="text-center">
                        <span className="badge bg-primary">{user.id}</span>
                      </td>
                      <td>
                        <strong>{user.username || 'N/A'}</strong>
                      </td>
                      <td>
                        <a href={`mailto:${user.email}`} className="link">
                          {user.email || 'N/A'}
                        </a>
                      </td>
                      <td>{user.first_name || '—'}</td>
                      <td>{user.last_name || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <small className="text-muted">Total Users: <strong>{users.length}</strong></small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
