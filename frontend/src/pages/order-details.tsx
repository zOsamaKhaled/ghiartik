import { useParams } from "react-router-dom";
import { orders_data } from "@/config/orders_data";
import DefaultLayout from "@/layouts/default";
// Simple custom tabs — avoid type mismatches with the external Tabs component
import {
  CiCalendarDate,
  CiCircleInfo,
  CiCreditCard1,
  CiDeliveryTruck,
  CiDollar,
  CiReceipt,
  CiShop,
  CiStar,
} from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
import { CiClock1 } from "react-icons/ci";
import { VscSync } from "react-icons/vsc";
import { PiMapPin, PiPhoneCall } from "react-icons/pi";
import { IoCarSportOutline } from "react-icons/io5";
import { GoChecklist } from "react-icons/go";
import { FaFire, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { PiPackageThin } from "react-icons/pi";
import { useState } from "react";
import { Button } from "@heroui/button";
import { useDispatch } from "react-redux";
import { openModal } from "@/features/mainModal/mainModalSlice";
import { BsChatText, BsPatchExclamation, BsXLg } from "react-icons/bs";
import { Progress } from "@heroui/progress";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import { addToast, Textarea } from "@heroui/react";
import StarPicker from "@/components/StarPicker";
export default function OrderDetails() {
  const { orderNumber } = useParams();

  const order = orders_data.find((order) => order.order_number === orderNumber);
  const orderRating = order?.rating;
  const [rate, setRate] = useState({
    rate: orderRating || 0,
    comment: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRate = (stars: number) => {
    setRate({ ...rate, rate: stars });
  };

  const renderStars = (rate: number) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5;
    const totalStars = 5;

    return (
      <div
        className="flex flex-row-reverse items-center justify-center gap-1"
        dir="rtl"
      >
        <span className="text-xs text-default-400">{rate}</span>
        <div className="stars_container flex items-center gap-0.5">
          {[...Array(totalStars)].map((_, i) => {
            if (i < fullStars) {
              return <FaStar key={i} className="w-3 h-3 text-yellow-500" />;
            } else if (i === fullStars && halfStar) {
              return (
                <FaStarHalfAlt
                  key={i}
                  className="w-3 h-3 text-yellow-500 transform scale-x-[-1]"
                />
              );
            } else {
              return <FaRegStar key={i} className="w-3 h-3 text-gray-300" />;
            }
          })}
        </div>
      </div>
    );
  };
  return (
    <DefaultLayout>
      {/* Order Details : Waiting */}
      {order?.status === "في الإنتظار" && (
        <div className="flex flex-col gap-4 mb-20 lg:grid lg:grid-cols-1">
          {/* Order Details Header */}
          <div className="flex flex-col h-full gap-6 p-2 md:p-8 border-1 border-border rounded-2xl ">
            <div className="flex flex-col justify-between gap-2 md:flex-row">
              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center justify-start p-3 bg-default-100 rounded-2xl">
                  <CiCircleInfo size={20} />
                </div>
                <div className="text-2xl">
                  <h3>معلومات الطلب</h3>
                </div>
              </div>
              <div className="flex items-center justify-start text-lg md:justify-end">
                <div
                  className={
                    "flex items-center  gap-2 px-4 py-2 border-1 border-border rounded-xl text-icon text-sm"
                  }
                >
                  <p>{order?.status}</p>
                  <CiClock1 size={18} />
                </div>
              </div>
            </div>

            <hr className="text-black/10" />

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <PiPackageThin size={20} />
                <p className=" text-light-black">رقم الطلب: </p>
              </div>
              <div>
                <p> {order?.order_number} #</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <CiCalendarDate size={20} />
                <p className=" text-light-black">تاريخ الطلب: </p>
              </div>
              <div>
                <p>{order?.date}</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <PiMapPin size={20} />
                <p className=" text-light-black">العنوان: </p>
              </div>
              <div>
                <p>{order?.address}</p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <IoCarSportOutline size={20} />
                <p className=" text-light-black">نوع السيارة والموديل: </p>
              </div>
              <div>
                <p className="text-left">
                  {order?.car_name} - {order?.car_model}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <GoChecklist size={20} />
                <p className=" text-light-black">القطع: </p>
              </div>
              <div>
                <p>{order?.products.map((p) => p.name).join(" - ")}</p>
              </div>
            </div>
          </div>

          {/* Order Details Body {Images} */}

          <div className="flex flex-col h-full gap-6 p-2 md:p-8 border-1 border-border rounded-2xl ">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-start p-3 bg-default-100 rounded-2xl">
                <PiPackageThin size={20} />
              </div>
              <div className="text-2xl">
                <h3>القطع المطلوبة</h3>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-8 md:flex-row">
              {order?.products.map((product) => (
                <div className="relative flex flex-row items-center justify-start w-full gap-2 p-4 border-1 border-border rounded-2xl">
                  <div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-15 h-15 rounded-2xl"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <p>{product.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-light-black">
                        الكمية: {product.quantity}
                      </p>
                    </div>
                  </div>
                  <CiEdit
                    size={20}
                    className="absolute cursor-pointer top-3 left-2"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Order Footer */}
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <div className="flex flex-row items-center">
              <p className="text-center text-primary lg:text-right">
                {order?.has_quotes
                  ? `✨ لديك ${order?.quotes_number} عروض جديدة! • أقل سعر حتى الآن: 450 `
                  : "جاري استقبال عروض الأسعار من التجار.."}
                .
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 lg:flex-row">
              {order?.has_quotes ? (
                <div className="flex flex-col gap-2 lg:flex-row">
                  <Button
                    startContent={<FaFire size={20} />}
                    className="lg:w-[160px] px-4 py-2 font-medium duration-500 ease-in-out transform bg-transparent border cursor-pointer transition- text-primary rounded-xl border-primary hover:bg-primary hover:text-white "
                    onPress={() => {
                      // store selected invoice id so the modal can read it
                      //   if (typeof window !== "undefined")
                      //     localStorage.setItem("invoiceId", o.id);
                      navigate(`/myOrders/${order.order_number}/quotes`);
                    }}
                  >
                    عروض الأسعار
                  </Button>
                  <Button
                    startContent={<CiEdit size={20} />}
                    className="lg:w-[160px] px-4 py-2 font-medium duration-500 ease-in-out transform bg-transparent border cursor-pointer transition- text-primary rounded-xl border-primary hover:bg-primary hover:text-white "
                    //   onPress={() => {
                    //     // store selected invoice id so the modal can read it
                    //     navigate(`/myOrders/${o.order_number}/order-details`);
                    //   }}
                  >
                    تعديل
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 lg:flex-row">
                  <Button
                    startContent={<CiEdit size={20} />}
                    className="w-[160px] px-4 py-2 font-medium duration-500 ease-in-out transform bg-transparent border cursor-pointer transition- text-primary rounded-xl border-primary hover:bg-primary hover:text-white "
                    //   onPress={() => {
                    //     // store selected invoice id so the modal can read it
                    //     navigate(`/myOrders/${order?.order_number}/order-details`);
                    //   }}
                  >
                    تعديل
                  </Button>
                  <Button
                    startContent={<BsXLg size={20} />}
                    className="w-[160px] px-4 py-2 font-medium duration-500 ease-in-out transform bg-transparent border cursor-pointer transition- text-red-500 rounded-xl border-red-500 hover:bg-red-500 hover:text-white "
                    //   onPress={() => {
                    //     // store selected invoice id so the modal can read it
                    //     handleCancleOrder(o.id);
                    //   }}
                  >
                    إلغاء
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Order Details : onPayment */}
      {order?.status === "قيد الدفع" && (
        <div className="flex flex-col gap-4 mb-20 lg:grid lg:grid-cols-1">
          {/* Order Details Header */}
          <div className="flex flex-col h-full gap-6 p-2 md:p-8 border-1 border-border rounded-2xl ">
            <div className="flex flex-col justify-between gap-2 md:flex-row">
              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center justify-start p-3 bg-default-100 rounded-2xl">
                  <CiCircleInfo size={20} />
                </div>
                <div className="text-2xl">
                  <h3>معلومات الطلب</h3>
                </div>
              </div>
              <div className="flex items-center justify-start text-lg md:justify-end">
                <div
                  className={
                    "flex items-center  gap-2 px-4 py-2 border-1 border-red-500 rounded-xl text-red-500 text-sm"
                  }
                >
                  <p>{order?.status}</p>
                  <CiCreditCard1 size={18} />
                </div>
              </div>
            </div>

            <hr className="text-black/10" />

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <PiPackageThin size={20} />
                <p className=" text-light-black">رقم الطلب: </p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <p> {order?.order_number} #</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <CiCalendarDate size={20} />
                <p className=" text-light-black">تاريخ الطلب: </p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <p>{order?.date}</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <PiMapPin size={20} />
                <p className=" text-light-black">العنوان: </p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <p>{order?.address}</p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <IoCarSportOutline size={20} />
                <p className=" text-light-black">نوع السيارة والموديل: </p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <p className="text-left">
                  {order?.car_name} - {order?.car_model}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <GoChecklist size={20} />
                <p className=" text-light-black">القطع: </p>
              </div>
              <div>
                <p>{order?.products.map((p) => p.name).join(" - ")}</p>
              </div>
            </div>
          </div>

          {/* Order Details Body {Images} */}

          <div className="flex flex-col h-full gap-6 p-2 md:p-8 border-1 border-border rounded-2xl ">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-start p-3 bg-default-100 rounded-2xl">
                <PiPackageThin size={20} />
              </div>
              <div className="text-2xl">
                <h3>القطع المطلوبة</h3>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-8 md:flex-row">
              {order?.products.map((product) => (
                <div className="relative flex flex-row items-center justify-start w-full gap-2 p-4 border-1 border-border rounded-2xl">
                  <div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-15 h-15 rounded-2xl"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <p>{product.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-light-black">
                        الكمية: {product.quantity}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-light-black">
                        سعر القطعة: {product.price}
                      </p>
                    </div>
                  </div>
                  {/* <CiEdit
                    size={20}
                    className="absolute cursor-pointer top-3 left-2"
                  /> */}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          <div className="flex flex-col h-full gap-6 p-2 md:p-8 border-1 border-border rounded-2xl ">
            <div className="flex flex-col justify-between gap-2 md:flex-row">
              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center justify-start p-3 bg-default-100 rounded-2xl">
                  <CiDollar size={20} />
                </div>
                <div className="text-2xl">
                  <h3>المعلومات المالية</h3>
                </div>
              </div>
            </div>

            <hr className="text-black/10" />

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <CiDollar size={20} />
                <p className=" text-light-black">سعر القطع الإجمالي: </p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <p> {order?.total_price} ريال </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <CiDeliveryTruck size={20} />
                <p className=" text-light-black"> سعر التوصيل: </p>
              </div>
              <div>
                <p>50 ريال</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <CiReceipt size={20} />
                <p className=" text-light-black">الضريبة (15%): </p>
              </div>
              <div>
                <p>{order?.total_price * 0.15} ريال</p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <CiShop size={20} />
                <p className=" text-light-black">عمولة المنصة (1%): </p>
              </div>
              <div>
                <p>{order?.total_price * 0.01} ريال</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <CiDollar size={20} />
                <p className=" text-light-black">السعر الكلي: </p>
              </div>
              <div>
                <p>
                  {order?.total_price +
                    order?.total_price * 0.15 +
                    order?.total_price * 0.01 +
                    50}{" "}
                  ريال
                </p>
              </div>
            </div>
          </div>
          {/* Order Footer */}
          <div className="flex flex-col items-center justify-end gap-4 lg:flex-row">
            <Button
              startContent={<CiCreditCard1 size={20} />}
              className="w-[160px] px-4 py-2 font-medium duration-500 ease-in-out transform bg-transparent border cursor-pointer transition- text-primary rounded-xl border-primary hover:bg-primary hover:text-white "
              onPress={() => {
                const totalAmount =
                  order?.total_price +
                  order?.total_price * 0.15 +
                  order?.total_price * 0.01 +
                  50;
                // store selected invoice id so the modal can read it
                if (typeof window !== "undefined")
                  localStorage.setItem("totalAmount", totalAmount.toString());
                // navigate(`/myOrders/${o.order_number}/order-details`);
                dispatch(openModal("payModal"));
              }}
            >
              ادفع الآن
            </Button>
          </div>
        </div>
      )}

      {/* Order Details : current */}
      {order?.status === "حالية" && (
        <div className="flex flex-col gap-4 mb-20 lg:grid lg:grid-cols-1">
          {/* Order Progress */}
          <div className="flex-col items-center justify-center w-full gap-6 p-2 pt-8 pb-4 md:p-12 md:flex border-1 border-border rounded-2xl">
            <div className="relative w-full h-6">
              <Progress
                color="primary"
                size="sm"
                aria-label="مراحل الطلب"
                value={
                  order.internal_status === "جاري التجهيز"
                    ? 25
                    : order.internal_status === "تم التجهيز"
                      ? 50
                      : order.internal_status === "تم إرساله للشحن"
                        ? 80
                        : order.internal_status === "تم التسليم"
                          ? 100
                          : 0
                }
              />
              {/* المراحل */}
              <div className="absolute md:top-[0px] top-[-10px] left-0 flex items-center justify-between w-full h-full pointer-events-none">
                <div>
                  <div
                    className={`w-7 flex items-center justify-center h-7 rounded-full ${
                      [
                        "جاري التجهيز",
                        "تم التجهيز",
                        "تم إرساله للشحن",
                        "تم التسليم",
                      ].includes(order.internal_status ?? "")
                        ? "bg-primary"
                        : "bg-gray-400"
                    }`}
                  >
                    <CiSettings size={20} className="text-white" />
                  </div>
                  <p className="hidden md:flex">جاري التجهيز</p>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 flex items-center justify-center h-7 rounded-full ${
                      ["تم التجهيز", "تم إرساله للشحن", "تم التسليم"].includes(
                        order.internal_status ?? ""
                      )
                        ? "bg-primary"
                        : "bg-gray-400"
                    }`}
                  >
                    <PiPackageThin size={20} className="text-white" />
                  </div>
                  <p className="hidden md:flex">تم التجهيز</p>
                </div>

                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 flex items-center justify-center h-7 rounded-full ${
                      ["تم إرساله للشحن", "تم التسليم"].includes(
                        order.internal_status ?? ""
                      )
                        ? "bg-primary"
                        : "bg-gray-400"
                    }`}
                  >
                    <CiDeliveryTruck size={20} className="text-white" />
                  </div>
                  <p className="hidden md:flex">تم إرساله للشحن</p>
                </div>

                <div className="flex flex-col items-end ">
                  <div
                    className={`w-7 flex items-center justify-center h-7 rounded-full ${
                      order.internal_status === "تم التسليم"
                        ? "bg-primary"
                        : "bg-gray-400"
                    }`}
                  >
                    <CiCircleCheck size={20} className="text-white" />
                  </div>
                  <p className="hidden md:flex">تم التسليم</p>
                </div>
              </div>
            </div>
          </div>

          {/* Merchant Info */}
          <div
            key={order.merchant_id}
            className="flex flex-col h-full gap-4 p-2 md:p-8 border-1 border-border rounded-2xl "
          >
            <div className="flex flex-col items-start justify-between gap-2 md:items-end md:flex-row">
              <Link to={`/vendors/${order.merchant_id}`}>
                <div className="flex justify-start gap-8">
                  <div className="items-center justify-start hidden p-3 rounded-full md:flex border-1 border-border">
                    <img
                      src={order.merchant_image}
                      alt={order.merchant_name}
                      className="w-20 h-20 rounded-full"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center gap-2">
                    <p> {order.merchant_name}</p>
                    {renderStars(order.merchant_rating || 0)}

                    <div className="flex flex-row items-center justify-start w-full gap-1">
                      <PiMapPin size={20} />
                      <p>{order.merchant_address}</p>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="flex items-center justify-start text-lg ">
                <div className="flex flex-row items-center justify-start w-full gap-2 transition-all duration-300 hover:text-primary group">
                  <PiPhoneCall size={20} />
                  <Link to={`tel:${order.merchant_phone}`} title="اتصل بالتاجر">
                    <p className="text-sm">{order.merchant_phone}</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details Header */}
          <div className="flex flex-col h-full gap-6 p-2 md:p-8 border-1 border-border rounded-2xl ">
            <div className="flex flex-col justify-between gap-2 md:flex-row">
              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center justify-start p-3 bg-default-100 rounded-2xl">
                  <CiCircleInfo size={20} />
                </div>
                <div className="text-2xl">
                  <h3>معلومات الطلب</h3>
                </div>
              </div>
              <div className="flex items-center justify-start text-lg md:justify-end">
                <div
                  className={
                    "flex items-center  gap-2 px-4 py-2 border-1 border-[#d8b61d] rounded-xl text-[#d8b61d] text-sm"
                  }
                >
                  <p>{order?.status}</p>
                  <VscSync size={18} />
                </div>
              </div>
            </div>

            <hr className="text-black/10" />

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <PiPackageThin size={20} />
                <p className=" text-light-black">رقم الطلب: </p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <p> {order?.order_number} #</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <CiCalendarDate size={20} />
                <p className=" text-light-black">تاريخ الطلب: </p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <p>{order?.date}</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <PiMapPin size={20} />
                <p className=" text-light-black">العنوان: </p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <p>{order?.address}</p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <IoCarSportOutline size={20} />
                <p className=" text-light-black">نوع السيارة والموديل: </p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <p className="text-left">
                  {order?.car_name} - {order?.car_model}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <GoChecklist size={20} />
                <p className=" text-light-black">القطع: </p>
              </div>
              <div>
                <p>{order?.products.map((p) => p.name).join(" - ")}</p>
              </div>
            </div>
          </div>

          {/* Order Details Body {Images} */}

          <div className="flex flex-col h-full gap-6 p-2 md:p-8 border-1 border-border rounded-2xl ">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-start p-3 bg-default-100 rounded-2xl">
                <PiPackageThin size={20} />
              </div>
              <div className="text-2xl">
                <h3>القطع المطلوبة</h3>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-8 md:flex-row">
              {order?.products.map((product) => (
                <div
                  key={product.name}
                  className="relative flex flex-row items-center justify-start w-full gap-2 p-4 border-1 border-border rounded-2xl"
                >
                  <div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-15 h-15 rounded-2xl"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <p>{product.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-light-black">
                        الكمية: {product.quantity}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-light-black">
                        سعر القطعة: {product.price}
                      </p>
                    </div>
                  </div>
                  {/* <CiEdit
                    size={20}
                    className="absolute cursor-pointer top-3 left-2"
                  /> */}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          <div className="flex flex-col h-full gap-6 p-2 md:p-8 border-1 border-border rounded-2xl ">
            <div className="flex flex-col justify-between gap-2 md:flex-row">
              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center justify-start p-3 bg-default-100 rounded-2xl">
                  <CiDollar size={20} />
                </div>
                <div className="text-2xl">
                  <h3>المعلومات المالية</h3>
                </div>
              </div>
            </div>

            <hr className="text-black/10" />

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <CiDollar size={20} />
                <p className=" text-light-black">سعر القطع الإجمالي: </p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <p> {order?.total_price} ريال </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <CiDeliveryTruck size={20} />
                <p className=" text-light-black"> سعر التوصيل: </p>
              </div>
              <div>
                <p>50 ريال</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <CiReceipt size={20} />
                <p className=" text-light-black">الضريبة (15%): </p>
              </div>
              <div>
                <p>{order?.total_price * 0.15} ريال</p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <CiShop size={20} />
                <p className=" text-light-black">عمولة المنصة (1%): </p>
              </div>
              <div>
                <p>{order?.total_price * 0.01} ريال</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <CiDollar size={20} />
                <p className=" text-light-black">السعر الكلي: </p>
              </div>
              <div>
                <p>
                  {order?.total_price +
                    order?.total_price * 0.15 +
                    order?.total_price * 0.01 +
                    50}{" "}
                  ريال
                </p>
              </div>
            </div>
          </div>
          {/* Order Footer */}
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <div className="flex flex-row gap-4">
              <Button
                startContent={<BsPatchExclamation size={18} />}
                className="w-[250px] px-4 py-2 font-medium duration-500 ease-in-out transform bg-transparent border cursor-pointer transition- text-red-500 rounded-xl border-red-500 hover:bg-red-500 hover:text-white "
                onPress={() => {
                  // store selected invoice id so the modal can read it
                  // if (typeof window !== "undefined")
                  //   localStorage.setItem("invoiceId", o.id);
                  //   navigate(`/myOrders/${o.order_number}/order-details`);
                  dispatch(openModal("complainModal"));
                }}
              >
                الإبلاغ عن شكوى
              </Button>
            </div>
            <div className="flex flex-row gap-4">
              <Button
                startContent={<CiCircleCheck size={22} />}
                className="w-[160px] px-4 py-2 font-medium duration-500 ease-in-out transform bg-transparent border cursor-pointer transition- text-primary rounded-xl border-primary hover:bg-primary hover:text-white "
                onPress={() => {
                  // store selected invoice id so the modal can read it
                  // if (typeof window !== "undefined")
                  //   localStorage.setItem("invoiceId", o.id);
                  navigate(`/myOrders`);
                  addToast({
                    title: "تم تحويل حالة الطلب إلى تم الإستلام بنجاح",
                    color: "success",
                    timeout: 3000,
                    shouldShowTimeoutProgress: true,
                  });
                }}
              >
                تم الإستلام
              </Button>
              <Button
                startContent={<BsChatText size={18} />}
                className="w-[160px] px-4 py-2 font-medium duration-500 ease-in-out transform bg-transparent border cursor-pointer transition- text-primary rounded-xl border-primary hover:bg-primary hover:text-white "
                onPress={() => {
                  // store selected invoice id so the modal can read it
                  // if (typeof window !== "undefined")
                  //   localStorage.setItem("invoiceId", o.id);
                  navigate(`/vendors/${order.merchant_id}/chat`);
                }}
              >
                محادثة
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Order Details : completed */}
      {order?.status === "منتهية" && (
        <div className="flex flex-col gap-4 mb-20 lg:grid lg:grid-cols-1">
          {/* Order Progress */}
          <div className="flex-col items-center justify-center w-full gap-6 p-2 pt-8 pb-4 md:p-12 md:flex border-1 border-border rounded-2xl">
            <div className="relative w-full h-6">
              <Progress
                color="primary"
                size="sm"
                aria-label="مراحل الطلب"
                value={
                  order.internal_status === "جاري التجهيز"
                    ? 25
                    : order.internal_status === "تم التجهيز"
                      ? 50
                      : order.internal_status === "تم إرساله للشحن"
                        ? 80
                        : order.internal_status === "تم التسليم"
                          ? 100
                          : 0
                }
              />
              {/* المراحل */}
              <div className="absolute md:top-[0px] top-[-10px] left-0 flex items-center justify-between w-full h-full pointer-events-none">
                <div>
                  <div
                    className={`w-7 flex items-center justify-center h-7 rounded-full ${
                      [
                        "جاري التجهيز",
                        "تم التجهيز",
                        "تم إرساله للشحن",
                        "تم التسليم",
                      ].includes(order.internal_status ?? "")
                        ? "bg-primary"
                        : "bg-gray-400"
                    }`}
                  >
                    <CiSettings size={20} className="text-white" />
                  </div>
                  <p className="hidden md:flex">جاري التجهيز</p>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 flex items-center justify-center h-7 rounded-full ${
                      ["تم التجهيز", "تم إرساله للشحن", "تم التسليم"].includes(
                        order.internal_status ?? ""
                      )
                        ? "bg-primary"
                        : "bg-gray-400"
                    }`}
                  >
                    <PiPackageThin size={20} className="text-white" />
                  </div>
                  <p className="hidden md:flex">تم التجهيز</p>
                </div>

                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 flex items-center justify-center h-7 rounded-full ${
                      ["تم إرساله للشحن", "تم التسليم"].includes(
                        order.internal_status ?? ""
                      )
                        ? "bg-primary"
                        : "bg-gray-400"
                    }`}
                  >
                    <CiDeliveryTruck size={20} className="text-white" />
                  </div>
                  <p className="hidden md:flex">تم إرساله للشحن</p>
                </div>

                <div className="flex flex-col items-end ">
                  <div
                    className={`w-7 flex items-center justify-center h-7 rounded-full ${
                      order.internal_status === "تم التسليم"
                        ? "bg-primary"
                        : "bg-gray-400"
                    }`}
                  >
                    <CiCircleCheck size={20} className="text-white" />
                  </div>
                  <p className="hidden md:flex">تم التسليم</p>
                </div>
              </div>
            </div>
          </div>

          {/* Merchant Info */}
          <div
            key={order.merchant_id}
            className="flex flex-col h-full gap-4 p-2 md:p-8 border-1 border-border rounded-2xl "
          >
            <div className="flex flex-col items-start justify-between gap-2 md:items-end md:flex-row">
              <Link to={`/vendors/${order.merchant_id}`}>
                <div className="flex justify-start gap-8">
                  <div className="items-center justify-start hidden p-3 rounded-full md:flex border-1 border-border">
                    <img
                      src={order.merchant_image}
                      alt={order.merchant_name}
                      className="w-20 h-20 rounded-full"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center gap-2">
                    <p> {order.merchant_name}</p>
                    {renderStars(order.merchant_rating || 0)}

                    <div className="flex flex-row items-center justify-start w-full gap-1">
                      <PiMapPin size={20} />
                      <p>{order.merchant_address}</p>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="flex items-center justify-start text-lg ">
                <div className="flex flex-row items-center justify-start w-full gap-2 transition-all duration-300 hover:text-primary group">
                  <PiPhoneCall size={20} />
                  <Link to={`tel:${order.merchant_phone}`} title="اتصل بالتاجر">
                    <p className="text-sm">{order.merchant_phone}</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details Header */}
          <div className="flex flex-col h-full gap-6 p-2 md:p-8 border-1 border-border rounded-2xl ">
            <div className="flex flex-col justify-between gap-2 md:flex-row">
              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center justify-start p-3 bg-default-100 rounded-2xl">
                  <CiCircleInfo size={20} />
                </div>
                <div className="text-2xl">
                  <h3>معلومات الطلب</h3>
                </div>
              </div>
              <div className="flex items-center justify-start text-lg md:justify-end">
                <div
                  className={
                    "flex items-center  gap-2 px-4 py-2 border-1 border-[#d8b61d] rounded-xl text-[#d8b61d] text-sm"
                  }
                >
                  <p>{order?.status}</p>
                  <VscSync size={18} />
                </div>
              </div>
            </div>

            <hr className="text-black/10" />

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <PiPackageThin size={20} />
                <p className=" text-light-black">رقم الطلب: </p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <p> {order?.order_number} #</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <CiCalendarDate size={20} />
                <p className=" text-light-black">تاريخ الطلب: </p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <p>{order?.date}</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <PiMapPin size={20} />
                <p className=" text-light-black">العنوان: </p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <p>{order?.address}</p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <IoCarSportOutline size={20} />
                <p className=" text-light-black">نوع السيارة والموديل: </p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <p className="text-left">
                  {order?.car_name} - {order?.car_model}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <GoChecklist size={20} />
                <p className=" text-light-black">القطع: </p>
              </div>
              <div>
                <p>{order?.products.map((p) => p.name).join(" - ")}</p>
              </div>
            </div>
          </div>

          {/* Order Details Body {Images} */}

          <div className="flex flex-col h-full gap-6 p-2 md:p-8 border-1 border-border rounded-2xl ">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-start p-3 bg-default-100 rounded-2xl">
                <PiPackageThin size={20} />
              </div>
              <div className="text-2xl">
                <h3>القطع المطلوبة</h3>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-8 md:flex-row">
              {order?.products.map((product) => (
                <div
                  key={product.name}
                  className="relative flex flex-row items-center justify-start w-full gap-2 p-4 border-1 border-border rounded-2xl"
                >
                  <div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-15 h-15 rounded-2xl"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <p>{product.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-light-black">
                        الكمية: {product.quantity}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-light-black">
                        سعر القطعة: {product.price}
                      </p>
                    </div>
                  </div>
                  {/* <CiEdit
                    size={20}
                    className="absolute cursor-pointer top-3 left-2"
                  /> */}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          <div className="flex flex-col h-full gap-6 p-2 md:p-8 border-1 border-border rounded-2xl ">
            <div className="flex flex-col justify-between gap-2 md:flex-row">
              <div className="flex items-center justify-start gap-2">
                <div className="flex items-center justify-start p-3 bg-default-100 rounded-2xl">
                  <CiDollar size={20} />
                </div>
                <div className="text-2xl">
                  <h3>المعلومات المالية</h3>
                </div>
              </div>
            </div>

            <hr className="text-black/10" />

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <CiDollar size={20} />
                <p className=" text-light-black">سعر القطع الإجمالي: </p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <p> {order?.total_price} ريال </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <CiDeliveryTruck size={20} />
                <p className=" text-light-black"> سعر التوصيل: </p>
              </div>
              <div>
                <p>50 ريال</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <CiReceipt size={20} />
                <p className=" text-light-black">الضريبة (15%): </p>
              </div>
              <div>
                <p>{order?.total_price * 0.15} ريال</p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <CiShop size={20} />
                <p className=" text-light-black">عمولة المنصة (1%): </p>
              </div>
              <div>
                <p>{order?.total_price * 0.01} ريال</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <CiDollar size={20} />
                <p className=" text-light-black">السعر الكلي: </p>
              </div>
              <div>
                <p>
                  {order?.total_price +
                    order?.total_price * 0.15 +
                    order?.total_price * 0.01 +
                    50}{" "}
                  ريال
                </p>
              </div>
            </div>
          </div>
          {/* Rating Details */}
          <div className="flex flex-col h-full gap-6 p-2 md:p-8 border-1 border-border rounded-2xl ">
            <div className="flex flex-col justify-center gap-2">
              <div className="flex flex-col items-center justify-center w-full gap-2">
                <div className="flex items-center justify-center p-3 bg-default-100 rounded-2xl">
                  <CiStar size={20} />
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                  <h3 className="text-2xl">تقييم التاجر</h3>
                  <p className="text-sm text-light-black">
                    كيف كانت تجربتك مع التاجر؟
                  </p>
                  <StarPicker onChange={handleRate} initialValue={rate.rate} />
                  <p>{rate.rate} نجمات </p>
                </div>
                <div className="w-full">
                  <Textarea
                    onChange={(e) =>
                      setRate({ ...rate, comment: e.target.value })
                    }
                    value={rate.comment}
                    placeholder="اكتب تعليقك هنا (اختياري)"
                    className="w-full h-[150px]"
                    label="اترك تعليق"
                    labelPlacement="outside"
                    aria-label="اترك تعليق"
                    maxRows={5}
                    minRows={5}
                  />
                </div>
              </div>
              <div className="flex flex-row items-center justify-end gap-4">
                <Button
                  startContent={<CiStar size={22} />}
                  className="w-[250px] px-4 py-2 font-medium duration-500 ease-in-out transform bg-primary text-white rounded-xl border border-primary hover:bg-white hover:text-primary "
                  onPress={() => {
                    addToast({
                      title: "تم تقييم التاجر بنجاح",
                      color: "success",
                      timeout: 3000,
                      shouldShowTimeoutProgress: true,
                      icon: <CiStar size={22} />,
                    });
                  }}
                  isDisabled={rate.rate === 0}
                >
                  {rate.rate === 0 ? "تقييم" : "تغيير التقييم"}
                </Button>
              </div>
            </div>
          </div>
          {/* Order Footer */}
          <div className="flex flex-col items-center justify-end gap-4 lg:flex-row">
            <div className="flex flex-col gap-4 md:flex-row">
              <Button
                startContent={<CiReceipt size={22} />}
                className="w-[160px] px-4 py-2 font-medium duration-500 ease-in-out transform bg-transparent border cursor-pointer transition- text-primary rounded-xl border-primary hover:bg-primary hover:text-white "
                onPress={() => {
                  window.print();
                }}
              >
                طباعة الفاتورة
              </Button>
              <Button
                startContent={<BsChatText size={18} />}
                className="w-[160px] px-4 py-2 font-medium duration-500 ease-in-out transform bg-transparent border cursor-pointer transition- text-primary rounded-xl border-primary hover:bg-primary hover:text-white "
                onPress={() => {
                  // store selected invoice id so the modal can read it
                  // if (typeof window !== "undefined")
                  //   localStorage.setItem("invoiceId", o.id);
                  navigate(`/vendors/${order.merchant_id}/chat`);
                }}
              >
                عرض المحادثة
              </Button>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
