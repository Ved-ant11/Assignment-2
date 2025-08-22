import type { User } from "../types/index";
import { useAppDispatch } from "../app/hooks";
import { selectUser } from "../features/users/usersSlice";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const dispatch = useAppDispatch();

  const handleCardClick = () => {
    dispatch(selectUser(user));
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        cursor: "pointer",
        border: "1px solid #ccc",
        margin: "10px",
        padding: "10px",
      }}
    >
      <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
      <h2>{`${user.first_name} ${user.last_name}`}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default UserCard;