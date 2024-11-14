import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });

  const fetchUsers = async () => {
    try {
      const response = await api.get('/userlist');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/userlist', form);
      setUsers([...users, response.data]);
      setForm({ name: '', email: '' }); // Reset form
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add User</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleFormChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleFormChange}
              required
            />
          </label>
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default UserList;
