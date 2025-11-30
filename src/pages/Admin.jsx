import { useEffect, useState } from "react";
import UsersData from "../data/users.json";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      // Simulate slight loading delay for UX
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
    <div className="p-4 md:p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        Admin Panel
      </h1>

      {/* Loading State */}
      {loading && (
        <p className="text-gray-500 text-lg text-center">Loading users...</p>
      )}

      {/* Error State */}
      {!loading && error && (
        <p className="text-red-600 text-lg text-center">Error: {error}</p>
      )}

      {/* Empty State */}
      {!loading && !error && users.length === 0 && (
        <p className="text-gray-500 text-lg text-center">No users found.</p>
      )}

      {/* User List */}
      {!loading && !error && users.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition w-full"
            >
              <p className="text-lg font-semibold break-words">{user.name}</p>
              <p className="text-sm text-gray-600 break-words">{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
