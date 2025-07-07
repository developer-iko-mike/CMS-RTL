import React, { useState, useEffect } from "react";
import "../home.css";
import DeleteModal from "../../../AllRoute_Components/deleteModal/DeleteModal";
import DetailsModal from "../../../AllRoute_Components/detailModal/DetailsModal";
import EditModal from "../../../AllRoute_Components/editModal/EditModal";

export default function ProductTable() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteModalContainer, setShowDeleteModalContainer] =
    useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDetailsModalContainer, setShowDetailsModalContainer] =
    useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditModalContainer, setShowEditModalContainer] = useState(false);

  const handleConfirmEdit = () => {
    setShowEditModal(false);
    setTimeout(() => {
      setShowEditModalContainer(false);
    }, 300);
  };

  const handleClosingEdit = () => {
    setShowEditModal(false);
    setTimeout(() => {
      setShowEditModalContainer(false);
    }, 300);
  };

  const handleShowEdit = () => {
    setShowEditModalContainer(true);
    setTimeout(() => {
      setShowEditModal(true);
    }, 50);
  };
  const handleShowDetails = () => {
    setShowDetailsModalContainer(true);
    setTimeout(() => {
      setShowDetailsModal(true);
    }, 50);
  };

  const handleClosingDetails = () => {
    setShowDetailsModal(false);
    setTimeout(() => {
      setShowDetailsModalContainer(false);
    }, 300);
  };

  const handleShowDelete = () => {
    setShowDeleteModalContainer(true);
    setTimeout(() => {
      setShowDeleteModal(true);
    }, 500);
  };
  const handleClosingDelete = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    // کدهای حذت آیتم اینجا قرار میگیرد
    console.log("آیتم حذف شد");
    handleClosingDelete();
  };

  useEffect(() => {
    if (!showDeleteModal) {
      setTimeout(() => {
        setShowDeleteModalContainer(false);
      }, 500);
    }
  }, [showDeleteModal]);

  return (
    <>
      <div className="table-container mb1-5">
        <table className="product-table">
          <thead>
            <tr className="table-header">
              <th className="image-col">عکس</th>
              <th className="name-col">اسم</th>
              <th className="price-col">قیمت</th>
              <th className="stock-col">موجودی</th>
              <th className="actions-col">تغییرات</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="image-cell">
                <img
                  src="/some-image/airpad.jpg"
                  alt="airpad"
                  className="product-image"
                />
              </td>
              <td className="name-cell">ایرپاد اصل</td>
              <td className="price-cell">800,000 تومان</td>
              <td className="stock-cell">82</td>
              <td className="actions-cell">
                <div className="action-buttons">
                  <button
                    className="action-btn details"
                    onClick={() => handleShowDetails()}
                  >
                    جزییات
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleShowDelete()}
                  >
                    حذف
                  </button>
                  <button
                    className="action-btn edit"
                    onClick={() => handleShowEdit()}
                  >
                    ویرایش
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <DeleteModal
        handleConfirmDelete={handleConfirmDelete}
        showDeleteModal={showDeleteModal}
        showDeleteModalContainer={showDeleteModalContainer}
        handleClosingDelete={handleClosingDelete}
      />
      <DetailsModal
        showDetailsModal={showDetailsModal}
        showDetailsModalContainer={showDetailsModalContainer}
        handleClosingDetails={handleClosingDetails}
      />
      <EditModal
        onClose={handleClosingEdit}
        onSubmit={handleConfirmEdit}
        showEditModalContainer={showEditModalContainer}
        showEditModal={showEditModal}
        width={"45rem"}
      >
        <div className="detailsImageContainer editImageContainer oa">
          <img
            src="/some-image/mouse.jpg" // آدرس تصویر واقعی
            alt="محصول"
            className="detailsProductImage"
            style={{maxHeight: 225}}
          />
        </div>    <table className="detailsTable">
      <thead>
        <tr>
          <th className="detailsTableHeader">ویژگی</th>
          <th className="detailsTableHeader">مقدار</th>
          <th className="detailsTableHeader">ویژگی</th>
          <th className="detailsTableHeader">مقدار</th>
        </tr>
      </thead>
      <tbody>
        {/* ردیف اول */}
        <tr>
          <td className="detailsLabel  editlabel">نام محصول</td>
          <td className="detailsValue">
            <input type="text" className="editModalIpt" value="لپ تاپ ایسوس ROG" />
          </td>
          <td className="detailsLabel  editlabel">قیمت به تومان</td>
          <td className="detailsValue">
            <input type="text" className="editModalIpt" value="12,000,000"/>
          </td>
        </tr>

        {/* ردیف دوم */}
        <tr>
          <td className="detailsLabel  editlabel">موجودی</td>
          <td className="detailsValue">
            <input type="text" className="editModalIpt" value="15" />
          </td>
          <td className="detailsLabel  editlabel">محبوبیت</td>
          <td className="detailsValue">
            <select className="editModalIpt plr1" value="عالی">
    <option value="بد">بد</option>
    <option value="عادی">عادی</option>
    <option value="عالی">عالی</option>
            </select>
          </td>
        </tr>

        {/* ردیف سوم */}
        <tr>
          <td className="detailsLabel  editlabel">میزان فروش</td>
          <td className="detailsValue">
            <select className="editModalIpt plr1" value="زیاد" >
<option value="کم">کم</option>
<option value="متوسط">متوسط</option>
<option value="زیاد">زیاد</option>
            </select>
          </td>
          <td className="detailsLabel  editlabel">تعداد رنگ‌بندی</td>
          <td className="detailsValue">
            <input type="text" className="editModalIpt" value="3" />
          </td>
        </tr>

        {/* ردیف‌های تک ستونی */}
        <tr>
          <td className="detailsLabel  editlabel">آدرس تصویر</td>
          <td className="detailsValue" colSpan="3">
            <input
              type="text"
              className="editModalIpt tl"
              value="some-image/mouse.jpg"
            />
          </td>
        </tr>
        
        <tr>
          <td className="detailsLabel  editlabel">توضیحات</td>
          <td className="detailsValue" colSpan="3">
            <textarea
              className="editModalIpt editModalTexTarea"
              value="لپ تاپ گیمینگ با مشخصات فنی بالا - مناسب برای طراحی و بازی"
              cols={"100%"}
            />
          </td>
        </tr>
      </tbody>
    </table>

      </EditModal>
    </>
  );
}
