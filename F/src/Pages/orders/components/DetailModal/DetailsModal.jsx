// DetailsModal.jsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "../../../../AllRoute_Components/CloseSVG";
import "./detailsModal.css";

export default function DetailsModal({
  showDetailsModal,
  showDetailsModalContainer,
  handleClosingDetails,
  order, // حذف مقدار پیشفرض از اینجا
  time,
  finalPrice,
}) {
  // اضافه کردن مقدار پیشفرض در صورت null یا undefined بودن order

  const orderData = order || {
    userID: "ثبت نشده !",
    productID: "ثبت نشده !",
    isActive: false,
    date: time().today,
    hour: time().now,
    price: 0,
    off: 0,
    sale: 0,
    popularity: 0,
    count: 0,
  };

  const {
    userID,
    productID,
    isActive,
    date,
    hour,
    price,
    off,
    sale,
    popularity,
    count,
  } = orderData;

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
              <td className="detailsLabel"> نام خریدار</td>
              <td className="detailsValue">{userID}</td>
            </tr>
            <tr>
              <td className="detailsLabel">نام محصول</td>
              <td className="detailsValue">{productID} </td>
            </tr>
            <tr>
              <td className="detailsLabel"> وعضیت فعال محصول</td>
              <td className="detailsValue">
                {Boolean(isActive) ? "فعال" : "غیرفعال"}{" "}
              </td>
            </tr>
            <tr>
              <td className="detailsLabel"> تاریخ سفارش</td>
              <td className="detailsValue">{date}</td>
            </tr>
            <tr>
              <td className="detailsLabel"> ساعت سفارش</td>
              <td className="detailsValue">{hour}</td>
            </tr>
            <tr>
              <td className="detailsLabel"> قیمت اولیه</td>
              <td className="detailsValue">{price.toLocaleString()} </td>
            </tr>
            <tr>
              <td className="detailsLabel"> میزان تخفیف</td>
              <td className="detailsValue">% {off} </td>
            </tr>
            <tr>
              <td className="detailsLabel"> قیمت با تخفیف</td>
              <td className="detailsValue">
                {order ? finalPrice(order) : "ناموجود"}
              </td>
            </tr>
            <tr>
              <td className="detailsLabel"> میزان خرید کاربر</td>
              <td className="detailsValue">
                {typeof sale === "number" ? sale.toLocaleString() : sale}
              </td>
            </tr>
            <tr>
              <td className="detailsLabel"> میزان محبوبیت</td>
              <td className="detailsValue">{popularity} </td>
            </tr>
            <tr>
              <td className="detailsLabel"> تعداد محصول</td>
              <td className="detailsValue">{count} </td>
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
