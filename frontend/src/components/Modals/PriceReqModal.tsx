import { Button } from "@heroui/button";

import { CiCircleCheck } from "react-icons/ci";

import { useDispatch } from "react-redux";
import { closeModal } from "@/features/mainModal/mainModalSlice";
// import { useNavigate } from "react-router-dom";
export default function PriceReqModal() {
  const dispatch = useDispatch();

  // const navigate = useNavigate();
  const handleAddReq = () => {
    dispatch(closeModal());
  };
  return (
    <div className="flex flex-col items-center gap-4 p-2">
      <div className="flex flex-col items-center gap-4">
        <CiCircleCheck size={100} className="text-primary" />
        <h2 className="text-3xl text-[#303030] text-center">
          تهانينا! تم تقديم طلب التسعير بنجاح🎉
        </h2>
      </div>
      <div className="flex gap-4 mt-4">
        <Button
          className="bg-transparent border-1 border-primary w-[120px] text-primary hover:bg-primary hover:text-white"
          onPress={() => {
            dispatch(closeModal());
            handleAddReq();
          }}
        >
          حسناً
        </Button>
      </div>
    </div>
  );
}
