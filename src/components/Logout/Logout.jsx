import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/useCart";
import toast, { Toaster } from "react-hot-toast";

function Logout({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const { clearCart, cartItems } = useCart();

  const user = JSON.parse(localStorage.getItem("userData"));

  const handleLogout = () => {
    if (!user) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, isLoggedIn: false, cartItems } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const updatedUserData = { ...user, isLoggedIn: false, cartItems };
    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    clearCart();
    setIsLoggedIn(false);
    localStorage.removeItem("cartItems");

    toast.success("You have been logged out.");
    navigate("/login");
  };

  return (
    <div className="dropdown">
      <Toaster position="top-center" reverseOrder={false} />
      <button
        className="nav-link nav__link"
        type="button"
        id="dropdownMenu2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Welcome, {user?.userName}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
        <li>
          <button
            className="dropdown-item"
            onClick={handleLogout}
            type="button"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Logout;
