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
    <div>
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
