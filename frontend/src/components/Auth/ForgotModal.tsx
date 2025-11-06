import { useState } from "react";
import { Input } from "@heroui/input";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { closeModal } from "@/features/mainModal/mainModalSlice";
type LoginModalProps = {
  onSwitch: () => void;
  onForgot?: () => void;
};
export default function ForgotModal({ onSwitch }: LoginModalProps) {
  const [form, setForm] = useState({
    email: "",
    newPassword: "",
  });

  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleForgot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = form.email;
    const newPassword = form.newPassword;

    const response = await fetch(
      "https://ghiartik-production.up.railway.app/forgot",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      }
    );
    await response.json();
    if (response.ok) {
      console.log("تم إعادة تعيين كلمة المرور بنجاح");
    } else {
      console.log("الإيميل غير موجود لدينا");
    }
  };
  return (
    <div className="relative flex flex-col gap-4">
      <h2 className="text-xl font-bold text-center">نسيت كلمة المرور</h2>
      <form onSubmit={handleForgot}>
        <div className="flex flex-col items-start justify-start w-full gap-4 mb-4">
          <Input
            type="email"
            placeholder="البريد الإلكتروني"
            className="input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            type={isVisible ? "text" : "password"}
            placeholder="كلمة المرور الجديدة"
            className="input"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            endContent={
              <button
                aria-label="toggle password visibility"
                className="cursor-pointer focus:outline-solid outline-transparent"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <FiEyeOff className="text-2xl pointer-events-none text-default-400" />
                ) : (
                  <FiEye className="text-2xl pointer-events-none text-default-400" />
                )}
              </button>
            }
          />
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 cursor-pointer text-primary border-primary border-1 rounded-2xl hover:bg-primary hover:text-white"
            type="submit"
          >
            إعادة تعيين
          </button>
        </div>
      </form>

      <div className="flex flex-col gap-2 text-sm text-center">
        <span>
          ليس لديك حساب؟{" "}
          <span
            onClick={onSwitch}
            className="font-medium cursor-pointer text-primary"
          >
            إنشاء حساب
          </span>
        </span>
      </div>
      <RxCross1
        className="absolute top-[-20px] left-[-20px] p-1 text-xl text-white rounded-full cursor-pointer border-1 bg-primary border-primary hover:bg-white hover:text-primary"
        onClick={() => dispatch(closeModal())}
      />
    </div>
  );
}
