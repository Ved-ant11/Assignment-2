import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchUsers } from "./features/users/usersSlice";
import UserList from "./components/UserList";
import Pagination from "./components/Pagination";
import UserModal from "./components/UserModal";

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
    content = <p>Loading users...</p>;
  } else if (status === "succeeded") {
    content = <UserList users={filteredUsers} />;
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h1>User Directory</h1>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "8px", margin: "10px 0", width: "300px" }}
      />

      {content}
      <Pagination />
      {selectedUser && <UserModal user={selectedUser} />}
    </div>
  );
}

export default App;
