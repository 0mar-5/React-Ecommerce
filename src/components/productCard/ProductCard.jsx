import "./ProductCard.css";
import StarRating from "../starRatting/StarRating";
import { Link } from "react-router-dom";
import useProductQuantity from "../../hooks/useProductQuantity";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistItem } from "../../store/wishlistSlice";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

const ProductCard = ({ product }) => {
  const { quantity, increment, decrement, isInCart, toggleCart } =
    useProductQuantity(product);
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(toggleWishlistItem(product));
  };
  return (
    <Link
      to={`/product/${product.id}`}
      className="text-decoration-none text-dark"
    >
      <div className="card h-100 d-flex flex-column position-relative">
        <button
          onClick={handleToggle}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className=" position-absolute top-0 end-0 m-2  border-0 bg-transparent rounded-circle"
        >
          {isInWishlist ? (
            <FaHeart className="text-danger fs-2" />
          ) : (
            <CiHeart className="text-secondary fs-2" />
          )}
        </button>
        <img
          src={product.thumbnail}
          className="card-img-top"
          alt={product.title || "Product image"}
          loading="lazy"
        />

        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{product.title}</h5>
            <h6 className="text-success mb-2">${product.price}</h6>
          </div>

          <p className="card-text text-muted small">{product.description}</p>

          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="badge">
              <StarRating rating={product.rating} />
            </span>
            <span>({product.rating})</span>
            <span className="text-secondary">Stock: {product.stock}</span>
          </div>

          {isInCart && (
            <div className="d-flex align-items-center justify-content-center mb-3">
              <button
                className="btn btn-outline-secondary btn__round btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  decrement();
                }}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="mx-2">{quantity}</span>
              <button
                className="btn btn-outline-secondary btn__round btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  increment();
                }}
                disabled={quantity >= product.stock}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}

          <div className="mt-auto">
            <button
              className="btn w-100 card__btn"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                toggleCart();
              }}
              aria-label={isInCart ? "Remove from cart" : "Add to cart"}
            >
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
