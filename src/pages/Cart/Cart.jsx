import CartCard from "../../components/CartCard/CartCard";
import { useCart } from "../../context/useCart";

function Cart() {
  const { cartItems, totalPrice } = useCart();
  if (cartItems.length === 0)
    return (
      <div className="d-flex justify-content-center align-items-center vh-50 pt-5">
        <div className="card shadow-sm p-4 text-center">
          <h5 className="text-muted mb-3">🛒 Your cart is empty</h5>
          <p className="text-secondary">
            Looks like you haven’t added anything yet.
          </p>
          <a href="/" className="btn btn-outline-primary mt-3">
            Back to Shop
          </a>
        </div>
      </div>
    );
  return (
    <div className="container my-4">
      <h4 className="mb-4">Your Cart</h4>

      <div className="list-group">
        {cartItems.map((p) => (
          <CartCard key={p.id} product={p} />
        ))}
      </div>

      {/* Cart Total */}
      <div className="d-flex justify-content-end mt-4">
        <h5>Cart Total: ${totalPrice}</h5>
      </div>
    </div>
  );
}

export default Cart;
