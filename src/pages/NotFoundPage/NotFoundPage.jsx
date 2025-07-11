import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaExclamationTriangle } from "react-icons/fa";

function NotFoundPage() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-5">
      <h2 className="text-danger mb-4">
        <FaExclamationTriangle className="me-2" />
        Page Not Found
      </h2>
      <Link
        to="/"
        className="btn btn-primary btn-lg px-4 d-inline-flex align-items-center"
      >
        <IoHomeSharp className="me-2" />
        Return to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
