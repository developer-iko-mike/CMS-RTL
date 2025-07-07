import React, { useState, useEffect } from "react";
import HomeSVG from "./SVGs/HouseFillSVG";
import ProductSVG from "./SVGs/ProductSVG";
import MailSVG from "./SVGs/MailSVG";
import UsersSVG from "./SVGs/UsersSVG";
import OffSVG from "./SVGs/OffSVG";
import Basket2 from "./SVGs/Basket3SVG";
import "./sideBar.css";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [isDark, setIsDark] = useState(false);
  const [activateItem , setActivateItem] = useState(1)
  const [sideBarList, setSideBarList] = useState([
    {
      id: 1,
      title: "صحفه اصلی",
      icon: <HomeSVG className={"w1-5 h1-5"} fill="#fff" />,
      link: '/'
    },
    {
      id: 2,
      title: "محصولات",
      icon: <ProductSVG className={"w1-5 h1-5"} fill="#fff" />,
      link: '/',
    },
    {
      id: 3,
      title: "کامنت ها",
      icon: <MailSVG className={"w1-5 h1-5"} fill="#fff" />,
      link: '/comments',
    },
    {
      id: 4,
      title: "کاربران",
      icon: <UsersSVG className={"w1-5 h1-5"} fill="#fff" />,
      link: '/users',
    },
    {
      id: 5,
      title: "سفاراشت",
      icon: <Basket2 className={"w1-5 h1-5"} fill="#fff" />,
      link: '/orders',
    },
    {
      id: 6,
      title: "تخفیف ها",
      icon: <OffSVG className={"w1-5 h1-5"} fill="#fff" />,
      link: '/offs',
    },
  ]);

  const setActivateHandler = id => {
    setActivateItem(id)
  };

  return (
    <aside className="bgblue cwhite h100vh pf t0 r0" style={{ width: "13vw" }}>
      <h3 className="sideBar_headerTiTle tc mt1 fs1-2 cfff">به داشبورد خود خوش امدید</h3>
      <ul className="sideBar_list plr1 ptb1">
        {sideBarList.map((item) => (
          <li
            className={`sideBar_listItem dac g-5 tshor mb05 cp ${activateItem === item.id ? "tswm sideBar_activate " : ""}`}
            key={item.id}
            onClick={() => setActivateHandler(item.id)}
          >
            {item.icon}
            <Link to={item.link} className="sideBar_listItemLink bnone bgnone fs1-5 tnone cfff">
              {item.title}{" "}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
