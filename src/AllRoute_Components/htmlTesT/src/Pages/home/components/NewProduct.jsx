import React, { useEffect, useState } from "react";
import "../home.css";
import DollarSVG from "./SVGs/DollarSVG";
import LayersSVG from "./SVGs/LayersSVG";
import LocaltionSVG from "./SVGs/LocaltionSVG";
import MassageSVG from "./SVGs/Massage2SVG";

export default function NewProduct() {
  // استیت برای ذخیره مقادیر هر فیلد
  const [formData, setFormData] = useState({});

  // آرایه ثابت برای تنظیمات فیلدها
  const formFields = [
    {
      id: 1,
      label: "اسم محصول را بنویسید* مثال : (هدفون بلوتوثی)",
      icon: <MassageSVG width={24} height={24} fill="#000" />,
    },
    {
      id: 2,
      label: "قیمت محصول را بنویسید* مثال : (1500000) ",
      icon: <DollarSVG width={24} height={24} fill="#000" />,
    },
    {
      id: 3,
      label: "موجودی محصول را بنویسید* مثال : (100)",
      icon: <LayersSVG width={24} height={24} fill="#000" />,
    },
    {
      id: 5,
      label: "میزان محبوبیت محصول را بنویسید مثال : (بد/عادی/خوب)",
      icon: <MassageSVG width={24} height={24} fill="#000" />,
    },
    {
      id: 6,
      label: "میزان فروش محصول را بنویسید مثال : (کم/عادی/زیاد)",
      icon: <MassageSVG width={24} height={24} fill="#000" />,
    },
    {
      id: 4,
      label: "تعداد رنگ بندی محصول را بنویسید مثال : (3)",
      icon: <MassageSVG width={24} height={24} fill="#000" />,
    },
    {
      id: 7,
      label: "ادرس عکس محصول را بنویسید* مثال : (audioProductPhoto/1.png)",
      icon: <LocaltionSVG width={24} height={24} fill="#000" />,
    },
  ];

  // تابع برای مدیریت تغییرات هر فیلد
  const handleInputChange = (fieldId, value) => {
    // اگر فیلد قیمت بود (id=2)، مقدار را فرمت کنیم
    if (fieldId === 2) {
      setFormData((prev) => ({
        ...prev,
        [fieldId]: formatPrice(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [fieldId]: value,
      }));
    }
  };

  // تابع برای فرمت کردن قیمت (اضافه کردن کاما هر سه رقم)
  const formatPrice = (value) => {
    if (!value) return "";

    // حذف همه کاماها و غیررقم‌ها
    const onlyNums = value.toString().replace(/[^\d]/g, "");

    // اضافه کردن کاما هر سه رقم از سمت راست
    return onlyNums.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // تابع برای تبدیل به عدد هنگام ذخیره در استیت
  const parsePrice = (formattedValue) => {
    return formattedValue.replace(/,/g, "");
  };

  const handleSubmit = () => {
    const productData = {
      name: formData[1] || "بدون نام",
      price: formData[2] ? parsePrice(formData[2]) : "0", // حذف کاماها قبل از ارسال
      // بقیه فیلدها...
    };

    console.log("داده‌های ارسالی:", productData);
    // ارسال به سرور...
  };

  // useEffect(() => {
  //   console.log(formData[0] || false);
  //   console.log(formData[1] || "رایگان");
  //   console.log(formData[2] || "موجود نیست");
  //   console.log(formData[3] || "/some-image/no-image.png");
  //   console.log(formData[4] || "عادی");
  //   console.log(formData[5] || "عادی");
  //   console.log(formData[6] || 1);
  // }, [formData]);

  return (
    <div className="mt2">
      <h1 className="home_header">افزودن محصول</h1>
      <div className={`home_content bgfff p1 br1 mt1-5  "bslh"  "bscu3"`}>
        <div className="home_itemIpt djspac g1-2 w100 fw ">
          {formFields.map((item) => (
            <div
              className="home_item fg bgl-grey br-5 djspac plr1"
              key={item.id}
            >
              {item.icon}
              <input
                type="text"
                className="home_search w100 onone bnone bgnone h100 plr-5 fs1-2"
                placeholder={item.label}
                value={
                  item.id === 2
                    ? formData[item.id] || "" // برای قیمت، مقدار فرمت شده نمایش داده شود
                    : formData[item.id] || "" // بقیه فیلدها معمولی
                }
                onChange={(e) => handleInputChange(item.id, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button className="home_submit b btn2 mt1">ثبت محصول</button>
        <div className="warrning">
          <p className="tc fs1-2 mb1 c000">
            {/* اگر فیلد ورودی هارا خالی یا نامربوط بگذارید چه ذخیره می شود ? */}
            اگر فیلد ورودی هارا خالی یا کصوشعر بگذارید چه ذخیره می شود ?
          </p>

          <table className="table w100 mc">
            <thead>
              <tr className="thead">
              <th className="th cd-blck">فیلد اسم :</th>
              <th className="th cd-blck">فیلد قیمت :</th>
              <th className="th cd-blck">فیلد موجودی :</th>
              <th className="th cd-blck">فیلد ادرس :</th>
              <th className="th cd-blck">فیلد محبوبیت :</th>
              <th className="th cd-blck">فیلد میزان فروش :</th>
              <th className="th cd-blck">فیلد تعداد رنگ بندی :</th>
            </tr>
            </thead>
            <tbody className="tbody">
              <tr className="tr">
                <td className="td tc cd-grey"> بدون اسم اصلا ثبت نمیشود</td>
                <td className="td tc cd-grey">قیمت محصولی رایگان ذخیره میشود</td>
                <td className="td tc cd-grey"> موجودی محصولی 1 ذخیره میشود</td>
                <td className="td tc cd-grey">ادرس تصویر خالی یا دیفالت ذخیره میشود</td>
                <td className="td tc cd-grey"> عادی ذخیره میشود</td>
                <td className="td tc cd-grey"> عادی ذخیره میشود</td>
                <td className="td tc cd-grey"> 1 ذخیره میشود </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
