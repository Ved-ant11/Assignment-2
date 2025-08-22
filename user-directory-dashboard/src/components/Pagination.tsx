import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchUsers } from "../features/users/usersSlice";

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { currentPage, totalPages } = useAppSelector((state) => state.users);

  const handlePrev = () => {
    if (currentPage > 1) {
      dispatch(fetchUsers(currentPage - 1));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(fetchUsers(currentPage + 1));
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 my-4 text-white font-semibold text-lg py-2">
      <button onClick={handlePrev} disabled={currentPage === 1} className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50 hover:bg-blue-700 transition duration-300 ease-in-out">
        Previous
      </button>
      <span className="mx-2 text-white font-semibold text-lg py-2">
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50 hover:bg-blue-700 transition duration-300 ease-in-out ml-3">
        Next
      </button>
    </div>
  );
};

export default Pagination;
