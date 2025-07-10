import React, { useEffect, useState } from "react";
import LightMode from "./SVGs/LightMode";
import DarkModeSVG from "./SVGs/DarkModeSVG";
import NotificationSVG from "./SVGs/NotificationSVG";
import './header.css'

export default function Header() {

 const [isDark , setIsDark] = useState(false)
//  const [adminToken , setAdminToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")
//  const [mainAdmin , setMainAdmin] = useState(null)

//  useEffect(() => {
//   document.body.classList.toggle("dark-theme")
//  },[isDark])

//  const getAdmin = () => {
//   fetch(`http://localhost:8000/api/admins/`, {
//     method: "GET",
//     headers: {"admin-token" : adminToken}
//   }).then(res => res.json())
//   .then(result => console.log(result))
//  }

//  useEffect(() => {getAdmin()} , [])
//  useEffect(() => {console.log(mainAdmin)} , [mainAdmin])

  return (
    <header className="djspac fdrr">
      <div className="left dac g1 fdrr">
        <button className="header_left__btn b btn1 w3 h3 djac pnone bgblue br-5" onClick={() => setIsDark(!isDark)}>{isDark ? <DarkModeSVG fill="#FFF"/> : <LightMode fill="#fff"/>}</button>
        <button className="header_left__btn b btn1 w3 h3 djac pnone bgblue br-5"><NotificationSVG fill="#FFF" width={24} height={24}/></button>
        <div className={`header_left__search br-7 djspac g-5 plr-2 ptb-2 fdrr bgfff ${isDark ? "bslh" : "bscu3"}`}>
          <button className="header_left__search___submit bgblue b btn4 h100 djac plr-7 tr cfff"> 
           جستجو کنید 
           </button>
          <input type="text" className="header_left__search___ipt mr05 fs1-2 fwMedium bnone h100 bgnone onone " placeholder="جستجو کن
          ...
          " />
        </div>
      </div>
      <div className="right dac g1-5">
        <img
          src="/header/banana.jpg"
          alt="admin photo"
          className="header_profile w3-5 h3-5 of br100 cp"
        />
        <div className="header_right">
          <h3 className="header_right__name fs1-5">محمدیکو</h3>
          <span className="header_right__job fs1-2 cd-gray o7">برنامه نویس فرانت</span>
        </div>
      </div>
    </header>
  );
}
