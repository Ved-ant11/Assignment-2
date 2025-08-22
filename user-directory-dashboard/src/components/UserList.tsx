import type { User } from "../types/index";
import UserCard from "./UserCard";

interface UserListProps {
  users: User[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
