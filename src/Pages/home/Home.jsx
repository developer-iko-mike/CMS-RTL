import React, { useState } from "react";
import NewProduct from "./components/NewProduct";
import ProductTable from "./components/ProductTable";

export default function Home() {

  const [allProduct , setAllProducts] = useState([])

  const getAllProduct = async () => {
    await fetch("http://localhost:8000/api/products/")
.then((res) => res.json())
.then((products) => setAllProducts(products));
}


  return (
    <>
      <NewProduct getAllProduct={getAllProduct} allProduct={allProduct} />
      <ProductTable getAllProduct={getAllProduct} allProducts={allProduct} />
    </>
  );
}
