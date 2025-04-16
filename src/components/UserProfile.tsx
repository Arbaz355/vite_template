import React from 'react';
import { useUser } from '../store/zustand/hooks';

// Before: With React.memo
/*
const UserProfile = React.memo(({ userId }: { userId: string }) => {
  // Fetch user details based on userId
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [userId]);
  
  if (loading) return <div>Loading user profile...</div>;
  if (!user) return <div>User not found</div>;
  
  return (
    <div className="user-profile">
      <h2>{user.displayName}</h2>
      <p>Email: {user.email}</p>
      <div className="roles">
        <p>Roles: {user.roles.join(', ')}</p>
      </div>
    </div>
  );
});
*/

// After: With Zustand
const UserProfile = ({ userId }: { userId: string }) => {
  const { id, displayName, email, roles, loading, error, setUser } = useUser();

  React.useEffect(() => {
    const fetchUser = async () => {
      // Only fetch if not the same user
      if (id !== userId) {
        // Mark as loading
        setUser({ loading: true, error: null });

        try {
          // In a real app, this would be an API call
          const response = await fetch(`/api/users/${userId}`);
          const data = await response.json();

          // Update the global store with the user data
          setUser({
            id: data.id,
            displayName: data.displayName,
            email: data.email,
            roles: data.roles,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          // Handle error
          setUser({
            loading: false,
            error: error instanceof Error ? error : new Error('Failed to fetch user'),
          });
        }
      }
    };

    fetchUser();
  }, [userId, id, setUser]);

  if (loading) return <div>Loading user profile...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!id) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <h2>{displayName}</h2>
      <p>Email: {email}</p>
      <div className="roles">
        <p>Roles: {roles.join(', ')}</p>
      </div>
    </div>
  );
};

export default UserProfile;
