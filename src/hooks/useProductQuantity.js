// hooks/useProductQuantity.js
import { useEffect, useState } from "react";
import { useCart } from "../context/useCart";
import toast from "react-hot-toast";

const useProductQuantity = (product) => {
  const [quantity, setQuantity] = useState(1);
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();

  const isInCart = cartItems.some((item) => item.id === product.id);

  // Sync quantity with cart
  useEffect(() => {
    if (!product.id) return;

    const itemInCart = cartItems.find((item) => item.id === product.id);
    if (itemInCart) {
      setQuantity(itemInCart.quantity);
    } else {
      setQuantity(1);
    }
  }, [product.id, cartItems]);

  const increment = () => {
    const newQuantity = quantity + 1;
    if (newQuantity > (product.stock || Infinity)) return;

    setQuantity(newQuantity);
    if (isInCart) updateQuantity(product.id, newQuantity);
  };

  const decrement = () => {
    const newQuantity = quantity - 1;
    if (newQuantity < 1) return;

    setQuantity(newQuantity);
    if (isInCart) updateQuantity(product.id, newQuantity);
  };

  const toggleCart = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData?.isLoggedIn) {
      toast.error("Please login to use the cart");
      return;
    }

    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart({ ...product, quantity });
    }
  };

  return {
    quantity,
    setQuantity,
    increment,
    decrement,
    isInCart,
    toggleCart,
  };
};

export default useProductQuantity;
