import React, { useState } from "react";
import NewProduct from "./components/NewProduct";
import ProductTable from "./components/ProductTable";

export default function Home() {
  const [allProduct, setAllProducts] = useState([]);

  const getAllProduct = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/products/");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response isn't JSON");
      }

      const products = await response.json();
      setAllProducts(products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setAllProducts([]); // Set empty array instead of failing
    }
  };

  return (
    <>
      <NewProduct getAllProduct={getAllProduct} allProduct={allProduct} />
      <ProductTable getAllProduct={getAllProduct} allProducts={allProduct} />
    </>
  );
}
