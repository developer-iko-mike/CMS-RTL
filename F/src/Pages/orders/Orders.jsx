import React, { useEffect, useState } from "react";
import "./orders.css";
import Error from "../../AllRoute_Components/error/Error";
import AcceptModal from "../../AllRoute_Components/deleteModal/DeleteModal";
import RejectModal from "../../AllRoute_Components/deleteModal/DeleteModal";
import DeleteModal from "../../AllRoute_Components/deleteModal/DeleteModal";
import DetailsModal from "./components/DetailModal/DetailsModal";
import { ToastContainer, toast } from "react-toastify";

export default function Orders() {
  const mainRoute = "http://localhost:8000/api/orders/";

  const [allOrders, setAllOrders] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDetailModalContainer, setShowDetailModalContainer] =
    useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteModalContainer, setShowDeleteModalContainer] =
    useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showAcceptModalContainer, setShowAcceptModalContainer] =
    useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRejectModalContainer, setShowRejectModalContainer] =
    useState(false);

  const [mainOrderID, setMainOrderID] = useState(null);
  const [mainOrder, setMainOrder] = useState(null);

  const getOrders = async () => {
    await fetch(mainRoute)
      .then((rep) => rep.json())
      .then((reu) => setAllOrders(reu));
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleCalcPrice = (order) => {
    const priceOff = order.price * (order.off / 100);
    const finalPrice = order.price - priceOff;
    const roundedPrice = Math.round(+finalPrice / 1000) * 1000;
    return roundedPrice.toLocaleString();
  };

  // Reject Modal

  const handleShowRejectModal = (order) => {
    setMainOrderID(order.id);
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

  const handleConfirmReject = async () => {
    try {
      const response = await fetch(
        `${mainRoute}active-order/${mainOrderID}/Reject`,
        {
          method: "PUT",
        }
      );

      // 3. Update Main Order
      // method => Put
      // sub_url =>
      // req param => orderID => Order ID
      // req param => isActive (0 OR 1) => Reject / Accept Order

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      await getOrders();
      toast.success("سفارش با موفقیت رد شد!", {
        className: "ffunstI",
        position: "bottom-right",
      });
      handleCloseRejectModal();
    } catch (err) {
      toast.error("خطا در رد سفارش", {
        className: "ffunstI",
        position: "bottom-right",
      });
      handleCloseRejectModal();
    }
  };

  // Accept Modal

  const handleShowAcceptModal = (order) => {
    setMainOrderID(order.id); 
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

  const handleConfirmAccept = async () => {
    try {
      const response = await fetch(
        `${mainRoute}active-order/${mainOrderID}/Accept`, // تغییر endpoint به Accept
        {
          method: "PUT", // استفاده از روش PUT
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to accept order");
      }
  
      await getOrders();
      toast.success("سفارش با موفقیت تایید شد!", {
        className: "ffunstI",
        position: "bottom-right",
      });
      handleCloseAcceptModal();
    } catch (err) {
      toast.error("خطا در تایید سفارش", {
        className: "ffunstI",
        position: "bottom-right",
      });
      handleCloseAcceptModal();
    }
  };

  // Delete Modal

  const handleShowDeleteModal = (order) => {
    setMainOrderID(order.id);
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
  const handleAcceptDeleteModal = async () => {
    try {
      const response = await fetch(`${mainRoute}${mainOrderID}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      await getOrders();
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

  // Detail Modal

  const handleShowDetailModal = (order) => {
    setMainOrder(order);
    setShowDetailModal(true);
    setTimeout(() => {
      setShowDetailModalContainer(true);
    }, 300);
  };
  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setTimeout(() => {
      setShowDetailModalContainer(false);
    }, 300);
  };

  //

  const nowTime = () => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const hour = today.getHours();
    const minute = today.getMinutes();
    return {
      today: `${date} ${month} ${year}`,
      now: `${minute.toString().padStart(2, "0")} : ${hour}`,
    };
  };

  return (
    <div className="mt2">
      <h1 className="order_headerTiTle mb1-5">لیست سفارشات</h1>

      {allOrders.length > 0 ? (
        <>
          <table className="product-table">
            <thead>
              <tr className="table-header">
                <th className="price-col table_td">نام محصول خریداری شده</th>
                <th className="image-col table_td">نام خریدار</th>
                <th className="name-col table_td">تاریخ سفارش </th>
                <th className="stock-col table_td">ساعت سفارش</th>
                <th className="actions-col table_td"> مقدار تخفیف </th>
                <th className="actions-col table_td"> تخفیف اعمال شده</th>
                <th className="actions-col table_td">اکشن ها</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order) => (
                <tr key={order.id} className="table-row">
                  <td className="name-cell table_td fs">{order.productID}</td>
                  <td className="image-cell fs table_td">{order.userID}</td>
                  <td className="stock-cell table_td">{order.date}</td>
                  <td className="stock-cell table_td">{order.hour}</td>
                  <td className="stock-cell table_td">% {order.off}</td>
                  <td className="stock-cell table_td">
                    {handleCalcPrice(order)}
                  </td>
                  <td className="actions-cell table_td">
                    <div className="action-buttons">
                      {order.isActive ? (
                        <button
                          className="b btn1 fg h3-5 fs br-5"
                          onClick={() => handleShowRejectModal(order)}
                        >
                          رد
                        </button>
                      ) : (
                        <button
                          className="b btn1 fg h3-5 fs br-5"
                          onClick={() => handleShowAcceptModal(order)}
                        >
                          تایید
                        </button>
                      )}
                      <button
                        className="b btn1 fg h3-5 fs br-5"
                        onClick={() => handleShowDetailModal(order)}
                      >
                        جزییات
                      </button>

                      <button
                        className="b btn1 fg h3-5 fs bgred hbgd-red bnone br-5"
                        onClick={() => handleShowDeleteModal(order)}
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <AcceptModal
            handleConfirmDelete={handleConfirmAccept} // تغییر نام پراپ به handleConfirm
            showDeleteModal={showAcceptModal}
            showDeleteModalContainer={showAcceptModalContainer}
            handleClosingDelete={handleCloseAcceptModal}
            title={"آیا از تایید سفارش اطمینان دارید؟"} // تغییر متن
          />

          <RejectModal
            handleConfirmDelete={handleConfirmReject}
            showDeleteModal={showRejectModal}
            showDeleteModalContainer={showRejectModalContainer}
            handleClosingDelete={handleCloseRejectModal}
            title={"آیا از رد سفارش اطمینان دارید؟"} // تغییر متن
          />
          <DeleteModal
            handleConfirmDelete={handleAcceptDeleteModal}
            showDeleteModal={showDeleteModal}
            showDeleteModalContainer={showDeleteModalContainer}
            handleClosingDelete={handleCloseDeleteModal}
          />
          <DetailsModal
            showDetailsModal={showDetailModal}
            showDetailsModalContainer={showDetailModalContainer}
            handleClosingDetails={handleCloseDetailModal}
            order={mainOrder}
            time={nowTime}
            finalPrice={handleCalcPrice}
          />
          <ToastContainer />
        </>
      ) : (
        <Error title={"هیچ سفارشی پیدا نشد"} />
      )}
    </div>
  );
}
