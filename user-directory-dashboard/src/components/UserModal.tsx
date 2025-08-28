import type { User } from "../types";
import { useAppDispatch } from "../app/hooks";
import { selectUser } from "../features/users/usersSlice";
import { useNavigate } from "react-router-dom";

interface UserModalProps {
  user: User;
}

const UserModal = ({ user }: UserModalProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(selectUser(null));
  };

  const handleViewProfile = () => {
    navigate(`/users/${user.id}`);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center relative w-full max-w-sm animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
          onClick={handleClose}
        >
          &times;
        </button>
        <img
          src={user.avatar}
          alt={`${user.first_name}`}
          className="w-32 h-32 rounded-full mb-4 border-4 border-blue-500 mx-auto"
        />
        <h2 className="text-3xl font-bold">{`${user.first_name} ${user.last_name}`}</h2>
        <p className="text-blue-500 dark:text-blue-400 mt-1 text-lg">
          {user.email}
        </p>

        <button
          onClick={handleViewProfile}
          className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          View Full Profile
        </button>
      </div>
    </div>
  );
};

export default UserModal;