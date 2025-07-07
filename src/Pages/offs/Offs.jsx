import React, { useEffect, useState } from "react";
import "./offs.css";
import Error from "../../AllRoute_Components/error/Error";
import RejectModal from "../../AllRoute_Components/deleteModal/DeleteModal";
import AcceptModal from "../../AllRoute_Components/deleteModal/DeleteModal";
import DeleteModal from "../../AllRoute_Components/deleteModal/DeleteModal";
import { ToastContainer, toast } from "react-toastify";

export default function Offs() {
  const mainRoute = "http://localhost:8000/api/offs/";

  const [allOff, setAllOff] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteModalContainer, setShowDeleteModalContainer] =
    useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showAcceptModalContainer, setShowAcceptModalContainer] =
    useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRejectModalContainer, setShowRejectModalContainer] =
    useState(false);
  const [mainOffID, setMainOffID] = useState(null);

  const getAllOff = () => {
    fetch(mainRoute)
      .then((res) => res.json())
      .then((ret) => setAllOff(ret));
  };

  const handleShowRejectModal = (off) => {
    setMainOffID(off.id);
    setShowRejectModal(true);
    setTimeout(() => {
      setShowRejectModalContainer(true);
    }, 300);
  };

  const handleCloseRejectModal = () => {
    setShowRejectModal(false);
    setTimeout(() => {
      setShowRejectModalContainer(false);
    }, 300);
  };
  const handleShowAcceptModal = (off) => {
    setMainOffID(off.id);
    setShowAcceptModal(true);
    setTimeout(() => {
      setShowAcceptModalContainer(true);
    }, 300);
  };
  const handleCloseAcceptModal = () => {
    setShowAcceptModal(false);
    setTimeout(() => {
      setShowAcceptModalContainer(false);
    }, 300);
  };
  const handleShowDeleteModal = (off) => {
    setMainOffID(off.id);
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

  const handleConfirmReject = () => {
    fetch(`${mainRoute}active-off/${mainOffID}/1` , {
      method: "PUT"
    }).then(res => {
      console.log(res);
      if (res.ok) {
        getAllOff();
        handleCloseRejectModal();
        toast.success("کد تخفیف با موفقیت رد شد!", {
          className: "ffunstI",
          position: "bottom-right",
        });
      } else {
        handleCloseRejectModal();
        toast.error("رد کد تخفیف با خطا مواجه شد!", {
          className: "ffunstI",
          position: "bottom-right",
        });
      }
    })

  };
  const handleConfirmAccept = () => {
    fetch(`${mainRoute}active-off/${mainOffID}/0` , {
      method: "PUT"
    }).then(res => {
            console.log(res);
            if (res.ok) {
              getAllOff();
              handleCloseAcceptModal();
              toast.success("کد تخفیف با موفقیت رد شد!", {
                className: "ffunstI",
                position: "bottom-right",
              });
            } else {
              handleCloseAcceptModal();
              toast.error("رد کد تخفیف با خطا مواجه شد!", {
                className: "ffunstI",
                position: "bottom-right",
              });
            }
          })

    // fetch(`${mainRoute}active-off/${mainOffID}` , {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     isAccept: 0,
    //   })
    //   }).then(res => {
    //     console.log(res);
    //     if (res.ok) {
    //       getAllOff();
    //       handleCloseAcceptModal();
    //       toast.success("کامنت با موفقیت رد شد!", {
    //         className: "ffunstI",
    //         position: "bottom-right",
    //       });
    //     }})

  };
  const handleAcceptDeleteModal = async () => {
    try {
      const response = await fetch(`${mainRoute}${mainOffID}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      await getAllOff();
      toast.success("سفارش با موفقیت حذف شد!", {
        className: "ffunstI",
        position: "bottom-right",
      });
      handleCloseDeleteModal();
    } catch (err) {
      toast.error("خطا در حذف سفارش", {
        className: "ffunstI",
        position: "bottom-right",
      });
      handleCloseDeleteModal();
    }
  };

  useEffect(() => { getAllOff(); }, []);

  return (
    <div className="mt2">
      <h1 className="off_headerTiTle mb1-5">لیست تخفیف ها</h1>

      {allOff.length ? (
        <>
          <table className="product-table">
            <thead>
              <tr className="table-header">
                <th className="price-col table_td">کد تخفیف</th>
                <th className="image-col table_td">درصد تخفیف</th>
                <th className="name-col table_td">تاریخ ثبت </th>
                <th className="stock-col table_td">ثبت شده توسط</th>
                <th className="actions-col table_td"> ساخته شده برای </th>
                <th className="actions-col table_td">اکشن ها</th>
              </tr>
            </thead>
            <tbody>
              {allOff.map((off) => (
                <tr key={off.id} className="table-row">
                  <td className="name-cell table_td fs">{off.code}</td>
                  <td className="image-cell fs table_td">% {off.percent}</td>
                  <td className="stock-cell table_td">{off.date}</td>
                  <td className="stock-cell table_td">{off.adminID}</td>
                  <td className="stock-cell table_td">{off.productID}</td>
                  <td className="actions-cell table_td">
                    <div className="action-buttons">
                      {off.isActive ? (
                        <button
                          className="b btn1 fg h3-5 fs br-5"
                          onClick={() => handleShowRejectModal(off)}
                        >
                          رد
                        </button>
                      ) : (
                        <button
                          className="b btn1 fg h3-5 fs br-5"
                          onClick={() => handleShowAcceptModal(off)}
                        >
                          تایید
                        </button>
                      )}

                      <button
                        className="b btn1 fg h3-5 fs bgred hbgd-red bnone br-5"
                        onClick={() => handleShowDeleteModal(off)}
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <RejectModal
            handleConfirmDelete={handleConfirmReject}
            showDeleteModal={showRejectModal}
            showDeleteModalContainer={showRejectModalContainer}
            handleClosingDelete={handleCloseRejectModal}
            title={"آیا از رد تخفیف اطمینان دارید؟"} // تغییر متن
          />

          <AcceptModal
            handleConfirmDelete={handleConfirmAccept} // تغییر نام پراپ به handleConfirm
            showDeleteModal={showAcceptModal}
            showDeleteModalContainer={showAcceptModalContainer}
            handleClosingDelete={handleCloseAcceptModal}
            title={"آیا از تایید تخفیف اطمینان دارید؟"} // تغییر متن
          />
          <DeleteModal
            handleConfirmDelete={handleAcceptDeleteModal}
            showDeleteModal={showDeleteModal}
            showDeleteModalContainer={showDeleteModalContainer}
            handleClosingDelete={handleCloseDeleteModal}
          />

          <ToastContainer />
        </>
      ) : (
        <Error title={"هیچ تخفیفی پیدا نشد"} />
      )}
    </div>
  );
}
