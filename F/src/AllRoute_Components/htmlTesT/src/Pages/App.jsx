import React from "react";
import Header from "../AllRoute_Components/header/Header";
import SideBar from "../AllRoute_Components/sideBar/SideBar";
import Products from "./home/Products";
import Comments from "./comments/Comments";
import Users from "./users/Users";
import Orders from "./orders/Orders";
import Offs from "./offs/Offs";
import routes from "../AllRoute_Components/routes";
import { Routes, Route, useRoutes } from "react-router-dom";
import Portal from "../AllRoute_Components/portal/Portal";
import DeleteModal from "../AllRoute_Components/deleteModal/DeleteModal";

export default function App() {
  let router = useRoutes(routes);

  return (
    <>
        <DeleteModal/>
      <div className="djp w100">
        <SideBar />
        <main className="plr2-5" style={{ marginRight: 250 }}>
          <Header />

          {/* wave 1 */}
          {/* 
    <Routes>
      <Route path="/" element={<Products/>} />
      <Route path="/comments" element={<Comments/>} />
      <Route path="/users" element={<Users/>} />
      <Route path="/orders" element={<Orders/>} />
      <Route path="/offs" element={<Offs/>} />
    </Routes> */}

          {/* wave 2 batter then wave 1 */}

          {router}
          <Portal />
        </main>
      </div>
    </>
  );
}
