import { Suspense, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Products from "./components/products/Products";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "null");
    return userData?.isLoggedIn || false;
  });

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
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
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
