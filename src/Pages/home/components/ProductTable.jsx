import React, { useState, useEffect } from "react";
import "../home.css";
import DeleteModal from "../../../AllRoute_Components/deleteModal/DeleteModal";
import DetailsModal from "./detailModal/DetailsModal";
import EditModal from "../../../AllRoute_Components/editModal/EditModal";
import Error from "../../../AllRoute_Components/error/Error";
import { ToastContainer, toast } from "react-toastify";

export default function ProductTable({ getAllProduct, allProducts }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteModalContainer, setShowDeleteModalContainer] =
    useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDetailsModalContainer, setShowDetailsModalContainer] =
    useState(false);
  const [detailModalProductObj, setDetailModalProductObj] = useState(null);
  const [editModalProductObj, setEditModalProductObj] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditModalContainer, setShowEditModalContainer] = useState(false);
  // const [allProducts, setAllProducts] = useState([]);
  const [bgImage, setBgImage] = useState("");
  const [productID, setProductID] = useState(null);
  // start edit modal
  const [editModalID, setEditModalID] = useState(null);
  const [editModalImage, setEditModalImage] = useState("/img/empty.png");
  const [editModalTiTle, setEditModalTiTle] = useState("");
  const [editModalCount, setEditModalCount] = useState(0);
  const [editModalColor, setEditModalColor] = useState(1);
  const [editModalPrice, setEditModalPrice] = useState(0);
  const [editModalDescr, setEditModalDescr] = useState("");
  const [fileName, setFileName] = useState("هیچ فایلی انتخاب نشده");
  // finish edit modal
  const mainRouteAPI = "http://localhost:8000/api/products/";

  useEffect(() => {
    getAllProduct();
  }, []);

  // const getAllProduct = () => {
  //   fetch(mainRouteAPI)
  //     .then((res) => res.json())
  //     .then((products) => setAllProducts(products));
  // };

  const handleConfirmEdit = () => {
    setShowEditModal(false);
    setTimeout(() => {
      setShowEditModalContainer(false);
    }, 300);
    // let editableObj = {
    //   title: editModalTiTle,
    //   price: editModalPrice,
    //   count: editModalCount,
    //   img: editModalImage,
    //   popularity: editModalProductObj.popularity,
    //   sale: editModalProductObj.sale,
    //   colors: editModalColor,
    // }

    // fetch(mainRouteAPI + editModalID, {
    //   method: "PUT",
    //   headers: { // اصلاح شده
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(editableObj)
    // }).then(res => {
    //   if (res.ok){
    //     getAllProduct()
    //     console.log(res)
    //   }
    // })

    fetch(mainRouteAPI + editModalID, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editModalTiTle,
        price: editModalPrice,
        count: editModalCount,
        img: editModalImage,
        colors: editModalColor,
        popularity: editModalProductObj.popularity,
        sale: editModalProductObj.sale,
      }),
    });

    toast.success("محصول با موفقیت اپدیت شد!", {
      // اینجا مستقیما toast رو صدا زدی
      className: "ffunstI",
      position: "bottom-right",
    });
  };

  const handleClosingEdit = () => {
    setShowEditModal(false);
    setTimeout(() => {
      setShowEditModalContainer(false);
    }, 300);
  };

  const handleShowEdit = async (productEdit) => {
    setEditModalProductObj(productEdit);
    setShowEditModalContainer(true);
    setTimeout(() => {
      setShowEditModal(true);
    }, 50);
  };

  useEffect(() => {
    if (editModalProductObj) {
      setEditModalID(editModalProductObj.id);
      setEditModalImage(editModalProductObj.img);
      setEditModalTiTle(editModalProductObj.title);
      setEditModalCount(editModalProductObj.count);
      setEditModalColor(editModalProductObj.colors);
      setEditModalPrice(editModalProductObj.price);
      setEditModalDescr(editModalProductObj.productDesc);
    }
  }, [editModalProductObj]);

  const handleShowDetails = async (productDetail) => {
    setDetailModalProductObj(productDetail);
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

  const handleClosingDelete = () => setShowDeleteModal(false);

  const handleConfirmDelete = async () => {
    await fetch(mainRouteAPI + productID, {
      method: "DELETE",
    }).then((res) => {
      console.log(res.ok);
      getAllProduct();
    });
    toast.success("محصول با موفقیت حذف شد!", {
      // اینجا مستقیما toast رو صدا زدی
      className: "ffunstI",
      position: "bottom-right",
    });
    handleClosingDelete();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(`${file.name} (${file.type})`);
      setEditModalImage(`/img/${file.name}`);

      // اگر می‌خواهید پیش‌نمایش فایل را هم داشته باشید:
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditModalImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
      <ToastContainer />
      {allProducts.length ? (
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
              {allProducts &&
                allProducts.map((product) => (
                  <tr key={product.id} className="table-row">
                    <td className="image-cell">
                      <div className="image-wrapper">
                        <img
                          src={product.img || "/img/empty.png"}
                          alt={product.title}
                          className="product-image"
                        />
                      </div>
                    </td>
                    <td className="name-cell"> {product.title}</td>
                    <td className="price-cell">
                      {product.price.toLocaleString()} تومان
                    </td>
                    <td className="stock-cell">{product.count}</td>
                    <td className="actions-cell">
                      <div className="action-buttons">
                        <button
                          className="action-btn details"
                          onClick={() => {
                            handleShowDetails(product);
                          }}
                        >
                          جزییات
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => {
                            handleShowDelete();
                            setProductID(product.id);
                          }}
                        >
                          حذف
                        </button>
                        <button
                          className="action-btn edit"
                          onClick={() => handleShowEdit(product)}
                        >
                          ویرایش
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              {bgImage && (
                <div
                  className="bgImage_section z100 bgblack pf w100vw h100vh t0 l0 djac"
                  onClick={() => setBgImage("")}
                >
                  <div className="bgImage_container mc">
                    <img
                      src={bgImage}
                      alt="something is wrong..."
                      className="bgImage w100 h100 ofc"
                    />
                  </div>
                </div>
              )}
            </tbody>
          </table>
          <DeleteModal
            handleConfirmDelete={handleConfirmDelete}
            showDeleteModal={showDeleteModal}
            showDeleteModalContainer={showDeleteModalContainer}
            handleClosingDelete={handleClosingDelete}
          />
          <DetailsModal
            {...(detailModalProductObj && { product: detailModalProductObj })}
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
                src={editModalImage} // آدرس تصویر واقعی
                alt={editModalTiTle}
                className="detailsProductImage"
                style={{ maxHeight: 225 }}
              />
            </div>
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
                {/* ردیف اول */}
                <tr>
                  <td className="detailsLabel  editlabel">نام محصول</td>
                  <td className="detailsValue">
                    <input
                      type="text"
                      className="editModalIpt"
                      value={editModalTiTle}
                      onChange={(e) => setEditModalTiTle(e.target.value)}
                      autoFocus
                    />
                  </td>
                  <td className="detailsLabel  editlabel">قیمت به تومان</td>
                  <td className="detailsValue">
                    <input
                      type="text"
                      className="editModalIpt"
                      value={editModalPrice.toLocaleString()}
                      onChange={(e) => setEditModalPrice(e.target.value)}
                    />
                  </td>
                </tr>

                {/* ردیف دوم */}
                <tr>
                  <td className="detailsLabel  editlabel">موجودی</td>
                  <td className="detailsValue">
                    <input
                      type="text"
                      className="editModalIpt"
                      value={editModalCount}
                      onChange={(e) => setEditModalCount(e.target.value)}
                    />
                  </td>
                  <td className="detailsLabel  editlabel">تعداد رنگ‌بندی</td>
                  <td className="detailsValue">
                    <input
                      type="text"
                      className="editModalIpt"
                      value={editModalColor}
                      onChange={(e) => setEditModalColor(e.target.value)}
                    />
                  </td>
                </tr>

                {/* ردیف‌های تک ستونی */}
                <tr>
                  <td className="detailsLabel  editlabel">آدرس تصویر</td>
                  <td className="detailsValue" colSpan="3">
                    <input
                      type="file"
                      className="editModalIpt tl ttnone"
                      onChange={handleFileChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td className="detailsLabel  editlabel">توضیحات</td>
                  <td className="detailsValue" colSpan="3">
                    <textarea
                      className="editModalIpt editModalTexTarea"
                      value={editModalDescr}
                      onChange={(e) => setEditModalDescr(e.target.value)}
                      cols={"100%"}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </EditModal>
        </div>
      ) : (
        <>
          <div className="mt2"></div>
          <Error title={"هیچ محصولی یافت نشد"} />
        </>
      )}
    </>
  );
}
