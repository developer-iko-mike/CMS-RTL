import Header from "./AllRoute_Components/header/Header";
import SideBar from "./AllRoute_Components/sideBar/SideBar";
import routes from "./AllRoute_Components/routes";
import { Routes, Route, useRoutes } from "react-router-dom";
import Portal from "./AllRoute_Components/portal/Portal";
import DeleteModal from "./AllRoute_Components/deleteModal/DeleteModal";
import './App.css';

function App() {

  const router = useRoutes(routes);

  return (
    <>
      <DeleteModal />
      <div className="djp w100">
        <SideBar />
        <main className="plr2-5" style={{ marginRight: 250 }}>
          <Header />
          {router}
          <Portal />
        </main>
      </div>
    </>
  );
}

export default App;
