import DefaultLayout from "@/layouts/default";
// Simple custom tabs — avoid type mismatches with the external Tabs component
import { IoCalendarOutline } from "react-icons/io5";
import { TbInvoice } from "react-icons/tb";
import { VscEye } from "react-icons/vsc";

import { useState } from "react";
import { Button } from "@heroui/button";

import { invoices } from "@/config/invoices";
import { useDispatch } from "react-redux";
import { openModal } from "@/features/mainModal/mainModalSlice";
export default function MyInvoices() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const dispatch = useDispatch();
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center w-full py-10">
        <div className="flex flex-col items-center justify-between w-full lg:flex-row">
          <h3 className="text-3xl font-normal">فواتيري</h3>
          <div className="grid grid-cols-2 gap-3 mt-4 lg:flex lg:items-center">
            {[
              { id: "all", label: "جميع الفواتير" },
              { id: "thisMonth", label: "هذا الشهر" },
              { id: "lastMonth", label: "الشهر الماضي" },
              { id: "threeMonths", label: "منذ 3 أشهر" },
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
                startContent={<IoCalendarOutline size={20} />}
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
          {activeTab === "all" && (
            <div className="grid gap-4 lg:grid-cols-2">
              {invoices.map((i) => (
                <div
                  key={i.id}
                  className="flex flex-col h-full gap-4 p-4 border-1 border-border rounded-2xl "
                >
                  <div className="flex justify-between gap-2">
                    <div className="flex gap-2">
                      <div className="flex items-center justify-center p-3 bg-default-100 rounded-2xl">
                        <TbInvoice size={20} />
                      </div>
                      <div className="">
                        <p>{i.invoice_number}</p>
                        <p className="text-xs text-light-black">{i.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-lg">
                      <p>{Math.round(i.total_amount)} ريال </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between w-full gap-2">
                    <div className="flex flex-row items-center justify-between w-full">
                      <p className="text-sm text-light-black">رقم الطلب:</p>
                      <p className="text-sm">{i.order_number}</p>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full">
                      <p className="text-sm text-light-black">اسم التاجر:</p>
                      <p className="text-sm">{i.vendor_name}</p>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full">
                      <p className="text-sm text-light-black">طريقة الدفع:</p>
                      <p className="text-sm">{i.payment_method}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      startContent={<VscEye size={20} />}
                      className="px-4 py-2 font-medium duration-500 ease-in-out transform bg-transparent border cursor-pointer transition- text-primary rounded-xl border-primary hover:bg-primary hover:text-white "
                      onPress={() => {
                        // store selected invoice id so the modal can read it
                        if (typeof window !== "undefined")
                          localStorage.setItem("invoiceId", i.id);
                        dispatch(openModal("invoiceModal"));
                      }}
                    >
                      تفاصيل الفاتورة
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "thisMonth" && (
            <div className="grid gap-4 lg:grid-cols-2">
              {invoices
                .filter((i) => {
                  const invoiceDate = new Date(i.date);
                  const now = new Date();
                  return (
                    invoiceDate.getMonth() === now.getMonth() &&
                    invoiceDate.getFullYear() === now.getFullYear()
                  );
                })
                .map((i) => (
                  <div
                    key={i.id}
                    className="flex flex-col h-full gap-4 p-4 border-1 border-border rounded-2xl "
                  >
                    <div className="flex justify-between gap-2">
                      <div className="flex gap-2">
                        <div className="flex items-center justify-center p-3 bg-default-100 rounded-2xl">
                          <TbInvoice size={20} />
                        </div>
                        <div className="">
                          <p>{i.invoice_number}</p>
                          <p className="text-xs text-light-black">{i.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-lg">
                        <p>{Math.round(i.total_amount)} ريال </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between w-full gap-2">
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="text-sm text-light-black">رقم الطلب:</p>
                        <p className="text-sm">{i.order_number}</p>
                      </div>
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="text-sm text-light-black">اسم التاجر:</p>
                        <p className="text-sm">{i.vendor_name}</p>
                      </div>
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="text-sm text-light-black">طريقة الدفع:</p>
                        <p className="text-sm">{i.payment_method}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        startContent={<VscEye size={20} />}
                        className="px-4 py-2 font-medium transition duration-500 ease-in-out transform bg-transparent border cursor-pointer text-primary rounded-xl border-primary hover:bg-primary hover:text-white "
                        onPress={() => {
                          // store selected invoice id so the modal can read it
                          if (typeof window !== "undefined")
                            localStorage.setItem("invoiceId", i.id);
                          dispatch(openModal("invoiceModal"));
                        }}
                      >
                        تفاصيل الفاتورة
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === "lastMonth" && (
            <div className="grid gap-4 lg:grid-cols-2">
              {invoices
                .filter((i) => {
                  const invoiceDate = new Date(i.date);

                  const lastMonth = new Date();
                  lastMonth.setMonth(lastMonth.getMonth() - 1);

                  return (
                    invoiceDate.getMonth() === lastMonth.getMonth() &&
                    invoiceDate.getFullYear() === lastMonth.getFullYear()
                  );
                })
                .map((i) => (
                  <div
                    key={i.id}
                    className="flex flex-col h-full gap-4 p-4 border-1 border-border rounded-2xl "
                  >
                    <div className="flex justify-between gap-2">
                      <div className="flex gap-2">
                        <div className="flex items-center justify-center p-3 bg-default-100 rounded-2xl">
                          <TbInvoice size={20} />
                        </div>
                        <div className="">
                          <p>{i.invoice_number}</p>
                          <p className="text-xs text-light-black">{i.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-lg">
                        <p>{Math.round(i.total_amount)} ريال </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between w-full gap-2">
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="text-sm text-light-black">رقم الطلب:</p>
                        <p className="text-sm">{i.order_number}</p>
                      </div>
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="text-sm text-light-black">اسم التاجر:</p>
                        <p className="text-sm">{i.vendor_name}</p>
                      </div>
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="text-sm text-light-black">طريقة الدفع:</p>
                        <p className="text-sm">{i.payment_method}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        startContent={<VscEye size={20} />}
                        className="px-4 py-2 font-medium transition duration-500 ease-in-out transform bg-transparent border cursor-pointer text-primary rounded-xl border-primary hover:bg-primary hover:text-white "
                        onPress={() => {
                          // store selected invoice id so the modal can read it
                          if (typeof window !== "undefined")
                            localStorage.setItem("invoiceId", i.id);
                          dispatch(openModal("invoiceModal"));
                        }}
                      >
                        تفاصيل الفاتورة
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === "threeMonths" && (
            <div className="grid gap-4 lg:grid-cols-2">
              {invoices
                .filter((i) => {
                  const invoiceDate = new Date(i.date);

                  const lastThreeMonths = new Date();
                  lastThreeMonths.setMonth(lastThreeMonths.getMonth() - 3);

                  return (
                    invoiceDate.getMonth() === lastThreeMonths.getMonth() &&
                    invoiceDate.getFullYear() === lastThreeMonths.getFullYear()
                  );
                })
                .map((i) => (
                  <div
                    key={i.id}
                    className="flex flex-col h-full gap-4 p-4 border-1 border-border rounded-2xl "
                  >
                    <div className="flex justify-between gap-2">
                      <div className="flex gap-2">
                        <div className="flex items-center justify-center p-3 bg-default-100 rounded-2xl">
                          <TbInvoice size={20} />
                        </div>
                        <div className="">
                          <p>{i.invoice_number}</p>
                          <p className="text-xs text-light-black">{i.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-lg">
                        <p>{Math.round(i.total_amount)} ريال </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between w-full gap-2">
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="text-sm text-light-black">رقم الطلب:</p>
                        <p className="text-sm">{i.order_number}</p>
                      </div>
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="text-sm text-light-black">اسم التاجر:</p>
                        <p className="text-sm">{i.vendor_name}</p>
                      </div>
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="text-sm text-light-black">طريقة الدفع:</p>
                        <p className="text-sm">{i.payment_method}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        startContent={<VscEye size={20} />}
                        className="px-4 py-2 font-medium transition duration-500 ease-in-out transform bg-transparent border cursor-pointer text-primary rounded-xl border-primary hover:bg-primary hover:text-white "
                        onPress={() => {
                          // store selected invoice id so the modal can read it
                          if (typeof window !== "undefined")
                            localStorage.setItem("invoiceId", i.id);
                          dispatch(openModal("invoiceModal"));
                        }}
                      >
                        تفاصيل الفاتورة
                      </Button>
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
