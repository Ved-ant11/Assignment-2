import type { User } from "../types";
import { useAppDispatch } from "../app/hooks";
import { selectUser } from "../features/users/usersSlice";

interface UserModalProps {
  user: User;
}

const UserModal = ({ user }: UserModalProps) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(selectUser(null));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleClose}>
      <div className="bg-white p-6 rounded shadow-lg" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleClose}>
          &times;
        </button>
        <img
          src={user.avatar}
          alt={`${user.first_name}`}
          className="w-24 h-24 rounded-full mb-4 mx-auto object-cover shadow-lg border-2 border-white mb-3"
        />
        <h2 className="text-2xl font-semibold mb-2 text-center color-black">{`${user.first_name} ${user.last_name}`}</h2>
        <p className="text-gray-600 text-center">{user.email}</p>
      </div>
    </div>
  );
};

export default UserModal;
