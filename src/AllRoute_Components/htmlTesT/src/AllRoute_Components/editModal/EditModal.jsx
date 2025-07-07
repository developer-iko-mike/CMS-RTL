import React, { useEffect } from "react";
import "./editModal.css";

export default function EditModal({
  children,
  onClose,
  onSubmit,
  showEditModalContainer,
  showEditModal,
  width
}) {
  useEffect(() => {
    const removeModalWithKey = (e) => {
      console.log(e);
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "Enter") {
        onSubmit();
      }
    };
    window.addEventListener("keyup", removeModalWithKey);

    return () => window.removeEventListener("keyup", removeModalWithKey);
  });
 
  return (
    <div
      className={`parentModal_container pf z1000 w100vw h100vh djac tlong
        ${showEditModalContainer ? "parentModal_container--active" : ""}`}
        
    >
      <form
        className={`parentModal bgwhite br-7 ptb1-5 dfc tshor ${
          showEditModal ? "parentModal--active" : ""
        }`}
        onSubmit={(e) => e.preventDefault()}
        style={{width: width}}
      >
        <h1 className="editModal_title mb1">لطفا اطلاعات جدید را وارد کنید</h1>

        {children}

        <div className="editModal_btns df mt1 g1">
          <button
            className="editModal_btn b btn1 br-5"
            onClick={() => onSubmit()}
          >
            ثبت اطلاعات جدید
          </button>
          <button className="editModal_btn b btn2" onClick={() => onClose()}>
            لغو
          </button>
        </div>
      </form>
    </div>
  );
}
