import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/useCart";
import toast, { Toaster } from "react-hot-toast";

function Login({ setIsLoggedIn }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setCartItems } = useCart();

  function onSubmit(data) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (matchedUser) {
      setIsLoggedIn(true);

      const userCart = matchedUser.cartItems || [];
      setCartItems(userCart);

      const updatedUser = {
        ...matchedUser,
        isLoggedIn: true,
      };

      localStorage.setItem("userData", JSON.stringify(updatedUser));

      const updatedUsers = users.map((u) =>
        u.email === matchedUser.email ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      toast.success("Login successful!");
      navigate("/");
    } else {
      alert("Invalid email or password");
      toast.error("Invalid email or password");
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-group form-container"
      >
        <Toaster position="top-center" reverseOrder={false} />
        <div className="form-group pb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group pb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>

        <button className="btn btn-success" type="submit">
          Login
        </button>
        <div className=" mt-3">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default Login;
