import { addToast, Button, Select, SelectItem, Textarea } from "@heroui/react";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { closeModal } from "../../features/mainModal/mainModalSlice";
import { useNavigate } from "react-router-dom";
export default function ComplainModal() {
  const [complain, setComplain] = useState({
    reason: "",
    details: "",
    image: "",
  });
  const [fileName, setFileName] = useState("لم يتم اختيار ملف");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="relative p-4">
      <h3 className="text-3xl">تقديم شكوى</h3>
      <div className="flex flex-col gap-4 mt-8 font-medium">
        <Select
          label="اختر سبب الشكوى"
          aria-label="سبب الشكوى"
          placeholder="ما سبب الشكوى؟"
          labelPlacement="outside"
          className="w-full"
          selectedKeys={new Set([complain.reason])}
          onSelectionChange={(value) => {
            const selectedValue = Array.from(value as Set<string>)[0];
            setComplain({ ...complain, reason: selectedValue });
          }}
        >
          <SelectItem key="1" dir="rtl">
            التأخر في التسعير
          </SelectItem>
          <SelectItem key="2" dir="rtl">
            مواصفات غير مطابقة
          </SelectItem>
          <SelectItem key="3" dir="rtl">
            جودة سيئة
          </SelectItem>
        </Select>
        <Textarea
          label="ادخل تفاصيل الشكوى"
          aria-label="تفاصيل الشكوى"
          labelPlacement="outside"
          placeholder="وصف الشكوى"
          value={complain.details}
          onValueChange={(value) => {
            setComplain({ ...complain, details: value });
          }}
        />
        <div className="flex flex-col gap-4">
          <label className="font-medium">صورة المنتج / الشكوى (اختياري)</label>
          <div className="flex flex-col justify-start gap-4">
            <input
              id="carImage"
              type="file"
              aria-label="صورة الشكوى"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setFileName(file ? file.name : "لم يتم اختيار ملف");
                setComplain({
                  ...complain,
                  image: file ? URL.createObjectURL(file) : complain.image,
                });
              }}
            />
            <Button
              as="label"
              htmlFor="carImage"
              variant="flat"
              className="w-full text-right! bg-transparent border-dashed border-1 border-primary text-primary cursor-pointer hover:bg-primary hover:border-white hover:text-white"
            >
              اضغط الصورة
            </Button>
            <span className="text-sm text-gray-500">
              {"الصورة الحالية: " + fileName}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <Button
          onPress={() => {
            dispatch(closeModal());
            navigate("/complaints");
            addToast({
              title: "تم ارسال الشكوى بنجاح",
              color: "success",
              timeout: 3000,
              shouldShowTimeoutProgress: true,
            });
          }}
          className="text-default-200 border-1 border-light-black w-[180px] bg-light-black hover:text-light-black hover:bg-default-200"
          isDisabled={complain.reason === "" || complain.details === ""}
        >
          إرسال الشكوى
        </Button>
      </div>
      <IoMdClose
        size={30}
        className="absolute cursor-pointer top-4 left-4 "
        onClick={() => {
          dispatch(closeModal());
        }}
      />
    </div>
  );
}
