import React, { useEffect, useState } from "react";
import "../home.css";
import DollarSVG from "./SVGs/DollarSVG";
import LayersSVG from "./SVGs/LayersSVG";
import LocaltionSVG from "./SVGs/LocaltionSVG";
import MassageSVG from "./SVGs/Massage2SVG";

export default function NewProduct({getAllProduct , allProduct}) {

  console.log(allProduct);

  // استیت برای ذخیره مقادیر هر فیلد
  const [formData, setFormData] = useState({});

  // آرایه ثابت برای تنظیمات فیلدها
  const formFields = [
    {
      id: "title",
      label: "اسم محصول را بنویسید* مثال : (هدفون بلوتوثی)",
      icon: <MassageSVG width={24} height={24} fill="#000" />,
    },
    {
      id: "price",
      label: "قیمت محصول را بنویسید* مثال : (1500000) ",
      icon: <DollarSVG width={24} height={24} fill="#000" />,
    },
    {
      id: "count",
      label: "موجودی محصول را بنویسید* مثال : (100)",
      icon: <LayersSVG width={24} height={24} fill="#000" />,
    },
    {
      id: "popularity",
      label: "میزان محبوبیت محصول را بنویسید مثال : (بد/عادی/خوب)",
      icon: <MassageSVG width={24} height={24} fill="#000" />,
    },
    {
      id: "sale",
      label: "میزان فروش محصول را بنویسید مثال : (کم/عادی/زیاد)",
      icon: <MassageSVG width={24} height={24} fill="#000" />,
    },
    {
      id: "colors",
      label: "تعداد رنگ بندی محصول را بنویسید مثال : (3)",
      icon: <MassageSVG width={24} height={24} fill="#000" />,
    },
    {
      id: "img",
      label: "ادرس عکس محصول را بنویسید* مثال : (empty.png) حتما عکس باید در پوشه img پابلیک پروژه باشه",
      icon: <LocaltionSVG width={24} height={24} fill="#000" />,
    },
  ];

  // تابع برای مدیریت تغییرات هر فیلد
  // const handleInputChange = (fieldId, value) => {
  //   // اگر فیلد قیمت بود (id=2)، مقدار را فرمت کنیم
  //   if (fieldId === 2) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [fieldId]: formatPrice(value),
  //     }));
  //   } else {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [fieldId]: value,
  //     }));
  //   }
  // };

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // تابع برای فرمت کردن قیمت (اضافه کردن کاما هر سه رقم)
  const formatPrice = (value) => {
    if (!value) return "";
    alert('عنوان محصول الزامی است');
    // حذف همه کاماها و غیررقم‌ها
    const onlyNums = value.toString().replace(/[^\d]/g, "");

    // اضافه کردن کاما هر سه رقم از سمت راست
    return onlyNums.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // تابع برای تبدیل به عدد هنگام ذخیره در استیت
  const parsePrice = (formattedValue) => {
    return parseInt(formattedValue.replace(/,/g, "")) || 0;
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


  const handleSubmitAdd = async () => {
    
    let { title, price = 0, count = 1, img = "/img/empty.png", popularity = 0, sale = 0, colors = 1} = formData;
if (title){

    //   let newProductObj = {
    //   id: allProduct.length + 1,
    //   title,
    //   price,
    //   count,
    //   img: "/img/" + img,
    //   popularity,
    //   sale,
    //   colors,
    // };
    let newProductObj = {
      title: formData.title,
      price: formData.price ? parseInt(parsePrice(formData.price)) : 0,
      img: "/img/" + (formData.img || "empty.png"),
      popularity: formData.popularity || "عادی",
      colors: formData.colors || 1,
      count: parseInt(formData.count) || 1,
colors: parseInt(formData.colors) || 1,
    };
    console.log(allProduct.length + 1)

    
    await fetch(`http://localhost:8000/api/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProductObj)
    })
    .then(async res => {
      const text = await res.text();
      console.log('Raw response:', text); // لاگ کامل پاسخ
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error('Invalid JSON:', text);
        return {}; // برگرداندن شیء خالی در صورت عدم وجود JSON
      }
    })


    console.log(allProduct)
    setFormData({})
}


  };

  useEffect(() => {
    // console.log(formData[0] || id);
    // console.log(formData[1] || title);
    // console.log(formData[2] || price);
    // console.log(formData[3] || count);
    // console.log(formData[4] ||);
    // console.log(formData[5] ||);
    // console.log(formData[6] ||);
  }, [formData]);

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
                className="home_search w100 onone bnone bgnone h100 plr-5 fs1-2 ttnone"
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
        <button className="home_submit b btn2 mt1" onClick={handleSubmitAdd}>
          ثبت محصول
        </button>
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
                <td className="td tc cd-grey">
                  قیمت محصولی رایگان ذخیره میشود
                </td>
                <td className="td tc cd-grey"> موجودی محصولی 1 ذخیره میشود</td>
                <td className="td tc cd-grey">
                  ادرس تصویر خالی یا دیفالت ذخیره میشود
                </td>
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
