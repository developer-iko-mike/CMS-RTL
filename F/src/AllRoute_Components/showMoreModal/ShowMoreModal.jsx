import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./showMore.css";
import "../deleteModal/deleteModal.css";

export default function ShowMoreModal({
  showViewAll,
  showViewAllContainer,
  handleClosingViewAll,
  fullLengthComment,
}) {

        useEffect(() => {
          const handleKeyPress = (e) => {
            console.log(e.key)
            if (e.key === "Escape" || e.key === "Enter" || e.key === "Backspace") {
              handleClosingViewAll();
            }
          };
        
          window.addEventListener('keydown', handleKeyPress);
          
          return () => {
            window.removeEventListener('keydown', handleKeyPress);
          };
        }, [handleClosingViewAll]); // اضافه کردن وابستگی

  return ReactDOM.createPortal(
    <>
    {fullLengthComment && (
          <div
      className={`parentModal_container pf z1000 w100vw h100vh djac
        ${showViewAllContainer ? "parentModal_container--active" : ""}`}
    >
      <div
        className={`parentModal bgwhite br-7 ptb1-5 dfc g2 showAllModal
          ${showViewAll ? "parentModal--active" : ""}`}
      >
        <h1 className="modalDelete_title tc">{fullLengthComment}</h1>
        <div className="modalDelete_btns">
          <button
            className="modalDelete_btn modalDelete_rejactBtn b btn1 bgred bnone fs1-5 h3-5 br-5"
            onClick={handleClosingViewAll}
          >
            بستن
          </button>
        </div>
      </div>
    </div>
    )}
 </>,
       
    document.getElementById("parentsModal")
  );
}