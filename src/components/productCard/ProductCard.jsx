// import { useEffect, useState } from "react";
import "./ProductCard.css";
import StarRating from "../starRatting/StarRating";
import { Link } from "react-router-dom";
import useProductQuantity from "../../hooks/useProductQuantity";

const ProductCard = ({ product }) => {
  const { quantity, increment, decrement, isInCart, toggleCart } =
    useProductQuantity(product);

  return (
    <Link
      to={`/product/${product.id}`}
      className="text-decoration-none text-dark"
    >
      <div className="card h-100 d-flex flex-column">
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
