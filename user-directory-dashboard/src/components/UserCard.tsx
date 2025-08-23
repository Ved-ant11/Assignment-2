import type { User } from "../types/index";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUser, toggleFavourite } from "../features/users/usersSlice";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const dispatch = useAppDispatch();
  const { favouriteUserIds } = useAppSelector((state) => state.users);

  const isFavourite = favouriteUserIds.includes(user.id);

  const handleFavouriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavourite(user.id));
  };

  const handleCardClick = () => {
    dispatch(selectUser(user));
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer flex flex-col items-center text-center justify-center hover:bg-gray-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white w-full md:w-64 lg:w-72 xl:w-80 2xl:w-96 2xl:h-96 transform hover:scale-105 transition-transform duration-300 border border-transparent hover:border-gray-300 dark:hover:border-white"
    >
      <button
        onClick={handleFavouriteClick}
        className="absolute top-3 right-3 text-2xl p-1 rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transition-colors duration-200 ${
            isFavourite
              ? "text-yellow-400"
              : "text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>

      <img
        src={user.avatar}
        className="w-24 h-24 rounded-full mb-4 mx-auto object-cover border-4 border-gray-200 dark:border-gray-700"
        alt={`${user.first_name} ${user.last_name}`}
      />
      <h2 className="text-lg font-semibold mb-2">{`${user.first_name} ${user.last_name}`}</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{user.email}</p>
    </div>
  );
};

export default UserCard;
