import DefaultLayout from "@/layouts/default";
// Simple custom tabs — avoid type mismatches with the external Tabs component
import { HiOutlineClipboardList } from "react-icons/hi";
import { CiClock1, CiChat1, CiCircleCheck } from "react-icons/ci";
import { useState } from "react";
import { Button } from "@heroui/button";
import { complaints } from "@/config/complaints";
import { Progress } from "@heroui/progress";
import { parts_data } from "@/config/parts_data";
export default function Complaints() {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center w-full py-10">
        <div className="flex flex-col items-center justify-between w-full lg:flex-row">
          <h3 className="text-3xl font-normal">الشكاوي والمتابعة</h3>
          <div className="grid grid-cols-2 gap-3 mt-4 lg:flex lg:items-center">
            {[
              { id: "all", label: "جميع الشكاوى" },
              { id: "underProcess", label: "تحت المعالجة" },
              { id: "contectedVendor", label: "تم التواصل مع التاجر" },
              { id: "done", label: "تم المعالجة" },
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
                  t.id === "all" ? (
                    <HiOutlineClipboardList size={20} />
                  ) : t.id === "underProcess" ? (
                    <CiClock1 size={20} />
                  ) : t.id === "contectedVendor" ? (
                    <CiChat1 size={20} />
                  ) : t.id === "done" ? (
                    <CiCircleCheck size={20} />
                  ) : null
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
          {activeTab === "all" && (
            <div className="grid gap-4 lg:grid-cols-2">
              {complaints.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-col h-full gap-4 p-4 border-1 border-border rounded-2xl "
                >
                  <div className="flex justify-between gap-2">
                    <div>
                      <p>{c.id}</p>
                      <p className="text-xs text-light-black">{c.date}</p>
                    </div>
                    <div
                      className={`flex items-center gap-2 px-4  ${
                        c.status === "تحت المعالجة"
                          ? "border-1 border-[#1D4ED8] rounded-2xl text-[#1D4ED8] text-sm"
                          : c.status === "تم التواصل مع التاجر"
                            ? "border-1 border-[#d8b61d] rounded-2xl text-[#d8b61d] text-sm "
                            : c.status === "تم المعالجة"
                              ? "border-1 border-primary rounded-2xl text-primary text-sm "
                              : null
                      }`}
                    >
                      <p>{c.status}</p>
                      {c.status === "تحت المعالجة" ? (
                        <CiClock1 size={18} />
                      ) : c.status === "تم التواصل مع التاجر" ? (
                        <CiChat1 size={18} />
                      ) : c.status === "تم المعالجة" ? (
                        <CiCircleCheck size={18} />
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between w-full gap-2">
                    <div className="flex flex-row items-center justify-between w-full">
                      <p className="text-sm text-light-black">رقم الطلب:</p>
                      <p className="text-sm">{c.complaint_number}</p>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full">
                      <p className="text-sm text-light-black">اسم التاجر:</p>
                      <p className="text-sm">{c.vendor_name}</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between gap-2 p-2 text-sm bg-default-100 rounded-2xl ">
                    <p className="font-medium">سبب الشكوى: {c.title}</p>
                    <p className="text-light-black">{c.description}</p>
                  </div>
                  {c.admin_response_title ? (
                    <div className="flex flex-col justify-between gap-2 p-2 text-sm bg-default-100 rounded-2xl ">
                      <p className="font-medium text-primary">
                        رد الإدارة: {c.admin_response_title}
                      </p>
                      <p className="text-light-black">
                        {c.admin_response_description}
                      </p>
                    </div>
                  ) : null}
                  <div className="flex flex-col items-start justify-center w-full gap-4">
                    <p className="text-sm w-50 text-light-black">
                      مراحل متابعة الشكوى:
                    </p>
                    <div className="relative w-full h-6">
                      <Progress
                        color="primary"
                        aria-label="مراحل متابعة الشكوى"
                        size="sm"
                        value={
                          c.status === "تحت المعالجة"
                            ? 35
                            : c.status === "تم التواصل مع التاجر"
                              ? 65
                              : c.status === "تم المعالجة"
                                ? 100
                                : 0
                        }
                      />
                      {/* المراحل */}
                      <div className="absolute top-[-10px] left-0 flex items-center justify-between w-full h-full pointer-events-none">
                        <span
                          className={`w-4 h-4 rounded-full ${
                            [
                              "تحت المعالجة",
                              "تم التواصل مع التاجر",
                              "تم المعالجة",
                            ].includes(c.status)
                              ? "bg-primary"
                              : "bg-gray-400"
                          }`}
                        />
                        <span
                          className={`w-4 h-4 rounded-full ${
                            ["تم التواصل مع التاجر", "تم المعالجة"].includes(
                              c.status
                            )
                              ? "bg-primary"
                              : "bg-gray-400"
                          }`}
                        />
                        <span
                          className={`w-4 h-4 rounded-full ${
                            c.status === "تم المعالجة"
                              ? "bg-primary"
                              : "bg-gray-400"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center self-end justify-between w-full gap-4 mt-auto">
                    {(() => {
                      // نحدد عدد الصور اللي هتظهر عشوائي بين 0 و 3
                      const count = Math.floor(Math.random() * 4); // 0, 1, 2, 3

                      // نخلط المصفوفة عشوائيًا
                      const shuffled = [...parts_data].sort(
                        () => 0.5 - Math.random()
                      );

                      // ناخد أول `count` صور
                      const selectedImages = shuffled.slice(0, count);

                      if (selectedImages.length === 0) return null; // لو مفيش صور، نرجع null

                      return (
                        <>
                          <p className="text-sm text-light-black">
                            الصور المرفقة:
                          </p>
                          <div className="flex items-start justify-start w-full gap-4">
                            {selectedImages.map((p, idx) => (
                              <div key={idx} className="flex flex-row">
                                <img
                                  className="w-30 h-30 rounded-2xl"
                                  src={p.image}
                                />
                              </div>
                            ))}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "underProcess" && (
            <div className="grid gap-4 lg:grid-cols-2">
              {complaints
                .filter((c) => c.status === "تحت المعالجة") // تصفية الشكاوي تحت المراجعة فقط
                .map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-col gap-4 p-4 border-1 border-border rounded-2xl"
                  >
                    <div className="flex justify-between gap-2">
                      <div>
                        <p>{c.id}</p>
                        <p className="text-xs text-light-black">{c.date}</p>
                      </div>
                      <div
                        className={`flex items-center gap-2 px-4  ${
                          c.status === "تحت المعالجة"
                            ? "border-1 border-[#1D4ED8] rounded-2xl text-[#1D4ED8] text-sm"
                            : c.status === "تم التواصل مع التاجر"
                              ? "border-1 border-[#d8b61d] rounded-2xl text-[#d8b61d] text-sm"
                              : c.status === "تم المعالجة"
                                ? "border-1 border-primary rounded-2xl text-primary text-sm"
                                : null
                        }`}
                      >
                        <p>{c.status}</p>
                        {c.status === "تحت المعالجة" ? (
                          <CiClock1 size={18} />
                        ) : c.status === "تم التواصل مع التاجر" ? (
                          <CiChat1 size={18} />
                        ) : c.status === "تم المعالجة" ? (
                          <CiCircleCheck size={18} />
                        ) : null}
                      </div>
                    </div>

                    {/* باقي الكود زي ما هو */}
                    <div className="flex flex-col justify-between w-full gap-2">
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="text-sm text-light-black">رقم الطلب:</p>
                        <p className="text-sm">{c.complaint_number}</p>
                      </div>
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="text-sm text-light-black">اسم التاجر:</p>
                        <p className="text-sm">{c.vendor_name}</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between gap-2 p-2 text-sm bg-default-100 rounded-2xl">
                      <p className="font-medium">سبب الشكوى: {c.title}</p>
                      <p className="text-light-black">{c.description}</p>
                    </div>

                    {c.admin_response_title && (
                      <div className="flex flex-col justify-between gap-2 p-2 text-sm bg-default-100 rounded-2xl">
                        <p className="font-medium text-primary">
                          رد الإدارة: {c.admin_response_title}
                        </p>
                        <p className="text-light-black">
                          {c.admin_response_description}
                        </p>
                      </div>
                    )}

                    {/* مراحل متابعة الشكوى */}
                    <div className="flex flex-col items-start justify-center w-full gap-4">
                      <p className="text-sm w-50 text-light-black">
                        مراحل متابعة الشكوى:
                      </p>
                      <div className="relative w-full h-6">
                        <Progress
                          color="primary"
                          aria-label="مراحل متابعة الشكوى"
                          size="sm"
                          value={
                            c.status === "تحت المعالجة"
                              ? 35
                              : c.status === "تم التواصل مع التاجر"
                                ? 65
                                : c.status === "تم المعالجة"
                                  ? 100
                                  : 0
                          }
                        />
                        {/* المراحل */}
                        <div className="absolute top-[-10px] left-0 flex items-center justify-between w-full h-full pointer-events-none">
                          <span
                            className={`w-4 h-4 rounded-full ${
                              [
                                "تحت المعالجة",
                                "تم التواصل مع التاجر",
                                "تم المعالجة",
                              ].includes(c.status)
                                ? "bg-primary"
                                : "bg-gray-400"
                            }`}
                          />
                          <span
                            className={`w-4 h-4 rounded-full ${
                              ["تم التواصل مع التاجر", "تم المعالجة"].includes(
                                c.status
                              )
                                ? "bg-primary"
                                : "bg-gray-400"
                            }`}
                          />
                          <span
                            className={`w-4 h-4 rounded-full ${
                              c.status === "تم المعالجة"
                                ? "bg-primary"
                                : "bg-gray-400"
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* الصور المرفقة */}
                    <div className="flex flex-col items-center self-end justify-between w-full gap-4">
                      {(() => {
                        const count = Math.floor(Math.random() * 4);
                        const shuffled = [...parts_data].sort(
                          () => 0.5 - Math.random()
                        );
                        const selectedImages = shuffled.slice(0, count);

                        if (selectedImages.length === 0) return null;

                        return (
                          <>
                            <p className="text-sm text-light-black">
                              الصور المرفقة:
                            </p>
                            <div className="flex items-start justify-start w-full gap-4">
                              {selectedImages.map((p, idx) => (
                                <div key={idx} className="flex flex-row">
                                  <img
                                    className="w-30 h-30 rounded-2xl"
                                    src={p.image}
                                  />
                                </div>
                              ))}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === "contectedVendor" && (
            <div className="grid gap-4 lg:grid-cols-2">
              {complaints
                .filter((c) => c.status === "تم التواصل مع التاجر") // تصفية الشكاوي تحت المراجعة فقط
                .map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-col gap-4 p-4 border-1 border-border rounded-2xl"
                  >
                    <div className="flex justify-between gap-2">
                      <div>
                        <p>{c.id}</p>
                        <p className="text-xs text-light-black">{c.date}</p>
                      </div>
                      <div
                        className={`flex items-center gap-2 px-4  ${
                          c.status === "تحت المعالجة"
                            ? "border-1 border-[#1D4ED8] rounded-2xl text-[#1D4ED8] text-sm"
                            : c.status === "تم التواصل مع التاجر"
                              ? "border-1 border-[#d8b61d] rounded-2xl text-[#d8b61d] text-sm"
                              : c.status === "تم المعالجة"
                                ? "border-1 border-primary rounded-2xl text-primary text-sm"
                                : null
                        }`}
                      >
                        <p>{c.status}</p>
                        {c.status === "تحت المعالجة" ? (
                          <CiClock1 size={18} />
                        ) : c.status === "تم التواصل مع التاجر" ? (
                          <CiChat1 size={18} />
                        ) : c.status === "تم المعالجة" ? (
                          <CiCircleCheck size={18} />
                        ) : null}
                      </div>
                    </div>

                    {/* باقي الكود زي ما هو */}
                    <div className="flex flex-col justify-between w-full gap-2">
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="text-sm text-light-black">رقم الطلب:</p>
                        <p className="text-sm">{c.complaint_number}</p>
                      </div>
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="text-sm text-light-black">اسم التاجر:</p>
                        <p className="text-sm">{c.vendor_name}</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between gap-2 p-2 text-sm bg-default-100 rounded-2xl">
                      <p className="font-medium">سبب الشكوى: {c.title}</p>
                      <p className="text-light-black">{c.description}</p>
                    </div>

                    {c.admin_response_title && (
                      <div className="flex flex-col justify-between gap-2 p-2 text-sm bg-default-100 rounded-2xl">
                        <p className="font-medium text-primary">
                          رد الإدارة: {c.admin_response_title}
                        </p>
                        <p className="text-light-black">
                          {c.admin_response_description}
                        </p>
                      </div>
                    )}

                    {/* مراحل متابعة الشكوى */}
                    <div className="flex flex-col items-start justify-center w-full gap-4">
                      <p className="text-sm w-50 text-light-black">
                        مراحل متابعة الشكوى:
                      </p>
                      <div className="relative w-full h-6">
                        <Progress
                          color="primary"
                          aria-label="مراحل متابعة الشكوى"
                          size="sm"
                          value={
                            c.status === "تحت المعالجة"
                              ? 35
                              : c.status === "تم التواصل مع التاجر"
                                ? 65
                                : c.status === "تم المعالجة"
                                  ? 100
                                  : 0
                          }
                        />
                        {/* المراحل */}
                        <div className="absolute top-[-10px] left-0 flex items-center justify-between w-full h-full pointer-events-none">
                          <span
                            className={`w-4 h-4 rounded-full ${
                              [
                                "تحت المعالجة",
                                "تم التواصل مع التاجر",
                                "تم المعالجة",
                              ].includes(c.status)
                                ? "bg-primary"
                                : "bg-gray-400"
                            }`}
                          />
                          <span
                            className={`w-4 h-4 rounded-full ${
                              ["تم التواصل مع التاجر", "تم المعالجة"].includes(
                                c.status
                              )
                                ? "bg-primary"
                                : "bg-gray-400"
                            }`}
                          />
                          <span
                            className={`w-4 h-4 rounded-full ${
                              c.status === "تم المعالجة"
                                ? "bg-primary"
                                : "bg-gray-400"
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* الصور المرفقة */}
                    <div className="flex flex-col items-center self-end justify-between w-full gap-4">
                      {(() => {
                        const count = Math.floor(Math.random() * 4);
                        const shuffled = [...parts_data].sort(
                          () => 0.5 - Math.random()
                        );
                        const selectedImages = shuffled.slice(0, count);

                        if (selectedImages.length === 0) return null;

                        return (
                          <>
                            <p className="text-sm text-light-black">
                              الصور المرفقة:
                            </p>
                            <div className="flex items-start justify-start w-full gap-4">
                              {selectedImages.map((p, idx) => (
                                <div key={idx} className="flex flex-row">
                                  <img
                                    className="w-30 h-30 rounded-2xl"
                                    src={p.image}
                                  />
                                </div>
                              ))}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === "done" && (
            <div className="grid gap-4 lg:grid-cols-2">
              {complaints
                .filter((c) => c.status === "تم المعالجة") // تصفية الشكاوي تحت المراجعة فقط
                .map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-col gap-4 p-4 border-1 border-border rounded-2xl"
                  >
                    <div className="flex justify-between gap-2">
                      <div>
                        <p>{c.id}</p>
                        <p className="text-xs text-light-black">{c.date}</p>
                      </div>
                      <div
                        className={`flex items-center gap-2 px-4  ${
                          c.status === "تحت المعالجة"
                            ? "border-1 border-[#1D4ED8] rounded-2xl text-[#1D4ED8] text-sm"
                            : c.status === "تم التواصل مع التاجر"
                              ? "border-1 border-[#d8b61d] rounded-2xl text-[#d8b61d] text-sm"
                              : c.status === "تم المعالجة"
                                ? "border-1 border-primary rounded-2xl text-primary text-sm"
                                : null
                        }`}
                      >
                        <p>{c.status}</p>
                        {c.status === "تحت المعالجة" ? (
                          <CiClock1 size={18} />
                        ) : c.status === "تم التواصل مع التاجر" ? (
                          <CiChat1 size={18} />
                        ) : c.status === "تم المعالجة" ? (
                          <CiCircleCheck size={18} />
                        ) : null}
                      </div>
                    </div>

                    {/* باقي الكود زي ما هو */}
                    <div className="flex flex-col justify-between w-full gap-2">
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="text-sm text-light-black">رقم الطلب:</p>
                        <p className="text-sm">{c.complaint_number}</p>
                      </div>
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="text-sm text-light-black">اسم التاجر:</p>
                        <p className="text-sm">{c.vendor_name}</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between gap-2 p-2 text-sm bg-default-100 rounded-2xl">
                      <p className="font-medium">سبب الشكوى: {c.title}</p>
                      <p className="text-light-black">{c.description}</p>
                    </div>

                    {c.admin_response_title && (
                      <div className="flex flex-col justify-between gap-2 p-2 text-sm bg-default-100 rounded-2xl">
                        <p className="font-medium text-primary">
                          رد الإدارة: {c.admin_response_title}
                        </p>
                        <p className="text-light-black">
                          {c.admin_response_description}
                        </p>
                      </div>
                    )}

                    {/* مراحل متابعة الشكوى */}
                    <div className="flex flex-col items-start justify-center w-full gap-4">
                      <p className="text-sm w-50 text-light-black">
                        مراحل متابعة الشكوى:
                      </p>
                      <div className="relative w-full h-6">
                        <Progress
                          color="primary"
                          aria-label="مراحل متابعة الشكوى"
                          size="sm"
                          value={
                            c.status === "تحت المعالجة"
                              ? 35
                              : c.status === "تم التواصل مع التاجر"
                                ? 65
                                : c.status === "تم المعالجة"
                                  ? 100
                                  : 0
                          }
                        />
                        {/* المراحل */}
                        <div className="absolute top-[-10px] left-0 flex items-center justify-between w-full h-full pointer-events-none">
                          <span
                            className={`w-4 h-4 rounded-full ${
                              [
                                "تحت المعالجة",
                                "تم التواصل مع التاجر",
                                "تم المعالجة",
                              ].includes(c.status)
                                ? "bg-primary"
                                : "bg-gray-400"
                            }`}
                          />
                          <span
                            className={`w-4 h-4 rounded-full ${
                              ["تم التواصل مع التاجر", "تم المعالجة"].includes(
                                c.status
                              )
                                ? "bg-primary"
                                : "bg-gray-400"
                            }`}
                          />
                          <span
                            className={`w-4 h-4 rounded-full ${
                              c.status === "تم المعالجة"
                                ? "bg-primary"
                                : "bg-gray-400"
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* الصور المرفقة */}
                    <div className="flex flex-col items-center self-end justify-between w-full gap-4">
                      {(() => {
                        const count = Math.floor(Math.random() * 4);
                        const shuffled = [...parts_data].sort(
                          () => 0.5 - Math.random()
                        );
                        const selectedImages = shuffled.slice(0, count);

                        if (selectedImages.length === 0) return null;

                        return (
                          <>
                            <p className="text-sm text-light-black">
                              الصور المرفقة:
                            </p>
                            <div className="flex items-start justify-start w-full gap-4">
                              {selectedImages.map((p, idx) => (
                                <div key={idx} className="flex flex-row">
                                  <img
                                    className="w-30 h-30 rounded-2xl"
                                    src={p.image}
                                  />
                                </div>
                              ))}
                            </div>
                          </>
                        );
                      })()}
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
