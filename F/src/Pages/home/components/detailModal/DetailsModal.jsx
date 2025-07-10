// DetailsModal.jsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CloseIcon from '../../../../AllRoute_Components/CloseSVG'
import "./detailsModal.css";

export default function DetailsModal({
  showDetailsModal,
  showDetailsModalContainer,
  handleClosingDetails,
  product = { 
    colors: 1, 
    count: 0, 
    id: null, 
    img: '/img/empty.png', 
    popularity: 'normal', 
    price: 0, 
    productDesc: 'بدون توضیحات', 
    sale: 0, 
    title: 'بدون عنوان' 
  }
}) {

let {colors , count , id , img , popularity , price , productDesc , sale , title} = product

  useEffect(() => {
    const removeModalWithKey = e => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === "Backspace" || e.key === "Space"){
        handleClosingDetails()
      }
    };
    window.addEventListener("keyup" , removeModalWithKey)

    return () => window.removeEventListener("keyup" , removeModalWithKey)
  })


  return ReactDOM.createPortal(
    <div
      className={`parentModal_container pf z1000 w100vw h100vh djac tlong
        ${showDetailsModalContainer ? "parentModal_container--active " : ""}`}
    >
 
      <div
        className={`parentModal bgwhite br-7 ptb1-5 dfc tshor
          ${showDetailsModal ? "parentModal--active" : ""}`}
      >
        <div className="detailsImageContainer">
          <img 
            src={img} // آدرس تصویر واقعی
            alt={title}
            className="detailsProductImage"
          />
        </div>
          <div className="closingDiv pa t1 cp" onClick={() => handleClosingDetails()}>
            <CloseIcon/>
          </div>
        <table className="detailsTable">
          <thead>
            <tr>
              <th className="detailsTableHeader tr">ویژگی</th>
              <th className="detailsTableHeader tr">مقدار</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="detailsLabel">نام محصول</td>
              <td className="detailsValue">{title}</td>
            </tr>
            <tr>
              <td className="detailsLabel">قیمت</td>
              <td className="detailsValue">{price.toLocaleString()} تومان</td>
            </tr>
            <tr>
              <td className="detailsLabel">موجودی</td>
              <td className="detailsValue">{count} عدد</td>
            </tr>
            <tr>
              <td className="detailsLabel">محبوبیت</td>
              <td className="detailsValue">{popularity}</td>
            </tr>
            <tr>
              <td className="detailsLabel">میزان فروش</td>
              <td className="detailsValue">{sale.toLocaleString()}</td>
            </tr>
            <tr>
              <td className="detailsLabel">تعداد رنگ‌بندی</td>
              <td className="detailsValue">{colors} رنگ</td>
            </tr>
            <tr>
              <td className="detailsLabel">آدرس تصویر</td>
              <td className="detailsValue">
                <a 
                  href={img} 
                  target="_blank" 
                  rel="noreferrer"
                >
                  مشاهده فایل
                </a>
              </td>
            </tr>
            <tr>
              <td className="detailsLabel">توضیحات</td>
              <td className="detailsValue scrollable-description">
                {productDesc}
              </td>
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
