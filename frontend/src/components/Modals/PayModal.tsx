import { addToast, Button, Input } from "@heroui/react";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { closeModal } from "../../features/mainModal/mainModalSlice";
import { useNavigate } from "react-router-dom";
export default function PayModal() {
  const totalAmount = localStorage.getItem("totalAmount");
  const [paymentInfo, setpaymentInfo] = useState({
    total: totalAmount,
    name: "",
    cardNumber: 0,
    expiryDate: "",
    CVV: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="relative p-4">
      <h3 className="text-3xl">الدفع</h3>
      <div className="flex flex-col gap-4 mt-8 font-medium">
        <div className="flex items-center justify-end ">
          <div className="flex gap-2 p-4 px-6 w-max border-1 border-border rounded-2xl bg-default-300">
            <p>الإجمالي:</p>
            <p>{paymentInfo.total} ريال</p>
          </div>
        </div>
        <Input
          onChange={(e) => {
            setpaymentInfo({
              ...paymentInfo,
              name: e.target.value,
            });
          }}
          label="اسم صاحب البطاقة"
          aria-label="اسم صاحب البطاقة"
          placeholder="اسم صاحب البطاقة"
          labelPlacement="outside"
          className="w-full"
        />
        <Input
          onChange={(e) => {
            setpaymentInfo({
              ...paymentInfo,
              cardNumber: e.target.value ? Number(e.target.value) : 0,
            });
          }}
          label="رقم البطاقة"
          aria-label="رقم البطاقة"
          placeholder="رقم البطاقة"
          labelPlacement="outside"
          className="w-full"
          type="number"
        />
        <div className="flex gap-4">
          <Input
            onChange={(e) => {
              setpaymentInfo({
                ...paymentInfo,
                expiryDate: e.target.value,
              });
            }}
            label="تاريخ الانتهاء"
            aria-label="تاريخ الانتهاء"
            placeholder="تاريخ الانتهاء"
            labelPlacement="outside"
            className="w-full"
          />
          <Input
            onChange={(e) => {
              setpaymentInfo({
                ...paymentInfo,
                CVV: e.target.value,
              });
            }}
            label="الرقم السري"
            aria-label="الرقم السري"
            placeholder="CVV"
            labelPlacement="outside"
            className="w-full"
          />
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <Button
          onPress={() => {
            dispatch(closeModal());
            navigate("/myOrders");
            addToast({
              title: "تم الدفع بنجاح",
              color: "success",
              timeout: 3000,
              shouldShowTimeoutProgress: true,
            });
          }}
          className="text-default-200 border-1 border-light-black w-[180px] bg-light-black hover:text-light-black hover:bg-default-200"
          isDisabled={
            !paymentInfo.name ||
            !paymentInfo.cardNumber ||
            !paymentInfo.expiryDate ||
            !paymentInfo.CVV
          }
        >
          ادفع
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
