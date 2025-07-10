import React, { useEffect, useState } from "react";
import "./comments.css";
import "../home/home.css";
import Error from "../../AllRoute_Components/error/Error";
import TruncatedComment from "./components/TruncatedComment";
import ShowMoreModal from "../../AllRoute_Components/showMoreModal/ShowMoreModal";
import DeleteModal from "../../AllRoute_Components/deleteModal/DeleteModal";
import RejectModal from "../../AllRoute_Components/deleteModal/DeleteModal";
import AcceptModal from "../../AllRoute_Components/deleteModal/DeleteModal";
import EditModal from "../../AllRoute_Components/editModal/EditModal";
import { ToastContainer, toast } from "react-toastify";

export default function Comments() {
  const mainRoute = "http://localhost:8000/api/comments/";
  const [allComment, setAllComment] = useState([]);
  const [showViewAll, setShowViewAll] = useState(false);
  const [showViewAllContainer, setShowViewAllContainer] = useState(false);
  const [mainComment, setMainComment] = useState("");
  const [mainCommentID, setMainCommentID] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteModalContainer, setShowDeleteModalContainer] = useState(false);
  const [showEditModalContainer, setShowEditModalContainer] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAcceptsModalContainer, setShowAcceptsModalContainer] = useState(false);
  const [showAcceptsModal, setShowAcceptsModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showContainerRejectModal, setShowContainerRejectModal] = useState(false);

  const handleShowRejectModal = comment => {
    setMainCommentID(comment.id)
    setMainComment(comment.body)
    setShowRejectModal(true);
    setTimeout(() => {
      setShowContainerRejectModal(true);
    }, 300);
  };

  const handleRejectModal = () => {
    console.log(mainRoute + mainCommentID);

    fetch(mainRoute + mainCommentID , {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        body: mainComment,
        isAccept: 0,
      })
      }).then(res => {
        console.log(res);
        if (res.ok) {
          fetchData();
          handleClosingAcceptModal();
          toast.success("کامنت با موفقیت رد شد!", {
            className: "ffunstI",
            position: "bottom-right",
          });
        }
    })

    handleClosingRejectModal();
  };

  const handleClosingRejectModal = () => {
    setShowRejectModal(false);
    setTimeout(() => {
      setShowContainerRejectModal(false);
    }, 300);
  };

  const handleShowAccept = (comment) => {
    setMainCommentID(comment.id);
    setMainComment(comment.body);
    setShowAcceptsModal(true);
    setTimeout(() => {
      setShowAcceptsModalContainer(true);
    }, 300);
  };
  const handleConfirmAcceptModal = () => {
    fetch(mainRoute + mainCommentID, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: mainComment,
        isAccept: 1,
      }),
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        fetchData();
        handleClosingAcceptModal();
        toast.success("کامنت با موفقیت تایید شد!", {
          className: "ffunstI",
          position: "bottom-right",
        });
      }
    });
  };
  const handleClosingAcceptModal = () => {
    setShowAcceptsModal(false);
    setTimeout(() => {
      setShowAcceptsModalContainer(false);
    }, 300);
  };

  const handleClosingEdit = () => {
    setShowEditModal(false);
    setTimeout(() => {
      setShowEditModalContainer(false);
    }, 300);
  };
  const handleShowEditModal = (comment) => {
    setMainComment(comment.body + " ");
    setMainCommentID(comment.id);
    setShowEditModal(true);
    setTimeout(() => {
      setShowEditModalContainer(true);
    }, 300);
  };
  const handleSubmitEdit = () => {
    fetch(mainRoute + mainCommentID, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: mainComment,
      }),
    }).then((res) => {
      if (res.ok) {
        fetchData();
        handleClosingEdit();
        toast.success("کامنت با موفقیت اپدیت شد!", {
          className: "ffunstI",
          position: "bottom-right",
        });
      }
    });
  };

  const handleClosingDelete = () => {
    setShowDeleteModal(false);
    setTimeout(() => {
      setShowDeleteModalContainer(false);
    }, 300);
  };
  const handleConfirmDelete = async () => {
    await fetch(mainRoute + mainCommentID, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        fetchData();
        toast.success("کامنت با موفقیت حذف شد!", {
          // اینجا مستقیما toast رو صدا زدی
          className: "ffunstI",
          position: "bottom-right",
        });
        fetchData();
        handleClosingDelete();
      }
    });
  };

  const handleShowDelete = (comment) => {
    setMainCommentID(comment.id);
    setShowDeleteModal(true);
    setTimeout(() => {
      setShowDeleteModalContainer(true);
    }, 300);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(mainRoute);
      if (!response.ok) throw new Error("خطا در دریافت داده‌ها");
      const data = await response.json();
      setAllComment(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleClosingViewAll = () => {
    setShowViewAll(false);
    setTimeout(() => {
      setShowViewAllContainer(false);
    }, 300);
  };
  const handleShowViewAll = (comment) => {
    setMainComment(comment.body);
    setShowViewAll(true);
    setTimeout(() => {
      setShowViewAllContainer(true);
    }, 300);
  };

  return (
    <div className="mt2">
      <h1 className="comment_headerTiTle mb1-5">لیست کامنت ها</h1>

      {allComment.length ? (
        <table className="product-table">
          <thead>
            <tr className="table-header">
              <th className="price-col table_td">کامنت</th>
              <th className="image-col table_td">محصول</th>
              <th className="name-col table_td">اسم</th>
              <th className="stock-col table_td">تاریخ</th>
              <th className="actions-col table_td">ساعت</th>
              <th className="actions-col table_td">اکشن ها</th>
            </tr>
          </thead>
          <tbody>
            {allComment.map((comment) => (
              <tr key={comment.id} className="table-row">
                <td className="price-cell table_td fs">
                  <TruncatedComment text={comment.body} maxLength={35} />
                </td>
                <td className="name-cell table_td fs">{comment.productID}</td>
                <td className="image-cell fs table_td">{comment.userID}</td>
                <td className="stock-cell table_td">{comment.date}</td>
                <td className="stock-cell table_td">{comment.hour}</td>
                <td className="actions-cell table_td">
                  <div className="action-buttons">
                    <button
                      className="b btn1 fg h3-5 fs br-5"
                      onClick={() => handleShowViewAll(comment)} // تغییر به arrow function
                    >
                      مشاهده متن کامل کامنت
                    </button>
                    <button
                      className="b btn1 fg h3-5 fs br-5 "
                      onClick={() => handleShowEditModal(comment)}
                    >
                      ویرایش
                    </button>
                    <button
                      className="b btn1 fg h3-5 fs bnone br-5"
                      onClick={() => {}}
                    >
                      پاسخ
                    </button>
                    {!comment.isAccept ? (
                      <button
                        className="b btn1 fg h3-5 fs bggreen hbgd-gren bnone br-5"
                        onClick={() => handleShowAccept(comment)}
                      >
                        تایید
                      </button>
                    ) : (
                      <button
                        className="b btn1 fg h3-5 fs bggreen hbgd-gren bnone br-5"
                        onClick={() => handleShowRejectModal(comment)}
                      >
                        رد
                      </button>
                    )}

                    <button
                      className="b btn1 fg h3-5 fs bgred hbgd-red bnone br-5"
                      onClick={() => handleShowDelete(comment)}
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <AcceptModal
            handleConfirmDelete={handleConfirmAcceptModal}
            showDeleteModal={showAcceptsModal}
            showDeleteModalContainer={showAcceptsModalContainer}
            handleClosingDelete={handleClosingAcceptModal}
            title="ایا از تایید کامنت اطمینان دارید ؟"
          />
          <ShowMoreModal
            showViewAll={showViewAll}
            showViewAllContainer={showViewAllContainer}
            handleClosingViewAll={handleClosingViewAll}
            fullLengthComment={mainComment}
          />
          <DeleteModal
            handleConfirmDelete={handleConfirmDelete} // اضافه شده
            showDeleteModal={showDeleteModal}
            showDeleteModalContainer={showDeleteModalContainer}
            handleClosingDelete={handleClosingDelete}
          />
          <RejectModal
            handleConfirmDelete={handleRejectModal} // اضافه شده
            showDeleteModal={showRejectModal}
            showDeleteModalContainer={showContainerRejectModal}
            handleClosingDelete={handleClosingRejectModal}
            title="ایا از رد کامنت اطمینان دارید ؟"
          />
          <ToastContainer />
          <EditModal
            onClose={handleClosingEdit}
            onSubmit={handleSubmitEdit}
            showEditModalContainer={showEditModalContainer}
            showEditModal={showEditModal}
            width={"auto"}
          >
            <textarea
              value={mainComment}
              onChange={(e) => setMainComment(e.target.value)}
              className="maxWH fs p1 bgy onone br-5"
              autoFocus
            />
          </EditModal>
        </table>
      ) : (
        <Error title={"هیچ کامنتی پیدا نشد"} />
      )}
    </div>
  );
}
