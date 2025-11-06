import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { CiLocationOn, CiLock, CiMail, CiPhone, CiUser } from "react-icons/ci";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Avatar, Button } from "@heroui/react";
import { TbCameraPlus } from "react-icons/tb";
import { Input } from "@heroui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "@/features/mainModal/mainModalSlice";
export default function Profile() {
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    phone: "",
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleDataChange = async () => {
    const email = form.email;
    const password = form.password;
    const phone = form.phone;
    const response = await fetch("http://localhost:5000/change_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, phone, password }),
    });
    await response.json();
    if (response.ok) {
      console.log("تم إنشاء الحساب بنجاح");
    } else {
      console.log("حدث خطأ ما");
    }
  };

  const dispatch = useDispatch();
  // const handleLogout = () => {
  //   localStorage.removeItem("token");

  //   navigate("/");
  // };
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center w-full py-10">
        <h1 className={`${title()} mb-20`}>حسابي</h1>
        {/* About Us */}
        <div className="relative flex flex-col w-full gap-6 pt-40 my-8 pb-15 md:p-40 md:pb-18 border-y-1 border-border rounded-3xl profile_container">
          {/* Profile Picture */}
          <div className="absolute top-[-60px] right-[50%] translate-x-[50%] flex flex-col items-center justify-center gap-4">
            <div className="relative flex ">
              <Avatar
                isBordered
                src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                className="w-30 h-30"
              />
              <Button
                isIconOnly
                className="absolute bottom-0 right-0 bg-white border-1 text-primary border-[#D9D9D9] hover:text-white hover:bg-primary hover:border-primary"
                startContent={<TbCameraPlus size={20} />}
              ></Button>
            </div>
            <h3 className="">أسامة خالد</h3>
            <a
              onClick={() => dispatch(openModal("signOutModal"))}
              className="text-sm text-red-500 cursor-pointer hover:underline"
            >
              تسجل خروج
            </a>
          </div>
          {/* Profile Info */}

          <form>
            <div className="flex flex-col gap-4 ">
              <Input
                placeholder="الاسم الكامل"
                startContent={
                  <CiUser className="text-2xl pointer-events-none text-default-400 shrink-0" />
                }
                type="text"
                classNames={{
                  inputWrapper:
                    "p-6 bg-transparent shadow-none border-1 border-border ",
                }}
              />
              <Input
                placeholder="البريد الإلكتروني"
                startContent={
                  <CiMail className="text-2xl pointer-events-none text-default-400 shrink-0" />
                }
                type="email"
                classNames={{
                  inputWrapper:
                    "p-6 bg-transparent shadow-none border-1 border-border ",
                }}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Input
                dir="rtl"
                placeholder="رقم الجوال"
                startContent={
                  <CiPhone className="text-2xl pointer-events-none text-default-400 shrink-0" />
                }
                type="tel"
                classNames={{
                  inputWrapper:
                    "p-6 bg-transparent shadow-none border-1 border-border relative",
                }}
                endContent={
                  <div className="absolute left-0 flex items-center justify-center h-full gap-2 p-4 rounded-l-xl bg-default-100 ">
                    <p className="text-sm ">+966</p>
                    <img src="/sa-flag.svg" />
                  </div>
                }
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Input
                placeholder="المدينة"
                startContent={
                  <CiLocationOn className="text-2xl pointer-events-none text-default-400 shrink-0" />
                }
                type="text"
                classNames={{
                  inputWrapper:
                    "p-6 bg-transparent shadow-none border-1 border-border ",
                }}
              />
              <Input
                placeholder="كلمة المرور الحالية"
                startContent={
                  <CiLock className="text-2xl pointer-events-none text-default-400 shrink-0" />
                }
                type={isVisible ? "text" : "password"}
                classNames={{
                  inputWrapper:
                    "p-6 bg-transparent shadow-none border-1 border-border ",
                }}
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="cursor-pointer focus:outline-solid outline-transparent"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FiEyeOff className="text-xl pointer-events-none text-default-300" />
                    ) : (
                      <FiEye className="text-xl pointer-events-none text-default-300" />
                    )}
                  </button>
                }
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <Input
                placeholder="كلمة المرور الجديدة"
                startContent={
                  <CiLock className="text-2xl pointer-events-none text-default-400 shrink-0" />
                }
                type={isVisible ? "text" : "password"}
                classNames={{
                  inputWrapper:
                    "p-6 bg-transparent shadow-none border-1 border-border ",
                }}
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="cursor-pointer focus:outline-solid outline-transparent"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FiEyeOff className="text-xl pointer-events-none text-default-300" />
                    ) : (
                      <FiEye className="text-xl pointer-events-none text-default-300" />
                    )}
                  </button>
                }
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <Input
                placeholder="تأكيد كلمة المرور الجديدة"
                startContent={
                  <CiLock className="text-2xl pointer-events-none text-default-400 shrink-0" />
                }
                type={isVisible ? "text" : "password"}
                classNames={{
                  inputWrapper:
                    "p-6 bg-transparent shadow-none border-1 border-border ",
                }}
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="cursor-pointer focus:outline-solid outline-transparent"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FiEyeOff className="text-xl pointer-events-none text-default-300" />
                    ) : (
                      <FiEye className="text-xl pointer-events-none text-default-300" />
                    )}
                  </button>
                }
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div className="flex justify-end">
              <Button
                className="w-[150px] mt-8"
                type="submit"
                color="primary"
                onPress={() => handleDataChange}
              >
                حفظ التغييرات
              </Button>
            </div>
          </form>
        </div>
      </section>
    </DefaultLayout>
  );
}
