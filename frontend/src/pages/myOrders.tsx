import DefaultLayout from "@/layouts/default";
// Simple custom tabs — avoid type mismatches with the external Tabs component
import {
  CiCreditCard1,
  CiDeliveryTruck,
  CiSearch,
  CiShop,
  CiStar,
  CiViewList,
} from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";

import { CiClock1 } from "react-icons/ci";
import { VscSync } from "react-icons/vsc";
import { PiMapPin } from "react-icons/pi";
import { IoCarSportOutline } from "react-icons/io5";
import { GoChecklist } from "react-icons/go";
import { FaFire, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { PiPackageThin } from "react-icons/pi";

import { useState } from "react";
import { Button } from "@heroui/button";

import { orders_data } from "@/config/orders_data";

import { BsXLg } from "react-icons/bs";
import { Progress } from "@heroui/progress";

import { useNavigate } from "react-router-dom";
export default function MyOrders() {
  const [activeTab, setActiveTab] = useState<string>("waiting");
  const [orders, setOrders] = useState(orders_data);

  const navigate = useNavigate();

  const handleCancleOrder = (id: string) => {
    const newOrders = orders.filter((order) => order.id !== id);
    setOrders(newOrders);
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
  // const randomProducts =
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center w-full py-10">
        <div className="flex flex-col items-center justify-between w-full lg:flex-row">
          <h3 className="text-3xl font-normal">طلباتي</h3>
          <div className="grid grid-cols-2 gap-3 mt-4 lg:flex lg:items-center">
            {[
              { id: "waiting", label: "في الإنتظار" },
              { id: "current", label: "حالية" },
              { id: "pendingPayment", label: "قيد الدفع" },
              { id: "completed", label: "منتهية" },
            ].map((t) => (
              <Button
                key={t.id}
                aria-pressed={activeTab === t.id}
                className={`px-4 py-2 rounded-3xl font-medium transition duration-700 ease-in-out transform cursor-pointer focus:outline-none whitespace-nowrap
                    ${
                      activeTab === t.id
                        ? "bg-primary text-white shadow-md "
                        : "bg-transparent text-gray-600 border border-border hover:bg-primary/70 hover:text-white "
                    }`}
                onPress={() => setActiveTab(t.id)}
                startContent={
                  t.id === "waiting" ? (
                    <>
                      <CiClock1 size={20} />
                      <p className="">
                        {
                          orders.filter((o) => o.status === "في الإنتظار")
                            .length
                        }
                      </p>
                    </>
                  ) : t.id === "current" ? (
                    <>
                      <VscSync size={20} />
                      <p className="">
                        {orders.filter((o) => o.status === "حالية").length}
                      </p>
                    </>
                  ) : t.id === "pendingPayment" ? (
                    <>
                      <CiCreditCard1 size={20} />
                      <p className="">
                        {orders.filter((o) => o.status === "قيد الدفع").length}
                      </p>
                    </>
                  ) : (
                    <>
                      <CiCircleCheck size={20} />
                      <p className="">
                        {orders.filter((o) => o.status === "منتهية").length}
                      </p>
                    </>
                  )
                }
              >
                {t.label}
              </Button>
            ))}
          </div>
        </div>
        <div
          className={
            "mt-4 border-1 border-border rounded-3xl w-full lg:p-8 p-4"
          }
          key={activeTab}
        >
          {/* active Tab : waiting */}

          {activeTab === "waiting" && (
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-1">
              {orders
                .filter((o) => o.status === "في الإنتظار")
                .map((o) => (
                  <div
                    key={o.id}
                    className="flex flex-col h-full gap-6 p-8 border-1 border-border rounded-2xl "
                  >
                    <div className="flex flex-col justify-between gap-2 md:flex-row">
                      <div className="flex justify-start gap-2">
                        <div className="flex items-center justify-start p-3 bg-default-100 rounded-2xl">
                          <PiPackageThin size={20} />
                        </div>
                        <div className="">
                          <p># {o.order_number}</p>
                          <p className="text-xs text-light-black">{o.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-start text-lg md:justify-end">
                        <div
                          className={`flex items-center  gap-2 px-4 py-2  ${
                            o.status === "في الإنتظار"
                              ? "border-1 border-border rounded-xl text-icon text-sm"
                              : o.status === "حالية"
                                ? "border-1 border-[#d8b61d] rounded-xl text-[#d8b61d] text-sm "
                                : o.status === "منتهية"
                                  ? "border-1 border-primary rounded-xl text-primary text-sm "
                                  : o.status === "قيد الدفع"
                                    ? "border-1 border-red-500 rounded-xl text-red-500 text-sm "
                                    : null
                          }`}
                        >
                          <p>{o.status}</p>
                          {o.status === "في الإنتظار" ? (
                            <CiClock1 size={18} />
                          ) : o.status === "حالية" ? (
                            <VscSync size={18} />
                          ) : o.status === "منتهية" ? (
                            <CiCircleCheck size={18} />
                          ) : o.status === "قيد الدفع" ? (
                            <CiCreditCard1 size={18} />
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <hr className="text-black/10" />

                    <div className="flex flex-col justify-between w-full gap-2">
                      <div className="flex flex-row items-center justify-start w-full gap-2">
                        <PiMapPin size={20} />
                        <p className="text-sm">{o.address}</p>
                      </div>
                      <div className="flex flex-row items-center justify-start w-full gap-2">
                        <IoCarSportOutline size={20} />
                        <p className="text-sm">
                          {o.car_name} {o.car_model}
                        </p>
                      </div>
                      <div className="flex flex-row items-center justify-start w-full gap-2">
                        <GoChecklist size={20} />
                        <p className="text-sm">
                          {o.products.map((p) => p.name).join(" - ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
                      <div className="flex flex-row items-center">
                        <p className="text-center text-primary lg:text-right">
                          {o.has_quotes
                            ? `✨ لديك ${o.quotes_number} عروض جديدة! • أقل سعر حتى الآن: 450 `
                            : "جاري استقبال عروض الأسعار من التجار.."}
                          .
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-2 lg:flex-row">
                        {o.has_quotes ? (
                          <div className="flex flex-col gap-2 lg:flex-row">
                            <Button
                              startContent={<FaFire size={20} />}
                              className="lg:w-[160px] px-4 py-2 font-medium duration-500 ease-in-out transform bg-transparent border cursor-pointer transition- text-primary rounded-xl border-primary hover:bg-primary hover:text-white "
                              onPress={() => {
                                // store selected invoice id so the modal can read it
                                if (typeof window !== "undefined")
                                  localStorage.setItem("invoiceId", o.id);
                                navigate(`/myOrders/${o.order_number}/quotes`);
                              }}
                            >
                              عروض الأسعار
                            </Button>
                            <Button
                              startContent={<CiEdit size={20} />}
                              className="lg:w-[160px] px-4 py-2 font-medium duration-500 ease-in-out transform bg-transparent border cursor-pointer transition- text-primary rounded-xl border-primary hover:bg-primary hover:text-white "
                              onPress={() => {
                                // store selected invoice id so the modal can read it
                                navigate(
                                  `/myOrders/${o.order_number}/order-details`
                                );
                              }}
                            >
                              تعديل
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2 lg:flex-row">
                            <Button
                              startContent={<CiEdit size={20} />}
                              className="w-[160px] px-4 py-2 font-medium duration-500 ease-in-out transform bg-transparent border cursor-pointer transition- text-primary rounded-xl border-primary hover:bg-primary hover:text-white "
                              onPress={() => {
                                // store selected invoice id so the modal can read it
                                navigate(
                                  `/myOrders/${o.order_number}/order-details`
                                );
                              }}
                            >
                              تعديل
                            </Button>
                            <Button
                              startContent={<BsXLg size={20} />}
                              className="w-[160px] px-4 py-2 font-medium duration-500 ease-in-out transform bg-transparent border cursor-pointer transition- text-red-500 rounded-xl border-red-500 hover:bg-red-500 hover:text-white "
                              onPress={() => {
                                // store selected invoice id so the modal can read it
                                handleCancleOrder(o.id);
                              }}
                            >
                              إلغاء
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* active Tab : pendingPayment */}

          {activeTab === "pendingPayment" && (
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-1">
              {orders
                .filter((o) => o.status === "قيد الدفع")
                .map((o) => (
                  <div
                    key={o.id}
                    className="flex flex-col h-full gap-6 p-8 border-1 border-border rounded-2xl "
                  >
                    <div className="flex flex-col justify-between gap-2 lg:flex-row">
                      <div className="flex gap-2">
                        <div className="flex items-center justify-center p-3 bg-default-100 rounded-2xl">
                          <PiPackageThin size={20} />
                        </div>
                        <div className="">
                          <p># {o.order_number}</p>
                          <p className="text-xs text-light-black">{o.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-lg">
                        <div
                          className={`flex items-center gap-2 px-4 py-2  ${
                            o.status === "في الإنتظار"
                              ? "border-1 border-border rounded-xl text-icon text-sm"
                              : o.status === "حالية"
                                ? "border-1 border-[#d8b61d] rounded-xl text-[#d8b61d] text-sm "
                                : o.status === "منتهية"
                                  ? "border-1 border-primary rounded-xl text-primary text-sm "
                                  : o.status === "قيد الدفع"
                                    ? "border-1 border-red-500 rounded-xl text-red-500 text-sm "
                                    : null
                          }`}
                        >
                          <p>{o.status}</p>
                          {o.status === "في الإنتظار" ? (
                            <CiClock1 size={18} />
                          ) : o.status === "حالية" ? (
                            <VscSync size={18} />
                          ) : o.status === "منتهية" ? (
                            <CiCircleCheck size={18} />
                          ) : o.status === "قيد الدفع" ? (
                            <CiCreditCard1 size={18} />
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <hr className="text-black/10" />

                    <div className="flex flex-col justify-between w-full gap-2">
                      <div className="flex flex-row items-center justify-start w-full gap-2">
                        <PiMapPin size={20} />
                        <p className="text-sm">{o.address}</p>
                      </div>
                      <div className="flex flex-row items-center justify-start w-full gap-2">
                        <IoCarSportOutline size={20} />
                        <p className="text-sm">
                          {o.car_name} {o.car_model}
                        </p>
                      </div>
                      <div className="flex flex-row items-center justify-start w-full gap-2">
                        <GoChecklist size={20} />
                        <p className="text-sm">
                          {o.products.map((p) => p.name).join(" - ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                      <div className="flex flex-row items-center">
                        <p className="text-primary">
                          سعر القطع الإجمالي: {o.total_price} ريال
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <div className="flex gap-2">
                          <Button
                            startContent={<CiCreditCard1 size={20} />}
                            className="w-[160px] px-4 py-2 font-medium duration-500 ease-in-out transform bg-transparent border cursor-pointer transition- text-primary rounded-xl border-primary hover:bg-primary hover:text-white "
                            onPress={() => {
                              // store selected invoice id so the modal can read it
                              // if (typeof window !== "undefined")
                              //   localStorage.setItem("invoiceId", o.id);
                              navigate(
                                `/myOrders/${o.order_number}/order-details`
                              );
                            }}
                          >
                            ادفع الآن
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* active Tab : current */}

          {activeTab === "current" && (
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-1">
              {orders
                .filter((o) => o.status === "حالية")
                .map((o) => (
                  <div
                    key={o.id}
                    className="flex flex-col h-full gap-6 p-8 border-1 border-border rounded-2xl "
                  >
                    <div className="flex flex-col justify-between gap-2 md:flex-row">
                      <div className="flex gap-2">
                        <div className="flex items-center justify-center p-3 bg-default-100 rounded-2xl">
                          <PiPackageThin size={20} />
                        </div>
                        <div className="">
                          <p># {o.order_number}</p>
                          <p className="text-xs text-light-black">{o.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-lg">
                        <div
                          className={`flex items-center gap-2 px-4 py-2  ${
                            o.status === "في الإنتظار"
                              ? "border-1 border-border rounded-xl text-icon text-sm"
                              : o.status === "حالية"
                                ? "border-1 border-[#d8b61d] rounded-xl text-[#d8b61d] text-sm "
                                : o.status === "منتهية"
                                  ? "border-1 border-primary rounded-xl text-primary text-sm "
                                  : o.status === "قيد الدفع"
                                    ? "border-1 border-red-500 rounded-xl text-red-500 text-sm "
                                    : null
                          }`}
                        >
                          <p>{o.status}</p>
                          {o.status === "في الإنتظار" ? (
                            <CiClock1 size={18} />
                          ) : o.status === "حالية" ? (
                            <VscSync size={18} />
                          ) : o.status === "منتهية" ? (
                            <CiCircleCheck size={18} />
                          ) : o.status === "قيد الدفع" ? (
                            <CiCreditCard1 size={18} />
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <hr className="text-black/10" />

                    <div className="flex flex-col justify-between w-full gap-2">
                      <div className="flex flex-row items-center justify-start w-full gap-2">
                        <PiMapPin size={20} />
                        <p className="text-sm">{o.address}</p>
                      </div>
                      <div className="flex flex-row items-center justify-start w-full gap-2">
                        <IoCarSportOutline size={20} />
                        <p className="text-sm">
                          {o.car_name} {o.car_model}
                        </p>
                      </div>
                      <div className="flex flex-row items-center justify-start w-full gap-2">
                        <GoChecklist size={20} />
                        <p className="text-sm">
                          {o.products.map((p) => p.name).join(" - ")}
                        </p>
                      </div>
                      <div className="flex flex-row items-center justify-start w-full gap-2">
                        <CiShop size={20} />
                        <p className="text-sm">{o.merchant_name}</p>
                      </div>
                    </div>
                    <hr className="text-black/10" />

                    <div className="flex flex-col items-center justify-between gap-2 md:items-end md:flex-row">
                      <div className=" hidden md:flex flex-col items-start justify-center lg:w-[60%] md:w-[70%] w-full gap-6">
                        <p className="text-sm w-50 text-light-black">
                          متابعة مراحل الطلب:
                        </p>
                        <div className="relative w-full h-6">
                          <Progress
                            color="primary"
                            size="sm"
                            value={
                              o.internal_status === "جاري التجهيز"
                                ? 25
                                : o.internal_status === "تم التجهيز"
                                  ? 50
                                  : o.internal_status === "تم إرساله للشحن"
                                    ? 80
                                    : o.internal_status === "تم التسليم"
                                      ? 100
                                      : 0
                            }
                          />
                          {/* المراحل */}
                          <div className="absolute top-[0px] left-0 flex items-center justify-between w-full h-full pointer-events-none">
                            <div>
                              <div
                                className={`w-7 flex items-center justify-center h-7 rounded-full ${
                                  [
                                    "جاري التجهيز",
                                    "تم التجهيز",
                                    "تم إرساله للشحن",
                                    "تم التسليم",
                                  ].includes(o.internal_status ?? "")
                                    ? "bg-primary"
                                    : "bg-gray-400"
                                }`}
                              >
                                <CiSettings size={20} className="text-white" />
                              </div>
                              <p>جاري التجهيز</p>
                            </div>
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-7 flex items-center justify-center h-7 rounded-full ${
                                  [
                                    "تم التجهيز",
                                    "تم إرساله للشحن",
                                    "تم التسليم",
                                  ].includes(o.internal_status ?? "")
                                    ? "bg-primary"
                                    : "bg-gray-400"
                                }`}
                              >
                                <PiPackageThin
                                  size={20}
                                  className="text-white"
                                />
                              </div>
                              <p>تم التجهيز</p>
                            </div>

                            <div className="flex flex-col items-center">
                              <div
                                className={`w-7 flex items-center justify-center h-7 rounded-full ${
                                  ["تم إرساله للشحن", "تم التسليم"].includes(
                                    o.internal_status ?? ""
                                  )
                                    ? "bg-primary"
                                    : "bg-gray-400"
                                }`}
                              >
                                <CiDeliveryTruck
                                  size={20}
                                  className="text-white"
                                />
                              </div>
                              <p>تم إرساله للشحن</p>
                            </div>

                            <div className="flex flex-col items-end ">
                              <div
                                className={`w-7 flex items-center justify-center h-7 rounded-full ${
                                  o.internal_status === "تم التسليم"
                                    ? "bg-primary"
                                    : "bg-gray-400"
                                }`}
                              >
                                <CiCircleCheck
                                  size={20}
                                  className="text-white"
                                />
                              </div>
                              <p>تم التسليم</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row items-end gap-2">
                        <div className="flex gap-2">
                          <Button
                            startContent={<CiSearch size={20} />}
                            className="lg:w-[200px] md:w-[150px] px-4 py-2 font-medium duration-500 ease-in-out transform bg-transparent border cursor-pointer transition- text-primary rounded-xl border-primary hover:bg-primary hover:text-white "
                            onPress={() => {
                              // store selected invoice id so the modal can read it
                              // if (typeof window !== "undefined")
                              //   localStorage.setItem("invoiceId", o.id);
                              // dispatch(openModal("invoiceModal"));
                              navigate(
                                `/myOrders/${o.order_number}/order-details`
                              );
                            }}
                          >
                            متابعة الطلب
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* active Tab : completed */}

          {activeTab === "completed" && (
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-1">
              {orders
                .filter((o) => o.status === "منتهية")
                .map((o) => (
                  <div
                    key={o.id}
                    className="flex flex-col h-full gap-6 p-8 border-1 border-border rounded-2xl "
                  >
                    <div className="flex flex-col justify-between gap-2 md:flex-row">
                      <div className="flex gap-2">
                        <div className="flex items-center justify-center p-3 bg-default-100 rounded-2xl">
                          <PiPackageThin size={20} />
                        </div>
                        <div className="">
                          <p># {o.order_number}</p>
                          <p className="text-xs text-light-black">{o.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-lg">
                        <div
                          className={`flex items-center gap-2 px-4 py-2  ${
                            o.status === "في الإنتظار"
                              ? "border-1 border-border rounded-xl text-icon text-sm"
                              : o.status === "حالية"
                                ? "border-1 border-[#d8b61d] rounded-xl text-[#d8b61d] text-sm "
                                : o.status === "منتهية"
                                  ? "border-1 border-primary rounded-xl text-primary text-sm "
                                  : o.status === "قيد الدفع"
                                    ? "border-1 border-red-500 rounded-xl text-red-500 text-sm "
                                    : null
                          }`}
                        >
                          <p>{o.status}</p>
                          {o.status === "في الإنتظار" ? (
                            <CiClock1 size={18} />
                          ) : o.status === "حالية" ? (
                            <VscSync size={18} />
                          ) : o.status === "منتهية" ? (
                            <CiCircleCheck size={18} />
                          ) : o.status === "قيد الدفع" ? (
                            <CiCreditCard1 size={18} />
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <hr className="text-black/10" />

                    <div className="flex flex-col justify-between w-full gap-2">
                      <div className="flex flex-row items-center justify-start w-full gap-2">
                        <PiMapPin size={20} />
                        <p className="text-sm">{o.address}</p>
                      </div>
                      <div className="flex flex-row items-center justify-start w-full gap-2">
                        <IoCarSportOutline size={20} />
                        <p className="text-sm">
                          {o.car_name} {o.car_model}
                        </p>
                      </div>
                      <div className="flex flex-row items-center justify-start w-full gap-2">
                        <GoChecklist size={20} />
                        <p className="text-sm">
                          {o.products.map((p) => p.name).join(" - ")}
                        </p>
                      </div>
                      <div className="flex flex-row items-center justify-start w-full gap-2">
                        <CiShop size={20} />
                        <p className="text-sm">{o.merchant_name}</p>
                      </div>
                      <div className="flex flex-row items-center justify-center w-full gap-2 md:justify-end">
                        {o.rating ? (
                          <div className="flex items-center gap-4">
                            تقييمك: {renderStars(o.rating)}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex flex-row items-center justify-end gap-2">
                      <div className="flex gap-2">
                        {o.rating ? (
                          <div className="flex gap-2">
                            <Button
                              startContent={<CiViewList size={20} />}
                              className="w-[160px] px-4 py-2 font-medium duration-500 ease-in-out transform bg-transparent border cursor-pointer transition- text-primary rounded-xl border-primary hover:bg-primary hover:text-white "
                              onPress={() => {
                                navigate(
                                  `/myOrders/${o.order_number}/order-details`
                                );
                              }}
                            >
                              تفاصيل الطلب
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2 md:flex-row">
                            <Button
                              startContent={<CiStar size={20} />}
                              className="w-[160px] px-4 py-2 font-medium duration-500 ease-in-out transform bg-transparent border cursor-pointer transition- text-primary rounded-xl border-primary hover:bg-primary hover:text-white "
                              onPress={() => {
                                navigate(
                                  `/myOrders/${o.order_number}/order-details`
                                );
                              }}
                            >
                              قيم الآن
                            </Button>
                            <Button
                              startContent={<CiViewList size={20} />}
                              className="w-[160px] px-4 py-2 font-medium duration-500 ease-in-out transform bg-transparent border cursor-pointer transition- text-primary rounded-xl border-primary hover:bg-primary hover:text-white "
                              onPress={() => {
                                navigate(
                                  `/myOrders/${o.order_number}/order-details`
                                );
                              }}
                            >
                              تفاصيل الطلب
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
