import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const user = useAppSelector((state) =>
    state.users.users.find((u) => u.id === Number(id))
  );

  if (!user) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">User Not Found</h1>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 text-center w-full max-w-md">
        <img
          src={user.avatar}
          alt={`${user.first_name}`}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 border-4 border-blue-500 mx-auto"
        />
        <h2 className="text-2xl md:text-3xl font-bold">{`${user.first_name} ${user.last_name}`}</h2>
        <p className="text-blue-500 dark:text-blue-400 mt-1 text-base md:text-lg">
          {user.email}
        </p>

        <button
          onClick={() => navigate(-1)}
          className="mt-8 px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          &larr; Back
        </button>
      </div>
    </div>
  );
};

export default UserDetailPage;
