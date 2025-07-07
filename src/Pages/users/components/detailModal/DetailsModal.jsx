// DetailsModal.jsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "../../../../AllRoute_Components/CloseSVG";
import "./detailsModal.css";

export default function DetailsModal({
  showDetailsModal,
  showDetailsModalContainer,
  handleClosingDetails,
  user, // حذف مقدار پیشفرض از اینجا
}) {
  // اضافه کردن مقدار پیشفرض در صورت null یا undefined بودن user
  const userData = user || {
    firsname: "ثبت نشده !",
    lastname: "ثبت نشده !",
    username: "ثبت نشده !",
    password: "ثبت نشده !",
    phone: "ثبت نشده !",
    city: "ثبت نشده !",
    email: "ثبت نشده !",
    address: "ثبت نشده !",
    score: "ثبت نشده !",
    buy: "ثبت نشده !",
  };

  // استخراج از userData به جای user
  const {
    firsname,
    lastname,
    username,
    password,
    phone,
    city,
    email,
    address,
    score,
    buy,
  } = userData;

  useEffect(() => {
    const removeModalWithKey = (e) => {
      if (
        e.key === "Enter" ||
        e.key === "Escape" ||
        e.key === "Backspace" ||
        e.key === "Space"
      ) {
        handleClosingDetails();
      }
    };
    window.addEventListener("keyup", removeModalWithKey);

    return () => window.removeEventListener("keyup", removeModalWithKey);
  });

  return ReactDOM.createPortal(
    <div
      className={`parentModal_container pf z1000 w100vw h100vh djac tlong
        ${showDetailsModalContainer ? "parentModal_container--active " : ""}`}
    >
      <div
        className={`parentModal bgwhite br-7 ptb1-5 dfc tshor
          ${showDetailsModal ? "parentModal--active" : ""}`}
      >
        <table className="detailsTable">
          <thead>
            <tr>
              <th className="detailsTableHeader tr">ویژگی</th>
              <th className="detailsTableHeader tr pr">
                <span>مقدار</span>
                <div
                  className="closingDiv pa l1 t1 cp"
                  onClick={() => handleClosingDetails()}
                >
                  <CloseIcon />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="detailsLabel">اسم کاربر</td>
              <td className="detailsValue">{firsname}</td>
            </tr>
            <tr>
              <td className="detailsLabel">نام خانوادگی</td>
              <td className="detailsValue">{lastname} </td>
            </tr>
            <tr>
              <td className="detailsLabel">نام کاربری</td>
              <td className="detailsValue">{username} </td>
            </tr>
            <tr>
              <td className="detailsLabel">رمز عبور</td>
              <td className="detailsValue">{password}</td>
            </tr>
            <tr>
              <td className="detailsLabel"> شماره تماس</td>
              <td className="detailsValue">{phone}</td>
            </tr>
            <tr>
              <td className="detailsLabel"> ایمیل</td>
              <td className="detailsValue">{email} </td>
            </tr>
            <tr>
              <td className="detailsLabel"> امتیاز کاربر</td>
              <td className="detailsValue">{score} </td>
            </tr>
            <tr>
              <td className="detailsLabel"> میزان خرید کاربر</td>
              <td className="detailsValue">
                {typeof buy === "number" ? buy.toLocaleString() : buy}
              </td>
            </tr>
            <tr>
              <td className="detailsLabel"> محل زندگی (شهر)</td>
              <td className="detailsValue">{city} </td>
            </tr>
            <tr>
              <td className="detailsLabel"> آدرس کاربر</td>
              <td className="detailsValue">{address} </td>
            </tr>
          </tbody>
        </table>

        {/* <button 
          className="detailsCloseBtn"
          onClick={handleClosingDetails}
        >
          بستن
        </button> */}
      </div>
    </div>,
    document.getElementById("parentsModal")
  );
}
