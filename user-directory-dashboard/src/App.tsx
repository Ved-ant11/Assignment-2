import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchUsers } from "./features/users/usersSlice";
import UserList from "./components/UserList";
import Pagination from "./components/Pagination";

function App() {
  const dispatch = useAppDispatch();
  const { users, status, error, currentPage } = useAppSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [currentPage, dispatch]);

  let content;

  if (status === "loading") {
    content = <p>Loading users...</p>;
  } else if (status === "succeeded") {
    content = <UserList users={users} />;
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h1>User Directory</h1>
      {content}
      <Pagination />
    </div>
  );
}

export default App;
