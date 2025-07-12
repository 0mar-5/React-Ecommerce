import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../network/interceptor";
import StarRating from "../../components/starRatting/StarRating";
import useProductQuantity from "../../hooks/useProductQuantity";
import { Toaster } from "react-hot-toast";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axiosInstance.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);
  const { quantity, increment, decrement, isInCart, toggleCart } =
    useProductQuantity(product);

  return (
    <div className="container mt-5">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">{product.title}</h2>

        <div className="text-center mb-4">
          <img
            src={product?.thumbnail}
            alt={product.title}
            className="img-fluid rounded"
            style={{ maxWidth: "300px" }}
          />
        </div>

        <p className="text-muted">{product.description}</p>

        <div className="d-flex align-items-center justify-content-between mb-3">
          <span className="d-flex align-items-center gap-1">
            <StarRating rating={product.rating} />
            <span className="ms-1">({product.rating})</span>
          </span>
          <span className="text-secondary fw-medium">
            Stock: {product.stock}
          </span>
        </div>

        <p className="fw-bold fs-5">
          Price: <span className="text-success">${product.price}</span>
        </p>

        <div className="bg-light p-3 rounded mb-3">
          <h5 className="mb-2 text-primary">More Information</h5>
          <p className="mb-1">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="mb-0">
            <strong>Brand:</strong> {product.brand}
          </p>
        </div>

        {isInCart && (
          <div className="d-flex align-items-center justify-content-center mb-3">
            <button
              className="btn btn-outline-secondary rounded-circle "
              onClick={decrement}
              disabled={quantity <= 1}
              style={{ width: "40px", height: "40px" }}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="mx-3 fs-5">{quantity}</span>
            <button
              className="btn btn-outline-secondary rounded-circle"
              onClick={increment}
              disabled={quantity >= product.stock}
              style={{ width: "40px", height: "40px" }}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        )}

        <div className="d-grid">
          <button
            className={`btn ${isInCart ? "btn-danger" : "btn-primary"}`}
            onClick={toggleCart}
            aria-label={isInCart ? "Remove from cart" : "Add to cart"}
          >
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
