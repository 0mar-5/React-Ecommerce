import { useForm } from "react-hook-form";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const password = watch("password");

  function onSubmitForm(data) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const isExisting = users.find((user) => user.email === data.email);
    if (isExisting) {
      alert("User with this email already exists.");
      return;
    }

    const newUser = {
      ...data,
      id: Date.now(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Registered successfully!");
    navigate("/login");
  }

  function onErrors(errors) {
    console.log(errors);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm, onErrors)}
      className="form-group form-container"
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="form-group pb-3">
        <label htmlFor="userName">User Name</label>
        <input
          type="text"
          id="userName"
          className="form-control"
          placeholder="Enter user name"
          {...register("userName", { required: "user name is required" })}
        />
        {errors?.userName && (
          <p role="alert" className="text-danger">
            {errors.userName.message}
          </p>
        )}
      </div>

      <div className="form-group pb-3">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="form-control"
          placeholder="Enter email"
          {...register("email", {
            required: "Email Address is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors?.email && (
          <p role="alert" className="text-danger">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="form-group pb-3">
        <label htmlFor="inputAddress">Address</label>
        <input
          type="text"
          id="inputAddress"
          className="form-control"
          placeholder="1234 Main St"
          {...register("inputAddress", { required: "Address is required" })}
        />
        {errors?.inputAddress && (
          <p role="alert" className="text-danger">
            {errors.inputAddress.message}
          </p>
        )}
      </div>

      <div className="form-group pb-3">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="form-control"
          placeholder="Enter password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors?.password && (
          <p role="alert" className="text-danger">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="form-group pb-3">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          className="form-control"
          placeholder="Confirm password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        {errors?.confirmPassword && (
          <p role="alert" className="text-danger">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button className="btn btn-primary" type="submit">
        Register
      </button>
    </form>
  );
}

export default Register;
