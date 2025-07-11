import { useState, useEffect } from "react";
import { CartContext } from "./Context";

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("userData") || "null");
      if (userData && userData.cartItems) {
        return userData.cartItems;
      }
    }
    return [];
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "null");

    if (!userData?.isLoggedIn || !userData?.id) return;

    const updatedUser = { ...userData, cartItems };
    localStorage.setItem("userData", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((user) =>
      user.id === userData.id ? updatedUser : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let newItems;

      if (existingItem) {
        newItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity }];
      }

      return newItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const incrementQuantity = (id) => {
    setCartItems((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          if (item.quantity >= (item.stock || Infinity)) return item;
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const decrementQuantity = (id) => {
    setCartItems((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          if (item.quantity <= 1) return item;
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        decrementQuantity,
        incrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
