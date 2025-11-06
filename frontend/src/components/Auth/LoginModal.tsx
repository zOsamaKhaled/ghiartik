import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "../../features/mainModal/mainModalSlice";
import { RxCross1 } from "react-icons/rx";
import { Input } from "@heroui/input";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

type LoginModalProps = {
  onSwitch: () => void;
  onForgot?: () => void;
};

export default function LoginModal({ onSwitch, onForgot }: LoginModalProps) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = form.email;
    const password = form.password;

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      // حاول أولاً التحقق من response.ok قبل parse
      if (data.token) {
        // parse JSON بعد التأكد
        localStorage.setItem("token", data.token);
        navigate("/");
        dispatch(closeModal());
      }
    } catch (error) {
      alert("Error:" + error);
    }
  };

  return (
    <div className="relative flex flex-col gap-4">
      <h2 className="text-xl font-bold text-center ">تسجيل الدخول</h2>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col items-start justify-start w-full gap-4 mb-4">
          <Input
            type="email"
            placeholder="البريد الإلكتروني"
            className=""
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            type={isVisible ? "text" : "password"}
            placeholder="كلمة المرور"
            className=""
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
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
            type="submit"
            className="px-4 py-2 cursor-pointer text-primary border-primary border-1 rounded-2xl hover:bg-primary hover:text-white"
          >
            دخول
          </button>
        </div>
      </form>
      <div className="flex flex-col gap-2 text-sm text-center">
        <span
          onClick={onForgot}
          className="font-medium cursor-pointer text-primary"
        >
          نسيت كلمة المرور؟
        </span>
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
