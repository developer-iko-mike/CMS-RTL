import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./deleteModal.css";

export default function DeleteModal({
  handleConfirmDelete, // اضافه شده
  showDeleteModal,
  showDeleteModalContainer,
  handleClosingDelete,
}) {

  // return (
  //   <div
  //     className={`
  //      modalDeleteContainer
  //      ${showDeleteModalContainer ? "modalDeleteContainer_activate" : ""}
  //      pf z1000 w100vw h100vh djac tlong`}
  //   >
  //     <div
  //       className={`modalDelete bgwhite br-7 ptb1-5 dfc g2  tshor
  //        ${showDeleteModal ? "modalDelete_activate" : ""}`}
  //     >
  //       <h1 className="modalDelete_title tc">ایا از حذف اطمینان دارید؟</h1>
  //       <div className="modalDelete_btns djc g1">
  //         <button
  //           className="modalDelete_btn b btn1 bnone fs1-5 h3-5 br-5"
  //           onClick={() => handleClosingDelete()}
  //         >
  //           بله
  //         </button>
  //         <button
  //           className="modalDelete_btn modalDelete_rejactBtn b btn1 bgred bnone fs1-5 h3-5 br-5"
  //           onClick={() => handleClosingDelete()}
  //         >
  //           خیر
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  // wave 2

  return ReactDOM.createPortal(
    <div
      className={`parentModal_container pf z1000 w100vw h100vh djac
        ${showDeleteModalContainer ? "parentModal_container--active" : ""}`}
    >
      <div
        className={`parentModal bgwhite br-7 ptb1-5 dfc g2
          ${showDeleteModal ? "parentModal--active" : ""}`}
      >
        <h1 className="modalDelete_title tc">ایا از حذف اطمینان دارید؟</h1>
        <div className="modalDelete_btns djc g1">
          <button
            className="modalDelete_btn b btn1 bnone fs1-5 h3-5 br-5"
            onClick={handleConfirmDelete} // تغییر داده شد
          >
            بله
          </button>
          <button
            className="modalDelete_btn modalDelete_rejactBtn b btn1 bgred bnone fs1-5 h3-5 br-5"
            onClick={handleClosingDelete}
          >
            خیر
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("parentsModal")
  );
}