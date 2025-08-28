import type { User } from "../types";
import UserCard from "./UserCard";

interface UserListProps {
  users: User[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {users.length > 0 ? (
        users.map((user) => <UserCard key={user.id} user={user} />)
      ) : (
        <p className="col-span-full text-center text-gray-400 text-xl py-10">
          No users found for your search.
        </p>
      )}
    </div>
  );
};

export default UserList;
