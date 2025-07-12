import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistItem } from "../../store/wishlistSlice";
import { FaHeart } from "react-icons/fa";
import "./Wishlist.css";
function Wishlist() {
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const handleToggle = (product) => {
    dispatch(toggleWishlistItem(product));
  };
  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <p className="text-muted">Your wishlist is empty.</p>
      ) : (
        <div className="list-group">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="list-group-item list-group-item-light mb-3 p-3 rounded shadow-sm"
            >
              <div className="d-flex align-items-start">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="me-3 product__img"
                />

                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="mb-1">{product.title}</h5>
                    <button
                      onClick={() => handleToggle(product)}
                      className=" p-0 border-0 bg-transparent"
                      aria-label="Remove from wishlist"
                    >
                      <FaHeart className="text-danger fs-5" />
                    </button>
                  </div>
                  <p className="mb-2 text-muted small">{product.description}</p>
                  <span className="text-success fw-bold">${product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
