import React from 'react';
import { useEntity } from '../store/zustand/hooks';
import { useStore } from '../store/zustand/store';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Before: With React.memo
/*
interface DataTableProps {
  users: User[];
  isLoading: boolean;
  onRefresh: () => void;
}

// Using memo to prevent re-renders when parent components change
const DataTable = React.memo(({ users, isLoading, onRefresh }: DataTableProps) => {
  if (isLoading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="data-table">
      <div className="table-header">
        <h2>Users</h2>
        <button onClick={onRefresh}>Refresh</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
*/

// After: With Zustand
const DataTable = () => {
  // Using Zustand to manage users data
  const { data, ids, loading, error, setLoading, setData, setError } = useEntity<User>('users');

  // For more specific selections, you can use the selector pattern
  const totalUsers = useStore((state) => state.entities['users']?.allIds.length || 0);

  // Fetch users on mount
  React.useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const userData = await response.json();
        setData(userData, true); // true = replace existing data
      } catch (error) {
        setError(error instanceof Error ? error : new Error('Unknown error'));
      }
    };

    fetchUsers();
  }, [setLoading, setData, setError]);

  // Handle refresh button click
  const handleRefresh = () => {
    setLoading(true);
    // Refetch users...
    fetch('/api/users')
      .then((response) => response.json())
      .then((userData) => setData(userData, true))
      .catch((err) => setError(err instanceof Error ? err : new Error('Failed to refresh')));
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="data-table">
      <div className="table-header">
        <h2>Users ({totalUsers})</h2>
        <button onClick={handleRefresh}>Refresh</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {ids.map((id) => {
            const user = data[id];
            return (
              <tr key={id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
