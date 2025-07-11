import ProductCard from "../productCard/ProductCard";
import "./Products.css";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../network/interceptor";
import { Toaster } from "react-hot-toast";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance.get("/products").then((res) => {
      setProducts(res.data?.products);
    });
  }, []);
  return (
    <div className="row pt-5 ">
      <Toaster position="top-center" reverseOrder={false} />
      {products?.map((product) => (
        <div key={product.id} className="col-12 col-md-6 col-lg-3 mb-3">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default Products;
