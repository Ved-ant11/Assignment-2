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

  const modalStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const contentStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    textAlign: "center",
    position: "relative",
    color: "#333",
  };

  const closeButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
  };

  return (
    <div style={modalStyle} onClick={handleClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeButtonStyle} onClick={handleClose}>
          &times;
        </button>
        <img
          src={user.avatar}
          alt={`${user.first_name}`}
          style={{ borderRadius: "50%", width: "120px", height: "120px" }}
        />
        <h2>{`${user.first_name} ${user.last_name}`}</h2>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserModal;
