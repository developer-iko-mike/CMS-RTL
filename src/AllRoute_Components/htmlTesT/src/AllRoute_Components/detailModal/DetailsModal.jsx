// DetailsModal.jsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import CloseIcon from '../CloseSVG'
import "./detailsModal.css";

export default function DetailsModal({
  showDetailsModal,
  showDetailsModalContainer,
  handleClosingDetails,
}) {

  useEffect(() => {
    const removeModalWithKey = e => {
      console.log(e)
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
        ${showDetailsModalContainer ? "parentModal_container--active {" : ""}`}
    >
      <div
        className={`parentModal bgwhite br-7 ptb1-5 dfc tshor
          ${showDetailsModal ? "parentModal--active" : ""}`}
      >
        <div className="detailsImageContainer">
          <img 
            src="/some-image/mouse.jpg" // آدرس تصویر واقعی
            alt="محصول"
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
              <td className="detailsValue">لپ تاپ ایسوس ROG</td>
            </tr>
            <tr>
              <td className="detailsLabel">قیمت</td>
              <td className="detailsValue">12,000,000 تومان</td>
            </tr>
            <tr>
              <td className="detailsLabel">موجودی</td>
              <td className="detailsValue">15 عدد</td>
            </tr>
            <tr>
              <td className="detailsLabel">محبوبیت</td>
              <td className="detailsValue">عالی</td>
            </tr>
            <tr>
              <td className="detailsLabel">میزان فروش</td>
              <td className="detailsValue">زیاد</td>
            </tr>
            <tr>
              <td className="detailsLabel">تعداد رنگ‌بندی</td>
              <td className="detailsValue">3 رنگ</td>
            </tr>
            <tr>
              <td className="detailsLabel">آدرس تصویر</td>
              <td className="detailsValue">
                <a 
                  href="/some-image/no-image.png" 
                  target="_blank" 
                  rel="noreferrer"
                >
                  مشاهده فایل
                </a>
              </td>
            </tr>
            <tr>
              <td className="detailsLabel">توضیحات</td>
              <td className="detailsValue">
                لپ تاپ گیمینگ با مشخصات فنی بالا - مناسب برای طراحی و بازی
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