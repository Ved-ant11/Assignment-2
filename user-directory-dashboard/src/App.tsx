import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchUsers } from "./features/users/usersSlice";
import { toggleTheme } from "./features/theme/themeSlice";
import UserList from "./components/UserList";
import Pagination from "./components/Pagination";
import UserModal from "./components/UserModal";
import Loader from "./components/Loader";

function App() {
  const dispatch = useAppDispatch();
  const { users, status, error, currentPage, selectedUser } = useAppSelector(
    (state) => state.users
  );
  const { mode } = useAppSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(mode === "light" ? "dark" : "light");
    root.classList.add(mode);
  }, [mode]);

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [currentPage, dispatch]);

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    return users.filter((user) => {
      const fullName = `${user.first_name} ${user.last_name}`;
      return (
        fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [users, searchTerm]);

  let content;
  if (status === "loading") content = <Loader />;
  else if (status === "succeeded") content = <UserList users={filteredUsers} />;
  else if (status === "failed")
    content = <p className="text-center text-red-400">{error}</p>;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="absolute top-4 right-4">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {mode === "light" ? "🌙" : "☀️"}
          </button>
        </div>
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            User Directory
          </h1>
          <p className="text-md sm:text-lg text-gray-500 dark:text-gray-400 mt-2">
            Browse and find user information
          </p>
        </header>
        <div className="mb-8 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        {content}
        {status === "succeeded" && <Pagination />}
        {selectedUser && <UserModal user={selectedUser} />}
      </div>
    </div>
  );
}

export default App;
