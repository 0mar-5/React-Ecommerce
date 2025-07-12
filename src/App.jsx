import { Suspense, useState, lazy } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const Products = lazy(() => import("./components/products/Products"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const ProductDetails = lazy(() =>
  import("./pages/ProductDetails/ProductDetails")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const Wishlist = lazy(() => import("./pages/wishlist/Wishlist"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "null");
    return userData?.isLoggedIn || false;
  });

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="container">
        <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
