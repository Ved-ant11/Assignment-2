import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchUsers } from "./features/users/usersSlice";
import UserList from "./components/UserList";
import Pagination from "./components/Pagination";
import UserModal from "./components/UserModal";
import Loader from "./components/Loader";
import { CiSearch } from "react-icons/ci";
function App() {
  const dispatch = useAppDispatch();
  const { users, status, error, currentPage, selectedUser } = useAppSelector(
    (state) => state.users
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [currentPage, dispatch]);

  const filteredUsers = useMemo(() => {
    if (!searchTerm) {
      return users;
    }
    return users.filter((user) => {
      const fullName = `${user.first_name} ${user.last_name}`;
      return (
        fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [users, searchTerm]);

  let content;

  if (status === "loading") {
    content = <Loader />;
  } else if (status === "succeeded") {
    content = <UserList users={filteredUsers} />;
  } else if (status === "failed") {
    content = <p className="text-red-700">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-zinc-900 p-4 md:p-8 lg:p-12 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
        User Directory
      </h1>
      <p className="text-gray-400 mt-2 text-lg mb-4">
        Browse and find <span className="text-yellow-200">user</span>{" "}
        information
      </p>
      <div className="relative w-full max-w-md mx-auto mb-4">
        <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 border border-gray-300 rounded bg-zinc-900 text-white 
               placeholder-gray-400 transition-colors duration-300 
               focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 
               hover:bg-zinc-800"
        />
      </div>
      {content}
      <Pagination />
      {selectedUser && <UserModal user={selectedUser} />}
    </div>
  );
}

export default App;
