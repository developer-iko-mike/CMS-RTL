import React, { useEffect, useState } from "react";
import "./users.css";
import Error from "../../AllRoute_Components/error/Error";
import DeleteModal from "../../AllRoute_Components/deleteModal/DeleteModal";
import EditModal from "../../AllRoute_Components/editModal/EditModal";
import DetailModal from "./components/detailModal/DetailsModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Users() {
  const API_BASE_URL = "http://localhost:8000/api/users/";

  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Delete Modal States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteModalContainer, setShowDeleteModalContainer] =
    useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Edit Modal States
  const [showEditModalContainer, setShowEditModalContainer] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  // Detail Modal States
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showInfoModalContainer, setShowInfoModalContainer] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form Fields
  const [formData, setFormData] = useState({
    firsname: "",
    lastname: "",
    username: "",
    password: "",
    phone: "",
    city: "",
    email: "",
    address: "",
    score: "",
    buy: "",
  });

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setAllUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error("خطا در دریافت اطلاعات کاربران", {
        position: "bottom-right",
        className: "ffunstI",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Delete User Handlers
  const handleShowDeleteModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
    setTimeout(() => {
      setShowDeleteModalContainer(true);
    }, 300);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setTimeout(() => {
      setShowDeleteModalContainer(false);
    }, 300);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${userToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      await getAllUsers();
      toast.success("کاربر با موفقیت حذف شد!", {
        className: "ffunstI",
        position: "bottom-right",
      });
      handleCloseDeleteModal();
    } catch (err) {
      toast.error("خطا در حذف کاربر", {
        className: "ffunstI",
        position: "bottom-right",
      });
    }
  };

  // Edit User Handlers
  const handleShowEditModal = (user) => {
    setUserToEdit(user);
    setFormData({
      ...user,
      buy: typeof user.buy === "string" ? parseInt(user.buy.replace(/,/g, "")) : user.buy,
    });
    setShowEditModal(true);
    setTimeout(() => {
      setShowEditModalContainer(true);
    }, 300);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setTimeout(() => {
      setShowEditModalContainer(false);
    }, 300);
  };

  const handleSubmitEditModal = async () => {
    try {
      if (
formData.firsname &&
formData.lastname &&
formData.username &&
formData.password &&
formData.phone &&
formData.city &&
formData.email &&
formData.address &&
formData.score &&
formData.buy
      ) {
        const response = await fetch(`${API_BASE_URL}${userToEdit.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to update user");
        }

        await getAllUsers();
        toast.success("کاربر با موفقیت به‌روزرسانی شد!", {
          className: "ffunstI",
          position: "bottom-right",
        });
        handleCloseEditModal();
      } else {
        console.log("values is not valid")
      }
    } catch (err) {
      toast.error("خطا در به‌روزرسانی کاربر", {
        className: "ffunstI",
        position: "bottom-right",
      });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
  
    // اگر فیلد مورد نظر buy یا score بود، کاماها را حذف و به عدد تبدیل کنید
    if (name === "buy" || name === "score") {
      newValue = value.replace(/,/g, "");
      if (!isNaN(newValue)) {
        newValue = Number(newValue);
      } else {
        newValue = formData[name]; // اگر مقدار نامعتبر بود، مقدار قبلی را نگه دارید
      }
    }
  
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // User Detail Handlers
  const handleShowInfoModal = (user) => {
    setSelectedUser(user);
    setShowInfoModal(true);
    setTimeout(() => {
      setShowInfoModalContainer(true);
    }, 300);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    setTimeout(() => {
      setShowInfoModalContainer(false);
    }, 300);
  };

  if (loading) {
    return <div className="loading">در حال بارگذاری...</div>;
  }

  if (error && allUsers.length === 0) {
    return <Error title={"خطا در دریافت اطلاعات کاربران"} />;
  }

  return (
    <div className="mt2">
      <h1 className="orderTiTle mb1-5">لیست کاربرها</h1>

      {allUsers.length > 0 ? (
        <>
          <table className="product-table">
            <thead>
              <tr className="table-header">
                <th className="price-col table_td">نام و نام خانوادگی</th>
                <th className="image-col table_td">نام کاربری</th>
                <th className="name-col table_td">رمز عبور</th>
                <th className="stock-col table_td">شماره تماس</th>
                <th className="actions-col table_td">ایمیل</th>
                <th className="actions-col table_td">اکشن ها</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user.id} className="table-row">
                  <td className="name-cell table_td fs">
                    {user.firsname} {user.lastname}
                  </td>
                  <td className="image-cell fs table_td">{user.username}</td>
                  <td className="stock-cell table_td">
                    {user.password}
                  </td>
                  <td className="stock-cell table_td">{user.phone}</td>
                  <td className="stock-cell table_td">{user.email}</td>
                  <td className="actions-cell table_td">
                    <div className="action-buttons">
                      <button
                        className="b btn1 fg h3-5 fs br-5"
                        onClick={() => handleShowInfoModal(user)}
                      >
                        مشاهده جزییات
                      </button>
                      <button
                        className="b btn1 fg h3-5 fs br-5"
                        onClick={() => handleShowEditModal(user)}
                      >
                        ویرایش
                      </button>
                      <button
                        className="b btn1 fg h3-5 fs bgred hbgd-red bnone br-5"
                        onClick={() => handleShowDeleteModal(user)}
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Detail Modal */}
          <DetailModal
            showDetailsModal={showInfoModal}
            showDetailsModalContainer={showInfoModalContainer}
            handleClosingDetails={handleCloseInfoModal}
            user={selectedUser}
          />

          {/* Delete Modal */}
          <DeleteModal
            handleConfirmDelete={handleConfirmDelete}
            showDeleteModal={showDeleteModal}
            showDeleteModalContainer={showDeleteModalContainer}
            handleClosingDelete={handleCloseDeleteModal}
          />

          {/* Edit Modal */}
          <EditModal
            onClose={handleCloseEditModal}
            onSubmit={handleSubmitEditModal}
            showEditModalContainer={showEditModalContainer}
            showEditModal={showEditModal}
            width={"auto"}
          >
            <table className="detailsTable">
              <thead>
                <tr>
                  <th className="detailsTableHeader">ویژگی</th>
                  <th className="detailsTableHeader">مقدار</th>
                  <th className="detailsTableHeader">ویژگی</th>
                  <th className="detailsTableHeader">مقدار</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="detailsLabel editlabel">نام</td>
                  <td className="detailsValue">
                    <input
                      type="text"
                      className="editModalIpt"
                      name="firsname"
                      value={formData.firsname}
                      onChange={handleFormChange}
                      autoFocus
                    />
                  </td>
                  <td className="detailsLabel editlabel">نام خانوادگی</td>
                  <td className="detailsValue">
                    <input
                      type="text"
                      className="editModalIpt"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleFormChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td className="detailsLabel editlabel">نام کاربری</td>
                  <td className="detailsValue">
                    <input
                      type="text"
                      className="editModalIpt"
                      name="username"
                      value={formData.username}
                      onChange={handleFormChange}
                    />
                  </td>
                  <td className="detailsLabel editlabel">رمز عبور</td>
                  <td className="detailsValue">
                    <input
                      type="text"
                      className="editModalIpt"
                      name="password"
                      value={formData.password}
                      onChange={handleFormChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td className="detailsLabel editlabel">شهر</td>
                  <td className="detailsValue">
                    <input
                      type="text"
                      className="editModalIpt"
                      name="city"
                      value={formData.city}
                      onChange={handleFormChange}
                    />
                  </td>
                  <td className="detailsLabel editlabel">ایمیل</td>
                  <td className="detailsValue">
                    <input
                      type="email"
                      className="editModalIpt"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td className="detailsLabel editlabel">امتیاز</td>
                  <td className="detailsValue">
                    <input
                      type="text"
                      className="editModalIpt"
                      name="score"
                      value={formData.score}
                      onChange={handleFormChange}
                    />
                  </td>
                  <td className="detailsLabel editlabel">میزان خرید</td>
                  <td className="detailsValue">
                    <input
                      type="text"
                      className="editModalIpt"
                      name="buy"
                      value={formData.buy.toLocaleString()}
                      onChange={handleFormChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td className="detailsLabel editlabel">آدرس</td>
                  <td className="detailsValue">
                    <input
                      type="text"
                      className="editModalIpt "
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                    />
                  </td>
                  <td className="detailsLabel editlabel">شماره تماس</td>
                  <td className="detailsValue">
                    <input
                      type="tel"
                      className="editModalIpt"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </EditModal>

          <ToastContainer />
        </>
      ) : (
        <Error title={"هیچ کاربری یافت نشد"} />
      )}
    </div>
  );
}
