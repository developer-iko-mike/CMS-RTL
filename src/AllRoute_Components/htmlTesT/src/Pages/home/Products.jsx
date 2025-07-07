import React from "react";
import NewProduct from "./components/NewProduct";
import ProductTable from "./components/ProductTable";
import Error from "../../AllRoute_Components/error/Error";

export default function Home() {
  return (
    <>
      <NewProduct />
      <div className="mt2"></div>
      <Error title={"هیچ محصولی یافت نشد"} />
      <ProductTable />
    </>
  );
}
