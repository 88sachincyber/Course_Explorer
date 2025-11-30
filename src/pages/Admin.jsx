import { useEffect, useState } from "react";
import UsersData from "../data/users.json";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      // Simulate loading delay (optional but realistic)
      setTimeout(() => {
        if (!UsersData || !UsersData.users) {
          setError("Invalid users.json format");
        } else {
          setUsers(UsersData.users);
        }
        setLoading(false);
      }, 500);
    } catch (err) {
      setError("Failed to load users");
      setLoading(false);
    }
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 classname="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Loading State */}
      {loading && (
        <p className="text-gray-500 text-lg">Loading users...</p>
      )}

      {/* Error State */}
      {!loading && error && (
        <p className="text-red-600 text-lg">Error: {error}</p>
      )}

      {/* Empty State */}
      {!loading && !error && users.length === 0 && (
        <p className="text-gray-500 text-lg">No users found.</p>
      )}

      {/* User List */}
      {!loading && !error && users.length > 0 && (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
