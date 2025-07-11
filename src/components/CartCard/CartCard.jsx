import { useCart } from "../../context/useCart";

function CartCard({ product }) {
  const { removeFromCart, incrementQuantity, decrementQuantity } = useCart();
  return (
    <div key={product.id} className="list-group-item">
      <div className="row align-items-center">
        {/* Image */}
        <div className="col-3 col-md-2">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="img-fluid rounded"
          />
        </div>

        {/* Product Info */}
        <div className="col-9 col-md-3">
          <h6 className="mb-1">{product.title}</h6>
          <small className="text-muted">Unit Price: ${product.price}</small>
        </div>

        {/* Quantity Control */}
        <div className="col-6 col-md-3 mt-3 mt-md-0 d-flex align-items-center">
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            onClick={() => decrementQuantity(product.id)}
          >
            -
          </button>
          <span>{product.quantity}</span>
          <button
            className="btn btn-outline-secondary btn-sm ms-2"
            onClick={() => incrementQuantity(product.id)}
          >
            +
          </button>
        </div>

        {/* Item Total & Remove */}
        <div className="col-6 col-md-4 mt-3 mt-md-0 text-end d-flex justify-content-between">
          <button
            className="btn btn-danger btn-sm"
            onClick={() => removeFromCart(product.id)}
          >
            Remove
          </button>
          <p className="mb-1">
            <strong>Total: ${product.price * product.quantity}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
