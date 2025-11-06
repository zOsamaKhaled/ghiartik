import { Button } from "@heroui/button";

import { CiPower } from "react-icons/ci";

import { useDispatch } from "react-redux";
import { closeModal } from "@/features/mainModal/mainModalSlice";
import { useNavigate } from "react-router-dom";
export default function SignOutModal() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(closeModal());
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center gap-4 p-2">
      <div className="flex flex-col items-center gap-2">
        <CiPower size={100} className="text-red-500" />
        <h2 className="text-3xl text-[#303030]">تسجيل الخروج</h2>
        <p className="mt-2 font-light">هل أنت متأكد أنك تريد تسجيل الخروج؟</p>
      </div>
      <div className="flex gap-4">
        <Button
          className="text-default-200 border-1 border-light-black w-[120px] bg-light-black hover:text-light-black hover:bg-default-200"
          onPress={handleLogout}
        >
          تسجيل الخروج
        </Button>
        <Button
          className="bg-transparent border-1 border-light-black w-[120px] hover:bg-light-black hover:text-default-200"
          onPress={() => dispatch(closeModal())}
        >
          إلغاء
        </Button>
      </div>
    </div>
  );
}
